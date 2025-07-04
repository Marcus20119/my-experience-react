import type { IMeta } from './schemas';

export interface PaginatedResponse<T> {
  items: T[];
  meta: IMeta;
}

export interface BasedResponse<T> {
  data: T;
  statusCode: number;
}
