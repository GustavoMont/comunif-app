interface Meta {
  total: number;
  page: number;
  pageCount: number;
  pages: number;
}

export interface ListResponse<T> {
  results: T[];
  meta: Meta;
}
