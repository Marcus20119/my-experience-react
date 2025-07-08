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

export enum MimeType {
  ImageGif = "image/gif",
  ImageHeic = "image/heic",
  ImageHeif = "image/heif",
  ImageIef = "image/ief",
  ImageJpeg = "image/jpeg",
  ImagePng = "image/png",
  ImageSvgXml = "image/svg+xml",
  ImageWebp = "image/webp",
  ApplicationPdf = "application/pdf",
  ApplicationVndOpenxmlformatsOfficedocumentWordprocessingmlDocument = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ApplicationVndOpenxmlformatsOfficedocumentPresentationmlPresentation = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ApplicationVndOpenxmlformatsOfficedocumentSpreadsheetmlSheet = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  VideoXMsvideo = "video/x-msvideo",
  VideoXFlv = "video/x-flv",
  VideoMp4 = "video/mp4",
  ApplicationXMpegURL = "application/x-mpegURL",
  VideoMP2T = "video/MP2T",
  Video3Gpp = "video/3gpp",
  VideoQuicktime = "video/quicktime",
  VideoXMsWmv = "video/x-ms-wmv",
}

export enum FileCategory {
  Avatar = "avatar",
  Icon = "icon",
  Image = "image",
  Video = "video",
}

export enum BucketType {
  Private = "private",
  Public = "public",
}

export interface BaseResponse {
  /** @default 200 */
  statusCode: number;
  data: object;
}

export interface PreSignedUrlResponse {
  key: string;
  uploadUrl: string;
}

export interface CreatePreSignedUrlInput {
  bucketType: BucketType;
  category: FileCategory;
  name: string;
  mimeType: MimeType;
  size: number;
}
