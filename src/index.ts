import { AnslagApiClientOptions } from './options';

import { bulletinOperations, tagOperations } from './endpoints';

interface IAnslagApiClient {
  bulletins: ReturnType<typeof bulletinOperations>;
  tags: ReturnType<typeof tagOperations>;
}

const AnslagApiClient = (opts: AnslagApiClientOptions): IAnslagApiClient => ({
  bulletins: bulletinOperations(opts),
  tags: tagOperations(opts),
});

export { AnslagApiClient, IAnslagApiClient };

export * from './types';
