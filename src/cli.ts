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
      audience: 'https://api.anslag.dev.allbin.se',
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

    console.log('--- Bulletins ---');

    console.log('list bulletins:');
    const bulletins = await client.bulletins.list();
    console.log(bulletins);

    console.log('create bulletin:');
    const bulletin = await client.bulletins.create({
      name: 'Test',
      data: [{ test: 'test' }],
      type: 'test',
      tags: ['test', 'test2'],
    });
    console.log(bulletin);

    console.log('update bulletin:');
    const updatedBulletin = await client.bulletins.update(bulletin.id, {
      name: 'Test2',
      data: [{ test2: 'test2' }],
      type: 'test2',
      tags: ['test2'],
      archived: false,
      updated_at: bulletin.updated_at,
    });
    console.log(updatedBulletin);

    console.log('delete bulletin:');
    await client.bulletins.delete(updatedBulletin.id);

    console.log('list bulletins after delete:');
    const bulletinsAfterDelete = await client.bulletins.list();
    console.log(bulletinsAfterDelete);

    console.log('get deleted bulletin:');
    const getBulletin = await client.bulletins.get(bulletin.id);
    console.log(getBulletin);

    // Tags
    console.log('--- Tags ---');

    console.log('list tags:');
    const tags = await client.tags.list();
    console.log(tags);

    console.log('create tag:');
    const tag = await client.tags.create({
      name: 'Test',
    });
    console.log(tag);

    console.log('update tag:');
    const updatedTag = await client.tags.update(tag.id, {
      name: 'Test2',
    });
    console.log(updatedTag);

    console.log('delete tag:');
    await client.tags.delete(updatedTag.id);

    console.log('list tags after delete:');
    const tagsAfterDelete = await client.tags.list();
    console.log(tagsAfterDelete);

    // end
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
