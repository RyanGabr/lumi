import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().nonempty("Preencha o campo"),
  description: z.string().optional(),
  color: z.string().nonempty("Selecione uma cor"),
});
