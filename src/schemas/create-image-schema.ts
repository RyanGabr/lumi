import z from "zod";

export const createImageSchema = z.object({
  file: z
    .instanceof(File, { message: "Selecione um arquivo válido" }),
    // .refine((file) => file.size > 0, "O arquivo não pode estar vazio"),
  description: z.string().optional(),
  category_id: z.string().optional(),
  is_favorite: z.boolean(),
});
