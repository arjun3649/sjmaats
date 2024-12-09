export interface Member {
  name: string;
  batch: string;
  role: string;
  imageUrl: string;
  dob: string;
  annidate: string;
}

export interface News {
  id: number,
  title: string,
  description: string,
  img: string,
  date: string,
  slug: string,
  links ?: string
  
}
export interface Event {
  id: number;
  date: {
    day: string;
    month: string;
    weekday: string;
  };
  title: string;
  time: string;
  location: string;
  imageUrl: string;
  description: string;
}



export interface FilterTag {
  column: string;
  condition?: string;
  value: any;
}

export type Row = {
  original: any;
};

export interface FilterTag {
  column: string;
  condition?: string;
  value: any;
}

export type FilterFn = (row: Row, columnId: string, filterValue: string) => boolean;

export interface FilterTagProps {
  tag: FilterTag;
  onRemove: (filter: FilterTag) => void;
}

export interface FilterInputProps {
  columns: string[];
  onFilterAdd: (filter: FilterTag) => void;
}


export type GlobalFilterFn = (
  row: Row,           
  columnId: string,
  filterValue: string
) => boolean;

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  createdAt?: string;
}

export interface GalleryFolder {
  id: string;
  name: string;
  images: GalleryImage[];
  createdAt?: string;
  description?: string;
}

export interface GalleryData {
  folders: GalleryFolder[];
}