import type { BasedResponse, PaginatedResponse } from '../base-schemas';
import type {
  CreateKnowledgeGroupInput,
  KnowledgeGroupQueryFilter,
  KnowledgeGroupResponse,
  OrderDto,
  PaginationDto,
  UpdateKnowledgeGroupInput,
} from '../schemas';
import { getListQueryString } from '../utils';
import { request } from './request';

export interface ListKnowledgeGroupsQuery {
  filter?: KnowledgeGroupQueryFilter;
  orderBy?: OrderDto;
  pagination?: PaginationDto;
}

const getKnowledgeGroups = async ({
  filter,
  orderBy,
  pagination,
}: ListKnowledgeGroupsQuery) => {
  let queryString = getListQueryString({
    orderBy,
    pagination,
  });

  if (filter?.technologyId) {
    queryString += `technologyId=${filter.technologyId}&`;
  }

  queryString = `?${queryString}`.slice(0, -1);

  const response = await request.get<PaginatedResponse<KnowledgeGroupResponse>>(
    `/knowledge-groups${queryString}`,
  );

  return response.data.data;
};

const getKnowledgeGroup = async (id: string) => {
  const response = await request.get<BasedResponse<KnowledgeGroupResponse>>(
    `/knowledge-groups/${id}`,
  );
  return response.data.data;
};

const createKnowledgeGroup = async (input: CreateKnowledgeGroupInput) => {
  const response = await request.post<BasedResponse<KnowledgeGroupResponse>>(
    '/knowledge-groups',
    input,
  );
  return response.data.data;
};

const updateKnowledgeGroup = async ({
  id,
  input,
}: {
  id: string;
  input: UpdateKnowledgeGroupInput;
}) => {
  const response = await request.put<BasedResponse<KnowledgeGroupResponse>>(
    `/knowledge-groups/${id}`,
    input,
  );
  return response.data.data;
};

const deleteKnowledgeGroup = async (id: string) => {
  await request.delete(`/knowledge-groups/${id}`);
};

export const knowledgeGroupApi = {
  createKnowledgeGroup,
  deleteKnowledgeGroup,
  getKnowledgeGroup,
  getKnowledgeGroups,
  updateKnowledgeGroup,
};
