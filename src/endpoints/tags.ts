import call from '../call';

import type { AnslagApiClientOptions } from '../options';

import type { ApiTag, ApiTagRequest } from '../types';

interface TagOperations {
  list: () => Promise<ApiTag[]>;
  get: (id: string) => Promise<ApiTag>;
  create: (bulletin: ApiTagRequest) => Promise<ApiTag>;
  update: (id: string, bulletin: ApiTagRequest) => Promise<ApiTag>;
  delete: (id: string) => Promise<ApiTag>;
}

export const tagOperations = (opts: AnslagApiClientOptions): TagOperations => ({
  list: async () =>
    await call<undefined, ApiTag[]>('GET', `/bulletins`, { ...opts }),
  get: async (id) =>
    await call<undefined, ApiTag>('GET', `/bulletins/${id}`, { ...opts }),
  create: async (bulletin) =>
    await call<ApiTagRequest, ApiTag>('POST', `/bulletins`, {
      ...opts,
      body: bulletin,
    }),
  update: async (id, bulletin) =>
    await call<ApiTagRequest, ApiTag>('PUT', `/bulletins/${id}`, {
      ...opts,
      body: bulletin,
    }),
  delete: async (id) =>
    await call<undefined, ApiTag>('DELETE', `/bulletins/${id}`, {
      ...opts,
    }),
});
