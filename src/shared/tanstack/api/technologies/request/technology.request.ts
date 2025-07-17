import type { BasedResponse, PaginatedResponse } from '../base-schemas';
import type {
  CreateTechnologyInput,
  OrderDto,
  PaginationDto,
  TechnologyQueryFilter,
  TechnologyResponse,
  UpdateTechnologyInput,
} from '../schemas';
import { getListQueryString } from '../utils';
import { request } from './request';

export interface ListTechnologiesQuery {
  filter?: TechnologyQueryFilter;
  orderBy?: OrderDto;
  pagination?: PaginationDto;
}

const getTechnologies = async ({
  filter,
  orderBy,
  pagination,
}: ListTechnologiesQuery) => {
  let queryString = getListQueryString({
    orderBy,
    pagination,
  });

  if (filter?.technologyType) {
    queryString += `&technologyType=${filter.technologyType}`;
  }

  if (filter?.technologySectionId) {
    queryString += `&technologySectionId=${filter.technologySectionId}`;
  }

  const response = await request.get<PaginatedResponse<TechnologyResponse>>(
    `/technologies?${queryString}`,
  );

  return response.data.data;
};

const getTechnology = async (id: string) => {
  const response = await request.get<BasedResponse<TechnologyResponse>>(
    `/technologies/${id}`,
  );
  return response.data.data;
};

const createTechnology = async (input: CreateTechnologyInput) => {
  const response = await request.post<BasedResponse<TechnologyResponse>>(
    '/technologies',
    input,
  );
  return response.data.data;
};

const updateTechnology = async ({
  id,
  input,
}: {
  id: string;
  input: UpdateTechnologyInput;
}) => {
  const response = await request.put<BasedResponse<TechnologyResponse>>(
    `/technologies/${id}`,
    input,
  );
  return response.data.data;
};

const deleteTechnology = async (id: string) => {
  await request.delete(`/technologies/${id}`);
};

export const technologyApi = {
  createTechnology,
  deleteTechnology,
  getTechnologies,
  getTechnology,
  updateTechnology,
};
