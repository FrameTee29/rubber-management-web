export type TPagination<T> = {
  item: T;
  meta: TPaginationMeta;
};

export type TPaginationMeta = {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
};
