import z from "zod";

export const createImageSchema = z.object({
  file: z
    .instanceof(File, { message: "Selecione um arquivo válido" })
    .refine((file) => file.size > 0, "O arquivo não pode estar vazio"),
  name: z.string().nonempty("Preencha o nome da imagem"),
  description: z.string().optional(),
  category_id: z.string().nonempty("Selecione uma categoria"),
  is_favorite: z.boolean()
});
