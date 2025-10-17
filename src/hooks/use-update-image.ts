import { supabase } from "@/lib/supabase";
import type { ImageType, UpdateImageType } from "@/types/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateImageType }) => {
      const { error } = await supabase
        .from("images")
        .update(data)
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["image"] });
      queryClient.invalidateQueries({ queryKey: ["images"] });
      queryClient.invalidateQueries({ queryKey: ["trashed-images"] });
      queryClient.invalidateQueries({ queryKey: ["favorite-images"] });
    },
  });
}

export function useUpdateImageCollection() {
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
    onMutate: async (variables) => {
      queryClient.setQueryData(["images"], (old: ImageType[]) =>
        old.map((img) =>
          img.id === variables.id
            ? { ...img, is_favorite: variables.is_favorite }
            : img
        )
      );
    },
  });
}
