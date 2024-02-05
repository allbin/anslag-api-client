import { AxiosInstance } from 'axios';

type AcquireTokenFunction = () => Promise<string>;

export interface AnslagApiClientOptions {
  axios?: AxiosInstance;
  baseUrl: string;
  apiKey?: string;
  token?: string | AcquireTokenFunction;
}
