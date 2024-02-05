import axios from 'axios';
import jwt from 'jsonwebtoken';
import { DateTime } from 'luxon';

import { AnslagApiClient } from './index';

interface AuthCtx {
  token?: string;
}

const ctx: AuthCtx = {};

const isValid = (token: string): boolean => {
  try {
    const decoded = jwt.decode(token, { json: true });
    if (!decoded) {
      return false;
    }

    if (!decoded.exp) {
      return true;
    }

    if (
      DateTime.now() >
      DateTime.fromMillis(decoded.exp * 1000).minus({ seconds: 60 })
    ) {
      return false;
    }

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const getToken = async (): Promise<string> => {
  if (ctx.token && isValid(ctx.token)) {
    return ctx.token;
  }

  const response = await axios.post<{ access_token: string }>(
    'https://allbin.eu.auth0.com/oauth/token',
    {
      audience: 'https://api.viu-dms.dev.allbin.se',
      grant_type: 'client_credentials',
      client_id: 'vCEC4uiW9ztEeoBwf7bLyP1iquZjXppX',
      client_secret: process.env.CLIENT_SECRET,
    },
  );

  ctx.token = response.data.access_token;
  return ctx.token;
};

void (async () => {
  try {
    const client = AnslagApiClient({
      baseUrl: 'http://localhost:50000',
      token: getToken,
      apiKey: process.env.API_KEY,
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
