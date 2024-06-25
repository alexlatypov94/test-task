export interface QueryParams {
  limit: number;
  offset: number;
  name?: string;
}

export interface PaginationReqQuery {
  page: number;
  limit: number;
  name?: string;
}
