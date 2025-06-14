import axios from 'axios';

import type { OnlineCountry } from './schemas';

const request = axios.create({
  baseURL: import.meta.env.VITE_REST_COUNTRY_API,
});

const getAllCountries = async (fields: (keyof OnlineCountry)[]) => {
  const response = await request.get<OnlineCountry[]>(
    `/all?fields=${fields.join(',')}`,
  );
  return response.data;
};

export const restCountriesApi = {
  getAllCountries,
};
