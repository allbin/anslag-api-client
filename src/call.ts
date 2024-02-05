import axios, { AxiosRequestConfig, Method } from 'axios';

import { AnslagApiClientOptions } from './options';

const call = async <R, T>(
  method: Method,
  url: string,
  opts: AnslagApiClientOptions & {
    params?: unknown;
    body?: R;
    form?: FormData;
    responseType?: AxiosRequestConfig['responseType'];
    noAuth?: boolean;
  },
): Promise<T> => {
  const req: AxiosRequestConfig<R | FormData> = {
    method,
    headers: {},
    params: opts.params,
    baseURL: opts.baseUrl,
  };
  const auth: AxiosRequestConfig['headers'] =
    !opts.noAuth && opts.token
      ? typeof opts.token === 'function'
        ? {
            Authorization: `Bearer ${await opts.token()}`,
          }
        : {
            Authorization: `Bearer ${opts.token}`,
          }
      : {};

  req.headers = {
    ...auth,
    ...(opts.apiKey ? { 'x-api-key': opts.apiKey } : {}),
  };

  if (opts.responseType) {
    req.responseType = opts.responseType;
  }

  if (opts.form) {
    req.data = opts.form;
    req.headers['content-type'] = 'multipart/form-data';
  } else if (opts.body) {
    req.data = opts.body;
    req.headers['content-type'] = 'application/json';
  }

  return await (opts.axios || axios)
    .request<T>({ url, ...req })
    .then((r) => r.data);
};

export default call;
