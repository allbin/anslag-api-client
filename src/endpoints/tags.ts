import { z } from 'zod';
import call from '../call';

import type { AnslagApiClientOptions } from '../options';

import {
  ApiTag,
  ApiTagModel,
  ApiTagRequest,
  ApiTagRequestModel,
} from '../types';

interface TagOperations {
  list: () => Promise<ApiTag[]>;
  create: (bulletin: ApiTagRequest) => Promise<ApiTag>;
  update: (id: string, bulletin: ApiTagRequest) => Promise<ApiTag>;
  delete: (id: string) => Promise<void>;
}

export const tagOperations = (opts: AnslagApiClientOptions): TagOperations => ({
  list: async () => {
    const res = await call<undefined, ApiTag[]>('GET', `/tags`, {
      ...opts,
    });
    return z.array(ApiTagModel).parse(res);
  },
  create: async (bulletin) => {
    const body = ApiTagRequestModel.parse(bulletin);
    const res = await call<ApiTagRequest, ApiTag>('POST', `/tags`, {
      ...opts,
      body,
    });
    return ApiTagModel.parse(res);
  },
  update: async (id, bulletin) => {
    const body = ApiTagRequestModel.parse(bulletin);
    const res = await call<ApiTagRequest, ApiTag>('PUT', `/tags/${id}`, {
      ...opts,
      body,
    });
    return ApiTagModel.parse(res);
  },
  delete: async (id) =>
    await call<undefined, undefined>('DELETE', `/tags/${id}`, {
      ...opts,
    }),
});
