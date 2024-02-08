import { z } from 'zod';
import call from '../call';

import type { AnslagApiClientOptions } from '../options';

import {
  ApiBulletin,
  ApiBulletinModel,
  ApiBulletinCreateRequest,
  ApiBulletinCreateRequestModel,
  ApiBulletinUpdateRequest,
  ApiBulletinUpdateRequestModel,
} from '../types';

interface BulletinOperations {
  list: () => Promise<ApiBulletin[]>;
  get: (id: string) => Promise<ApiBulletin>;
  create: (bulletin: ApiBulletinCreateRequest) => Promise<ApiBulletin>;
  update: (
    id: string,
    bulletin: ApiBulletinUpdateRequest,
  ) => Promise<ApiBulletin>;
  delete: (id: string) => Promise<void>;
}

export const bulletinOperations = (
  opts: AnslagApiClientOptions,
): BulletinOperations => ({
  list: async () => {
    const bulletins = await call<undefined, ApiBulletin[]>(
      'GET',
      `/bulletins`,
      {
        ...opts,
      },
    );
    return z.array(ApiBulletinModel).parse(bulletins);
  },
  get: async (id) => {
    const res = await call<undefined, ApiBulletin>('GET', `/bulletins/${id}`, {
      ...opts,
    });
    return ApiBulletinModel.parse(res);
  },
  create: async (bulletin) => {
    const body = ApiBulletinCreateRequestModel.parse(bulletin);
    const res = await call<ApiBulletinCreateRequest, ApiBulletin>(
      'POST',
      `/bulletins`,
      {
        ...opts,
        body,
      },
    );
    return ApiBulletinModel.parse(res);
  },
  update: async (id, bulletin) => {
    const body = ApiBulletinUpdateRequestModel.parse(bulletin);
    const res = await call<ApiBulletinUpdateRequest, ApiBulletin>(
      'PUT',
      `/bulletins/${id}`,
      {
        ...opts,
        body,
      },
    );
    return ApiBulletinModel.parse(res);
  },
  delete: async (id) =>
    await call<undefined, undefined>('DELETE', `/bulletins/${id}`, {
      ...opts,
    }),
});
