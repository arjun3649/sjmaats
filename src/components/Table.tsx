"use client";
import { FilterTag, Row, GlobalFilterFn } from "@/types/types";
import {
  ColumnDef,
  ColumnFilter,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

// import { Filter, FilterInput } from "../../molecules/Filter";
import {
  Table as ShadTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CaretSortIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Filter } from "./Filter/Filter";

const formatCellValue = (value: any): string | JSX.Element => {
  if (value === null || value === undefined) return "N/A";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") {
    return (
      <div>
        {Object.entries(value).map(([subKey, subValue]) => (
          <div key={subKey}>{`${subKey}: ${subValue}`}</div>
        ))}
      </div>
    );
  }
  return String(value);
};

const getFilterFn = (value: any) => {
  if (typeof value === "string") {
    return "includesString";
  } else if (typeof value === "number") {
    return "weakEquals";
  } else if (Array.isArray(value)) {
    return "arrIncludes";
  } else {
    return "equals";
  }
};

// Conditional filter functions
const conditionalFilters: Record<string, FilterFn<any>> = {
  isEmpty: (row, columnId) => {
    const value = row.getValue(columnId);
    return value === null || value === undefined || value === "";
  },

  isNotEmpty: (row, columnId) => {
    const value = row.getValue(columnId);
    return value !== null && value !== undefined && value !== "";
  },

  greaterThan: (row, columnId, filterValue) => {
    const value = row.getValue(columnId);
    return typeof value === "number" && value > Number(filterValue);
  },

  lessThan: (row, columnId, filterValue) => {
    const value = row.getValue(columnId);
    return typeof value === "number" && value < Number(filterValue);
  },

  textContains: (row, columnId, filterValue) => {
    const value = String(row.getValue(columnId)).toLowerCase();
    return value.includes(String(filterValue).toLowerCase());
  },

  textNotContains: (row, columnId, filterValue) => {
    const value = String(row.getValue(columnId)).toLowerCase();
    return !value.includes(String(filterValue).toLowerCase());
  },

  textStartsWith: (row, columnId, filterValue) => {
    const value = row.getValue(columnId);
    if (Array.isArray(value)) {
      return value.some((item) =>
        String(item)
          .toLowerCase()
          .startsWith(String(filterValue).toLowerCase()),
      );
    }
    return String(value)
      .toLowerCase()
      .startsWith(String(filterValue).toLowerCase());
  },

  textEndsWith: (row, columnId, filterValue) => {
    const value = row.getValue(columnId);
    if (Array.isArray(value)) {
      return value.some((item) =>
        String(item).toLowerCase().endsWith(String(filterValue).toLowerCase()),
      );
    }
    return String(value)
      .toLowerCase()
      .endsWith(String(filterValue).toLowerCase());
  },
};

const staticColumns = [
  {
    id: "select",
    header: ({ table }: { table: any }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }: { row: any }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
];

const generateDynamicColumns = <T extends Record<string, any>>(
  data: T[],
): ColumnDef<T>[] => {
  if (!data || data.length === 0) return [];

  return Object.keys(data[0]).map((key) => {
    const value = data[0][key];
    const filterType = getFilterFn(value);

    return {
      accessorKey: key as keyof T,
      header: ({ column }) => (
        <div
          className="flex"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {key.charAt(0).toUpperCase() + key.slice(1)}
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => <div>{formatCellValue(row.getValue(key))}</div>,
      filterFn: (row, columnId, filterValue) => {
        if (filterValue?.condition) {
          console.log(filterValue.condition);

          const filterFunction = conditionalFilters[filterValue.condition];
          return filterFunction
            ? filterFunction(row, columnId, filterValue.value)
            : true;
        }
        // Handle basic filtering based on data type
        const value = row.getValue(columnId);

        switch (filterType) {
          case "includesString":
            return String(value)
              .toLowerCase()
              .includes(String(filterValue).toLowerCase());

          case "weakEquals":
            return Number(value) === Number(filterValue);

          case "arrIncludes":
            return (
              Array.isArray(value) &&
              value.some((item) =>
                String(item)
                  .toLowerCase()
                  .includes(String(filterValue).toLowerCase()),
              )
            );

          case "equals":
            return value === filterValue;

          default:
            return true;
        }
      },
    };
  });
};

export const getColumns = <T extends object>(data: T[]): ColumnDef<T>[] => {
  const dynamicColumns = generateDynamicColumns(data);
  return [staticColumns[0], ...dynamicColumns];
};

const truncateText = (text: string, wordLimit: number) => {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

export function Table({ data }: { data: any[] }) {
  const columns = React.useMemo(() => getColumns(data), [data]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [filters, setFilters] = React.useState<FilterTag[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const router = useRouter();
  const pathname = usePathname();
  const productsPerPage = [10, 20, 30, 40, 50];

  React.useEffect(() => {
    const initialVisibility: VisibilityState = {};
    columns.forEach((column, index) => {
      initialVisibility[(column as any).accessorKey] = index < 8;
    });
    setColumnVisibility(initialVisibility);
  }, [columns]);

  // Custom global filter function
  const globalFilterFn: GlobalFilterFn = (row, columnId, filterValue) => {
    const rowValue = row.original;

    const searchInObject = (obj: any, searchTerm: string): boolean => {
      if (typeof obj === "string") {
        return obj.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (Array.isArray(obj)) {
        return obj.some((item) => searchInObject(item, searchTerm));
      } else if (typeof obj === "object" && obj !== null) {
        return Object.values(obj).some((value) =>
          searchInObject(value, searchTerm),
        );
      }
      return false;
    };

    return searchInObject(rowValue, filterValue);
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      pagination,
      sorting,
      globalFilter,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
  });

  const handleFilterAdd = (newFilter: FilterTag) => {
    const column = table.getColumn(newFilter.column);
    if (!column) return;

    const filterValue = newFilter.condition
      ? { condition: newFilter.condition, value: newFilter.value }
      : newFilter.value;

    setFilters((prev) => [...prev, newFilter]);

    setColumnFilters((prev) => {
      const otherFilters = prev.filter(
        (filter) => filter.id !== newFilter.column,
      );

      return [
        ...otherFilters,
        {
          id: newFilter.column,
          value: filterValue,
        },
      ];
    });
  };

  const handleFilterRemove = (filterToRemove: FilterTag) => {
    const column = table.getColumn(filterToRemove.column);
    if (!column) return;

    setFilters((prev) =>
      prev.filter(
        (filter) =>
          !(
            filter.column === filterToRemove.column &&
            filter.condition === filterToRemove.condition &&
            filter.value === filterToRemove.value
          ),
      ),
    );

    setColumnFilters((prev) => {
      const columnFilters = filters.filter(
        (f) =>
          f.column === filterToRemove.column &&
          !(
            f.condition === filterToRemove.condition &&
            f.value === filterToRemove.value
          ),
      );

      if (columnFilters.length === 0) {
        return prev.filter((filter) => filter.id !== filterToRemove.column);
      }

      return prev.map((filter) => {
        if (filter.id !== filterToRemove.column) return filter;

        const lastFilter = columnFilters[columnFilters.length - 1];
        return {
          id: filterToRemove.column,
          value: lastFilter.condition
            ? { condition: lastFilter.condition, value: lastFilter.value }
            : lastFilter.value,
        };
      });
    });
  };

  return (
    <div className="table-wrapper w-full rounded-md border p-4">
      <div className="flex flex-wrap items-center space-y-3 md:space-y-0 md:space-x-4 py-3">
        <Input
          type="search"
          placeholder="Search across all columns"
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />

        <div className="flex space-x-4">
        <Filter
          columns={table.getAllColumns().map((col) => col.id)}
          onFilterAdd={handleFilterAdd}
        />

        {/* <Select
          value={""}
          onValueChange={(value) => {
            const column = table.getColumn(value);
            if (column) {
              column.toggleVisibility(!column.getIsVisible());
            }
          }}
        >
          <SelectTrigger className="flex w-auto cursor-pointer items-center">
            Columns
          </SelectTrigger>

          <SelectContent className="scrollbar-hide max-h-80 overflow-y-auto">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <SelectItem key={column.id} value={column.id}>
                  <input
                    type="checkbox"
                    checked={column.getIsVisible()}
                    onChange={() =>
                      column.toggleVisibility(!column.getIsVisible())
                    }
                    className="mr-2 h-4 w-4 appearance-none rounded-sm border border-gray-300 checked:border-transparent checked:bg-transparent checked:after:block checked:after:text-center checked:after:text-black checked:after:content-['✔']"
                  />
                  {column.id.charAt(0).toUpperCase() + column.id.slice(1)}
                </SelectItem>
              ))}
          </SelectContent>
        </Select> */}
        </div>
      </div>

      <div className="my-2 flex flex-wrap gap-2">
        {filters.map((filter, index) => (
          <div
            key={`${filter.column}-${index}`}
            className="flex items-center gap-2 rounded bg-gray-200 px-2 py-1"
          >
            <span>{filter.column}:</span>
            {filter.condition && <span>{filter.condition}</span>}
            <span>{filter.value}</span>
            <Button size="xs" onClick={() => handleFilterRemove(filter)}>
              &times;
            </Button>
          </div>
        ))}
      </div>

      <div className="flex cursor-pointer  flex-wrap rounded-md border overflow-x-auto">
        <ShadTable className="w-full min-w-[600px] sm:min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                    >
                      {typeof cell.getValue() === "string"
                        ? truncateText(cell.getValue() as string, 3)
                        : flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </ShadTable>
      </div>

      <div className="flex flex-wrap items-center justify-end space-x-2 py-1">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center justify-center gap-4 pt-2">
          
          <div className="flex flex-row items-center space-x-2">
            
          </div>

          <div className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
        </div>
      </div>
    </div>
  );
}
