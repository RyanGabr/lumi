import type { createCollectionSchema } from "@/schemas/create-collection-schema";
import { updateCollectionSchema } from "@/schemas/update-collection-schema";
import type z from "zod";

export type CollectionType = {
  id: string;
  color: string;
  created_at: string;
  description: string;
  name: string;
  user_id: string;
};

// Create collection types

// Use this type to type forms
export type CreateCollectionFormType = z.infer<typeof createCollectionSchema>;

// Edit collection types

// Use this type to type forms
export type UpdateCollectionFormType = z.infer<typeof updateCollectionSchema>;

// Use this type to type update collection hook
export type UpdateCollectionType = UpdateCollectionFormType & {
  id: string;
};
