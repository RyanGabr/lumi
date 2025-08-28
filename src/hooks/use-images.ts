import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { CreateImageType, ImageType } from "@/types/image";

export function useGetImages() {
  return useSuspenseQuery<ImageType[]>({
    queryKey: ["images"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300)); // 300ms delay

      const { data, error } = await supabase
        .from("images")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function useGetImagesByCategoryId(categoryId: string){
  return useSuspenseQuery<ImageType[]>({
    queryKey: ["images", categoryId],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const { data, error } = await supabase
        .from("images")
        .select("*")
        .eq("category_id", categoryId)
        .order("created_at", { ascending: false })

      if (error) throw error;

      return data;
    },
  })
}

function sanitizeFileName(fileName: string) {
  return fileName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "_");
}

async function createImage(input: CreateImageType) {
  const safeFileName = sanitizeFileName(input.file.name);
  const filePath = `${safeFileName}`;

  const { error: uploadError } = await supabase.storage
    .from("images")
    .upload(filePath, input.file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from("images").getPublicUrl(filePath);

  const { data, error: insertError } = await supabase
    .from("images")
    .insert({
      name: input.name,
      description: input.description,
      category_id: input.category_id,
      user_id: input.user_id,
      image_url: publicUrl,
      is_favorite: input.is_favorite,
    })
    .select()
    .single();

  if (insertError) throw insertError;

  return data;
}

export function useCreateImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });
}
