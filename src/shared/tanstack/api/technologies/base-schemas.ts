import type { IMeta } from './schemas';

export interface PaginatedResponse<T> {
  data: { items: T[]; meta: IMeta };
  statusCode: number;
}

export interface BasedResponse<T> {
  data: T;
  statusCode: number;
}
