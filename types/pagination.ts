export type TPagination<T> = {
  items: T;
  meta: TPaginationMeta;
};

export type TPaginationMeta = {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
};
