import type { createCategorySchema } from "@/schemas/create-category-schema";
import type { editCategorySchema } from "@/schemas/edit-category-schema";
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

// Use this type to type create category hook
export type CreateCategoryType = CreateCategoryFormType & {
  user_id: string;
};

// Edit category types

// Use this type to type forms
export type EditCategoryFormType = z.infer<typeof editCategorySchema>;

// Use this type to type edit category hook
export type EditCategoryType = EditCategoryFormType & {
  id: string;
};
