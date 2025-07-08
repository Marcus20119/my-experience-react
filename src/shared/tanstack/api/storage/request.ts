import axios from 'axios';

import type { BasedResponse } from './base-schemas';
import type { CreatePreSignedUrlInput, PreSignedUrlResponse } from './schemas';

const request = axios.create({
  baseURL: import.meta.env.VITE_MONGO_API,
});

const getPreSignedUrl = async (input: CreatePreSignedUrlInput) => {
  const response = await request.post<BasedResponse<PreSignedUrlResponse>>(
    '/s3/pre-signed-url',
    input,
  );
  return response.data.data;
};

const uploadFile = async ({
  file,
  onUploadProgress,
  preSignedRequest,
}: {
  file: Blob;
  onUploadProgress?: (percent: number) => void;
  preSignedRequest: string;
}) =>
  axios({
    data: file,
    headers: {
      ['Content-Type']: file.type,
    },
    method: 'PUT',
    onUploadProgress: progressEvent => {
      progressEvent?.total &&
        onUploadProgress?.(
          Math.round((progressEvent.loaded * 100) / progressEvent.total),
        );
    },
    url: preSignedRequest,
  });

export const storageApi = { getPreSignedUrl, uploadFile };
