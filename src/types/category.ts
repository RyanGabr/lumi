import type { createCategorySchema } from "@/schemas/create-category-schema";
import { updateCategorySchema } from "@/schemas/update-category-schema";
import type z from "zod";

export type CategoryType = {
  id: string;
  color: string;
  created_at: string;
  description: string;
  name: string;
  user_id: string;
};

// Create category types

// Use this type to type forms
export type CreateCategoryFormType = z.infer<typeof createCategorySchema>;

// Edit category types

// Use this type to type forms
export type UpdateCategoryFormType = z.infer<typeof updateCategorySchema>;

// Use this type to type update category hook
export type UpdateCategoryType = UpdateCategoryFormType & {
  id: string;
};
