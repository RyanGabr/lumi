import type { createImageSchema } from "@/schemas/create-image-schema";
import type z from "zod";

export type ImageType = {
  category_id: string;
  description: string;
  id: string;
  image_url: string;
  is_favorite: boolean;
  name: string;
  user_id: string;
};

export type CreateImageFormType = z.infer<typeof createImageSchema>;

export type CreateImageType = CreateImageFormType & {
  user_id: string;
};