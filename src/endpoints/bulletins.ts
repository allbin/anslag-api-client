import call from '../call';

import type { AnslagApiClientOptions } from '../options';

import type { ApiBulletin, ApiBulletinRequest } from '../types';

interface BulletinOperations {
  list: () => Promise<ApiBulletin[]>;
  get: (id: string) => Promise<ApiBulletin>;
  create: (bulletin: ApiBulletinRequest) => Promise<ApiBulletin>;
  update: (id: string, bulletin: ApiBulletinRequest) => Promise<ApiBulletin>;
  delete: (id: string) => Promise<ApiBulletin>;
}

export const bulletinOperations = (
  opts: AnslagApiClientOptions,
): BulletinOperations => ({
  list: async () =>
    await call<undefined, ApiBulletin[]>('GET', `/bulletins`, { ...opts }),
  get: async (id) =>
    await call<undefined, ApiBulletin>('GET', `/bulletins/${id}`, { ...opts }),
  create: async (bulletin) =>
    await call<ApiBulletinRequest, ApiBulletin>('POST', `/bulletins`, {
      ...opts,
      body: bulletin,
    }),
  update: async (id, bulletin) =>
    await call<ApiBulletinRequest, ApiBulletin>('PUT', `/bulletins/${id}`, {
      ...opts,
      body: bulletin,
    }),
  delete: async (id) =>
    await call<undefined, ApiBulletin>('DELETE', `/bulletins/${id}`, {
      ...opts,
    }),
});
