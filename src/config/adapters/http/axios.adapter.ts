import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "./http.adapter";

interface Options {
  baseUrl: string;
  params: Record<string, string>;
}

export class AxiosAdapter implements HttpAdapter {
  private axiosInstance: AxiosInstance;

  constructor(options: Options) {
    this.axiosInstance = axios.create({
      baseURL: options.baseUrl,
      params: options.params,
    });
  }

  async get<T>(url: string, options?: Record<string, unknown>): Promise<T> {
    try {
      const { data } = await this.axiosInstance.get<T>(url, options);
      return data;
    } catch (error) {
      throw new Error(`Error fetching: ${url}`);
    }
  }

  async post<T>(url: string, data: Record<string, unknown>, options?: Record<string, unknown>): Promise<T> {
    try {
      const { data: responseData } = await this.axiosInstance.post<T>(url, data, options);
      return responseData;
    } catch (error) {
      throw new Error(`Error posting to: ${url}`);
    }
  }
}