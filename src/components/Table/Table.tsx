"use client";
import {
  FilterTag,
  GlobalFilterFn,
} from "@/types/types";
import {
  type ColumnFilter,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";

import { Filter } from "@/components/Filter/Filter";

import {
  Table as ShadTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  DownloadIcon,
} from "@radix-ui/react-icons";

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
import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2Icon,
  Upload,
} from "lucide-react";

import { getColumns, truncateText } from "./TableUtils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const [isAddingRow, setIsAddingRow] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [newRowData, setNewRowData] = useState<{ [key: string]: any }>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tableData, setTableData] = useState<any[]>(data);
  const [editedRow, setEditedRow] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editedValues, setEditedValues] = useState<{ [key: string]: any }>({});

  const productsPerPage: Array<number> = [10, 20, 30, 40, 50];

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editingItem, setEditingItem] = useState<any>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (rowData: any) => {
    setEditingItem(rowData);
    setIsEditModalOpen(true);
  };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleSave = (updatedData: any) => {
  const updatedTableData = tableData.map((row) =>
    row.id === updatedData.id ? updatedData : row
  );
  setTableData(updatedTableData);
  setIsEditModalOpen(false);
};
// const initializeNewRow = () => {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const emptyRow = table
//       .getAllColumns()
//       .filter(column => column.getIsVisible() && column.id !== 'select')
//       .reduce((acc, column) => {
//         acc[column.id] = '';
//         return acc;
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       }, {} as { [key: string]: any });
//     setNewRowData(emptyRow);
//     setIsAddingRow(true);
//   };

  const handleAddRow = () => {
    const newRow = { ...newRowData };
    setTableData((prevData) => [...prevData, newRow]);
    setIsAddingRow(false);
    setNewRowData({});
  };

  const handleCancelAdd = () => {
    setIsAddingRow(false);
    setNewRowData({});
  };

  const getStorageKey = React.useCallback(() => {
    if (data.length === 0) return "tableData";
    const structure = Object.keys(data[0]).sort().join("_");
    return `tableData_${structure}_${data.length}`;
  }, [data]);

  useEffect(() => {
    const storageKey = getStorageKey();
    const storedData = localStorage.getItem(storageKey);

    if (!storedData) {
      setTableData(data);
      return;
    }

    try {
      const parsedData = JSON.parse(storedData);

      if (data.length > 0 && parsedData.length > 0) {
        const storedKeys = Object.keys(parsedData[0]).sort().join(",");
        const newKeys = Object.keys(data[0]).sort().join(",");
        if (storedKeys !== newKeys) {
          setTableData(data);
          return;
        }
      }
      setTableData(parsedData);
    } catch (error) {
      console.error("Error parsing stored data:", error);
      setTableData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (data.length > 0) {
      const storageKey = getStorageKey();
      const storedData = localStorage.getItem(storageKey);

      if (!storedData) {
        setTableData(data);
        localStorage.setItem(storageKey, JSON.stringify(data));
      } else {
        try {
          const parsedData = JSON.parse(storedData);
          const storedKeys = Object.keys(parsedData[0]).sort().join(",");
          const newKeys = Object.keys(data[0]).sort().join(",");

          if (storedKeys !== newKeys) {
            setTableData(data);
            localStorage.setItem(storageKey, JSON.stringify(data));
          }
        } catch (error) {
          console.error("Error handling data update:", error);
          setTableData(data);
          localStorage.setItem(storageKey, JSON.stringify(data));
        }
      }
    }
  }, [data, getStorageKey]);

  useEffect(() => {
    if (tableData.length > 0) {
      const storageKey = getStorageKey();
      localStorage.setItem(storageKey, JSON.stringify(tableData));
    }
  }, [tableData, getStorageKey]);


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditRow = (rowIndex: number, rowData: any) => {
    setEditedRow(rowIndex);
    setEditedValues(rowData);
  };

  const handleDeleteRow = (rowIndex: number) => {
    const currentPage = table.getState().pagination.pageIndex;
    const pageSize = table.getState().pagination.pageSize;
    
    setTableData((prevData) => {
      const newData = prevData.filter((_, index) => index !== rowIndex);
      
      // Calculate if the current page would be empty after deletion
      const rowsOnCurrentPage = newData.slice(
        currentPage * pageSize,
        (currentPage + 1) * pageSize
      ).length;
      console.log(currentPage);
      
      if (rowsOnCurrentPage === 0 && currentPage > 0) {
        setTimeout(() => {
          table.setPageIndex(currentPage - 1);
        }, 0);
      } else {
    
        setTimeout(() => {
          table.setPageIndex(currentPage);
        }, 0);
      }
      
      return newData;
    });
  };
  

  useEffect(() => {
    const storedData = localStorage.getItem("tableData");
    if (storedData) {
      setTableData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    const initialVisibility: VisibilityState = {};
    columns.forEach((column, index) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initialVisibility[(column as any).accessorKey] = index < 8;
    });
    setColumnVisibility(initialVisibility);
  }, [columns]);

  const globalFilterFn: GlobalFilterFn = (row, columnId, filterValue) => {
    const rowValue = row.original;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const VisibleColumns = table
  .getAllColumns()
  .filter((column) => column.getIsVisible() && column.id !== "select")
  .map((column) => column.id);

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
          columns={VisibleColumns}
          onFilterAdd={handleFilterAdd}
        />
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
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}