/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum IconType {
  Custom = "custom",
  Iconify = "iconify",
}

export enum TechnologyType {
  Frontend = "frontend",
  Backend = "backend",
  Mobile = "mobile",
  Cloud = "cloud",
  Language = "language",
}

export enum Language {
  En = "en",
  Vi = "vi",
}

export interface BaseResponse {
  /** @default 200 */
  statusCode: number;
  data: object;
}

export interface I18NContentTranslation {
  lang: Language;
  content: string;
}

export interface DisplayName {
  original: string;
  translations?: I18NContentTranslation[];
}

export interface BaseTechnologyResponse {
  id: string;
  name: string;
  iconType: IconType;
  iconFileKey?: string | null;
  iconName?: string | null;
  color1: string;
  color2?: string | null;
  color3?: string | null;
  description?: string | null;
  rate?: number;
  slug: string;
}

export interface TechnologySectionResponse {
  id: string;
  name: DisplayName;
  slug: string;
  technologyType: TechnologyType;
  technologies?: BaseTechnologyResponse[];
}

export interface CreateTechnologySectionInput {
  technologyType: TechnologyType;
  name: DisplayName;
}

export interface UpdateTechnologySectionInput {
  technologyType?: TechnologyType;
  name?: DisplayName;
}

export interface BaseTechnologySectionResponse {
  id: string;
  name: DisplayName;
  slug: string;
}

export interface TechnologySectionSkeleton {
  technologyType: TechnologyType;
  technologySections: BaseTechnologySectionResponse[] | null;
}

export interface TechnologySkeletonResponse {
  technologySkeleton: TechnologySectionSkeleton[];
}

export interface IMeta {
  /** @default 10 */
  limit: number;
  /** @default 0 */
  offset: number;
  total: number;
  totalPages?: number | null;
}

export interface IPaginatedResponse {
  items: string[];
  meta: IMeta;
}

export interface PaginationDto {
  /** @default 10 */
  limit: number;
  /** @default 0 */
  offset: number;
}

export interface OrderDto {
  /** Format: fieldName:[asc,desc] */
  order?: string;
}

export interface TechnologySectionQueryFilter {
  technologyType?: TechnologyType;
}

export interface BaseKnowledgeItemResponse {
  id: string;
  name: DisplayName;
  iconType: IconType;
  iconFileKey?: string | null;
  iconName?: string | null;
  color1: string;
  color2?: string | null;
  color3?: string | null;
  rate?: number | null;
}

export interface BaseKnowledgeGroupResponse {
  id: string;
  name: DisplayName;
  description?: string | null;
  knowledgeItems: BaseKnowledgeItemResponse[];
}

export interface TechnologyResponse {
  id: string;
  name: string;
  iconType: IconType;
  iconFileKey?: string | null;
  iconName?: string | null;
  color1: string;
  color2?: string | null;
  color3?: string | null;
  description?: string | null;
  rate?: number;
  slug: string;
  technologyType?: TechnologyType;
  technologySectionId?: string;
  knowledgeGroups?: BaseKnowledgeGroupResponse[];
  knowledgeItems?: BaseKnowledgeItemResponse[];
}

export interface CreateTechnologyInput {
  name: string;
  iconType: IconType;
  iconFileKey?: string | null;
  iconName?: string | null;
  color1: string;
  color2?: string | null;
  color3?: string | null;
  description?: string | null;
  /**
   * @min 0
   * @max 5
   */
  rate: number;
  technologyType: TechnologyType;
  technologySectionId?: string;
}

export interface UpdateTechnologyInput {
  name?: string;
  iconType?: IconType;
  iconFileKey?: string | null;
  iconName?: string | null;
  color1?: string;
  color2?: string | null;
  color3?: string | null;
  description?: string | null;
  /**
   * @min 0
   * @max 5
   */
  rate?: number;
  technologyType?: TechnologyType;
  technologySectionId?: string;
}

export interface TechnologyQueryFilter {
  technologyType?: TechnologyType;
  technologySectionId?: string;
}
