import type { BasedResponse, PaginatedResponse } from '../base-schemas';
import type {
  CreateKnowledgeItemInput,
  KnowledgeItemQueryFilter,
  KnowledgeItemResponse,
  OrderDto,
  PaginationDto,
  UpdateKnowledgeItemInput,
} from '../schemas';
import { getListQueryString } from '../utils';
import { request } from './request';

export interface ListKnowledgeItemsQuery {
  filter?: KnowledgeItemQueryFilter;
  orderBy?: OrderDto;
  pagination?: PaginationDto;
}

const getKnowledgeItems = async ({
  filter,
  orderBy,
  pagination,
}: ListKnowledgeItemsQuery) => {
  let queryString = getListQueryString({
    orderBy,
    pagination,
  });

  if (filter?.knowledgeGroupId) {
    queryString += `knowledgeGroupId=${filter.knowledgeGroupId}&`;
  }

  queryString = `?${queryString}`.slice(0, -1);

  const response = await request.get<PaginatedResponse<KnowledgeItemResponse>>(
    `/knowledge-items${queryString}`,
  );

  return response.data.data;
};

const getKnowledgeItem = async (id: string) => {
  const response = await request.get<BasedResponse<KnowledgeItemResponse>>(
    `/knowledge-items/${id}`,
  );
  return response.data.data;
};

const createKnowledgeItem = async (input: CreateKnowledgeItemInput) => {
  const response = await request.post<BasedResponse<KnowledgeItemResponse>>(
    '/knowledge-items',
    input,
  );
  return response.data.data;
};

const updateKnowledgeItem = async ({
  id,
  input,
}: {
  id: string;
  input: UpdateKnowledgeItemInput;
}) => {
  const response = await request.put<BasedResponse<KnowledgeItemResponse>>(
    `/knowledge-items/${id}`,
    input,
  );
  return response.data.data;
};

const deleteKnowledgeItem = async (id: string) => {
  await request.delete(`/knowledge-items/${id}`);
};

export const knowledgeItemApi = {
  createKnowledgeItem,
  deleteKnowledgeItem,
  getKnowledgeItem,
  getKnowledgeItems,
  updateKnowledgeItem,
};
