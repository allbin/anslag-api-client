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
  type: z.string(),
  thumbnail: z.string().optional(),
  archived: z.boolean(),
  data: z.array(z.unknown()),
  tags: z.string().array(),
});
export type ApiBulletin = z.infer<typeof ApiBulletinModel>;

export const ApiBulletinCreateRequestModel = z.object({
  name: z.string(),
  type: z.string(),
  thumbnail: z.string(),
  tags: z.string().array(),
  data: z.array(z.unknown()),
});
export type ApiBulletinCreateRequest = z.infer<
  typeof ApiBulletinCreateRequestModel
>;

export const ApiBulletinUpdateRequestModel =
  ApiBulletinCreateRequestModel.extend({
    updated_at: z.string().datetime({ offset: true }),
    archived: z.boolean(),
  });
export type ApiBulletinUpdateRequest = z.infer<
  typeof ApiBulletinUpdateRequestModel
>;

export const ApiTagModel = z.object({
  id: z.string().uuid(),
  organization_id: z.string(),
  name: z.string(),
  color: z.string(),
  text_color: z.string(),
});
export type ApiTag = z.infer<typeof ApiTagModel>;

export const ApiTagRequestModel = z.object({
  name: z.string(),
  color: z.string(),
  text_color: z.string(),
});
export type ApiTagRequest = z.infer<typeof ApiTagRequestModel>;
