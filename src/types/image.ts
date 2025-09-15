import type { createImageSchema } from "@/schemas/create-image-schema";
import type z from "zod";

export type ImageType = {
  category_id: string | null;
  description: string;
  id: string;
  image_url: string;
  is_favorite: boolean;
  user_id: string;
  path: string;
  created_at: string;
  is_deleted: boolean;
};

export type CreateImageFormType = z.infer<typeof createImageSchema>;

export type UpdateImageType = Partial<
  Omit<ImageType, "id" | "image_url" | "user_id" | "path" | "created_at">
>;
