# anslag-api-client

### Example use

```typescript
import { AnslagApiClient } from "@allbin/anslag-api-client";

const client = AnslagApiClient({
  baseUrl: "https://api.anslag.dev.allbin.se",
  token: () => getTokenPromise(),
});

const bulletins = await client.bulletins.list();
```
