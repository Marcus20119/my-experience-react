import type { BasedResponse, PaginatedResponse } from '../base-schemas';
import type {
  CreateTechnologySectionInput,
  OrderDto,
  PaginationDto,
  TechnologySectionQueryFilter,
  TechnologySectionResponse,
  TechnologySkeletonResponse,
  UpdateTechnologySectionInput,
} from '../schemas';
import { getListQueryString } from '../utils';
import { request } from './request';

export interface ListTechnologySectionsQuery {
  filter: TechnologySectionQueryFilter;
  orderBy: OrderDto;
  pagination: PaginationDto;
}

const getTechnologySections = async ({
  filter,
  orderBy,
  pagination,
}: ListTechnologySectionsQuery) => {
  let queryString = getListQueryString({
    orderBy,
    pagination,
  });

  if (filter.technologyType) {
    queryString += `&technologyType=${filter.technologyType}`;
  }

  const response = await request.get<
    PaginatedResponse<TechnologySectionResponse>
  >(`/technology-sections?${queryString}`);

  return response.data;
};

const getTechnologySection = async (id: string) => {
  const response = await request.get<BasedResponse<TechnologySectionResponse>>(
    `/technology-sections/${id}`,
  );
  return response.data.data;
};

const getTechnologySkeleton = async () => {
  const response = await request.get<BasedResponse<TechnologySkeletonResponse>>(
    '/technology-sections/skeleton',
  );
  return response.data.data;
};

const createTechnologySection = async (input: CreateTechnologySectionInput) => {
  const response = await request.post<TechnologySectionResponse>(
    '/technology-sections',
    input,
  );
  return response.data;
};

const updateTechnologySection = async (
  id: string,
  input: UpdateTechnologySectionInput,
) => {
  const response = await request.put<TechnologySectionResponse>(
    `/technology-sections/${id}`,
    input,
  );
  return response.data;
};

const deleteTechnologySection = async (id: string) => {
  await request.delete(`/technology-sections/${id}`);
};

export const technologySectionApi = {
  createTechnologySection,
  deleteTechnologySection,
  getTechnologySection,
  getTechnologySections,
  getTechnologySkeleton,
  updateTechnologySection,
};
