import type { createCategorySchema } from "@/schemas/create-category-schema";
import type z from "zod";

export type CategoryType = {
  id: string;
  color: string;
  created_at: string;
  description: string;
  name: string;
  user_id: string;
};

export type CreateCategoryFormType = z.infer<typeof createCategorySchema>;

export type CreateCategoryType = CreateCategoryFormType & {
  user_id: string;
};
