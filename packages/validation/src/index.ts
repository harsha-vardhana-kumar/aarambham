import { z } from "zod";
export const articleInputSchema = z.object({
  title: z.string().trim().min(8, "Use at least 8 characters.").max(180),
  summary: z.string().trim().min(20, "Use at least 20 characters.").max(500),
  body: z.string().trim().min(50, "Use at least 50 characters."),
  categoryId: z.string().min(1, "Choose a category."),
  districtId: z.string().optional(),
});
export type ArticleInput = z.infer<typeof articleInputSchema>;
export const archiveFilterSchema = z.object({
  year: z.coerce.number().int().min(1999).max(2100).optional(),
  month: z.coerce.number().int().min(1).max(12).optional(),
  date: z.string().date().optional(),
  publication: z.string().optional(),
  districtId: z.string().optional(),
});
export const scheduleSchema = z
  .string()
  .datetime({ offset: true })
  .refine(
    (value) => Date.parse(value) > Date.now(),
    "Choose a future time with timezone.",
  );
