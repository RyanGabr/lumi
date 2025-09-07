import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { CreateImageFormType, ImageType } from "@/types/image";
import { useUser } from "@supabase/auth-helpers-react";

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

export function useGetImagesByCategoryId(categoryId: string) {
  return useSuspenseQuery<ImageType[]>({
    queryKey: ["images", categoryId],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const { data, error } = await supabase
        .from("images")
        .select("*")
        .eq("category_id", categoryId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data;
    },
  });
}

export function useGetFavoriteImages() {
  return useSuspenseQuery<ImageType[]>({
    queryKey: ["favorite-images"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const { data, error } = await supabase
        .from("images")
        .select("*")
        .eq("is_favorite", "TRUE");

      if (error) throw error;

      return data;
    },
  });
}

function sanitizeFileName(fileName: string) {
  return fileName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "_");
}

export function useCreateImage() {
  const queryClient = useQueryClient();
  const user = useUser();

  return useMutation({
    mutationFn: async (formData: CreateImageFormType) => {
      if (!user) throw new Error("User not logged in");

      const safeFileName = sanitizeFileName(formData.file.name);
      const categoryFolder = formData.category_id ?? "uncategorized";
      const filePath = `users/${user.id}/categories/${categoryFolder}/${safeFileName}`;

      // Image archive upload
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, formData.file, {
          cacheControl: "3600",
          upsert: false,
        });
      if (uploadError) throw uploadError;

      // Get image public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(filePath);

      // Insert image
      const { data, error: insertError } = await supabase
        .from("images")
        .insert({
          description: formData.description,
          category_id: formData.category_id,
          user_id: user.id,
          image_url: publicUrl,
          is_favorite: formData.is_favorite,
          path: filePath,
        })
        .select()
        .single();
      if (insertError) throw insertError;

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });
}

export function useDeleteImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, path }: { id: string; path: string[] }) => {
      // Delete image from Storage
      const { error: storageError } = await supabase.storage
        .from("images")
        .remove(path);

      if (storageError) throw storageError;

      // Delete image
      const { error } = await supabase.from("images").delete().eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });
}

export function useFavoriteImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      is_favorite,
    }: {
      id: string;
      is_favorite: boolean;
    }) => {
      const { error } = await supabase
        .from("images")
        .update({ is_favorite })
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
      queryClient.invalidateQueries({ queryKey: ["favorite-images"] });
    },
  });
}

export function useUpdateImageCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      category_id,
    }: {
      id: string;
      category_id: string;
    }) => {
      const { error } = await supabase
        .from("images")
        .update({ category_id })
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });
}
