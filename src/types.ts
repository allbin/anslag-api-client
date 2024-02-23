import { z } from 'zod';

export const ApiBulletinModel = z.object({
  id: z.string().uuid(),
  organization_id: z.string().min(1),
  created_at: z.string().datetime({ offset: true }),
  created_by: z.string(),
  updated_at: z.string().datetime({ offset: true }),
  updated_by: z.string(),
  deleted_at: z.string().datetime({ offset: true }).optional(),
  deleted_by: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  data: z.array(z.unknown()),
  type: z.string(),
  tags: z.string().array(),
  archived: z.boolean(),
});
export type ApiBulletin = z.infer<typeof ApiBulletinModel>;

export const ApiBulletinCreateRequestModel = z.object({
  name: z.string(),
  data: z.array(z.unknown()),
  type: z.string(),
  tags: z.string().array(),
});
export type ApiBulletinCreateRequest = z.infer<
  typeof ApiBulletinCreateRequestModel
>;

export const ApiBulletinUpdateRequestModel =
  ApiBulletinCreateRequestModel.extend({
    archived: z.boolean(),
    updated_at: z.string().datetime({ offset: true }),
  });
export type ApiBulletinUpdateRequest = z.infer<
  typeof ApiBulletinUpdateRequestModel
>;

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
