import { z } from "zod";

export const campQuerySchema = z.object({
  keyword: z.string().optional(),
  city: z.string().optional(),
  theme: z.string().optional(),
  campType: z.string().optional(),
  priceType: z.string().optional(),
  canOvernight: z.coerce.boolean().optional(),
  allowFire: z.coerce.boolean().optional(),
  petFriendly: z.coerce.boolean().optional(),
  familyFriendly: z.coerce.boolean().optional(),
  hasToilet: z.coerce.boolean().optional(),
  hasShower: z.coerce.boolean().optional(),
  hasPower: z.coerce.boolean().optional(),
  carAccessible: z.coerce.boolean().optional(),
  sortBy: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(24).default(12),
});

export const reviewCreateSchema = z.object({
  campId: z.string().min(1),
  overallScore: z.coerce.number().int().min(1).max(5),
  sceneScore: z.coerce.number().int().min(1).max(5),
  cleanScore: z.coerce.number().int().min(1).max(5),
  quietScore: z.coerce.number().int().min(1).max(5),
  accessScore: z.coerce.number().int().min(1).max(5),
  newbieScore: z.coerce.number().int().min(1).max(5),
  familyScore: z.coerce.number().int().min(1).max(5),
  costScore: z.coerce.number().int().min(1).max(5),
  text: z.string().min(20, "至少写 20 个字").max(600, "评论不能超过 600 个字"),
  visitDate: z.string().min(1),
  tagIds: z.array(z.string()).max(6).default([]),
  imageUrls: z.array(z.string().url()).max(4).default([]),
});

export const correctionSchema = z.object({
  campId: z.string().min(1),
  fieldName: z.string().min(1),
  currentValue: z.string().min(1),
  suggestedValue: z.string().min(1),
  reason: z.string().min(6).max(160),
});
