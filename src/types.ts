import { z } from 'zod';

export const ApiBulletinModel = z.object({
  id: z.string().uuid(),
  organization_id: z.string(),
  created_at: z.string().datetime(),
  created_by: z.string(),
  updated_at: z.string().datetime(),
  updated_by: z.string(),
  deleted_at: z.string().datetime().optional(),
  deleted_by: z.string().optional(),
  name: z.string(),
  data: z.array(z.unknown()),
  type: z.string(),
  tags: z.string().array(),
});
export type ApiBulletin = z.infer<typeof ApiBulletinModel>;

export const ApiBulletinRequestModel = z.object({
  name: z.string(),
  data: z.array(z.unknown()),
  type: z.string(),
  tags: z.string().array(),
});
export type ApiBulletinRequest = z.infer<typeof ApiBulletinRequestModel>;

export const ApiTagModel = z.object({
  id: z.string().uuid(),
  organization_id: z.string(),
  name: z.string(),
});
export type ApiTag = z.infer<typeof ApiTagModel>;

export const ApiTagRequestModel = z.object({
  name: z.string(),
});
export type ApiTagRequest = z.infer<typeof ApiTagRequestModel>;
