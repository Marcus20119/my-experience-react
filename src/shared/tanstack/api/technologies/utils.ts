import type { OrderDto, PaginationDto } from './schemas';

export const getListQueryString = ({
  orderBy,
  pagination,
}: {
  orderBy?: OrderDto;
  pagination?: PaginationDto;
}): string => {
  let queryString = '';

  if (orderBy?.order) {
    queryString += `orderBy=${orderBy?.order}&`;
  }

  if (pagination?.limit) {
    queryString += `limit=${pagination?.limit}&`;
  }

  if (pagination?.offset) {
    queryString += `offset=${pagination?.offset}&`;
  }

  if (queryString[0] === '&') {
    queryString = queryString.slice(1);
  }

  return queryString;
};
