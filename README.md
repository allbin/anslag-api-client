# viu-api-client

### Example use
```typescript
import { ViuApiClient } from '@allbin/viu-api-client';

const client = ViuApiClient({
  baseUrl: 'https://api.viu.dev.allbin.se',
  token: () => getTokenPromise(),
});

const devices = await client.devices.list();
```


### Generate new types from viu-api

Adjust path to api.d.ts to fit your own machine

```bash
cat ../viu-api/src/types/api.d.ts | sed -e 's/^type/export type/g' > src/api.ts && npx eslint --fix src/api.ts
```
