
import { AxiosAdapter } from "./http/axios.adapter";

export const homeFetcher = new AxiosAdapter({
  baseUrl: 'https://private-ded78f-homeapp2.apiary-mock.com',
  params: {},
})