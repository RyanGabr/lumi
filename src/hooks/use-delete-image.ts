import { supabase } from "@/lib/supabase";
import type { ImageType } from "@/types/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
      queryClient.invalidateQueries({ queryKey: ["trashed-images"] });
    },
  });
}

export function useEmptyTrash() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await supabase
        .from("images")
        .select("*")
        .eq("is_deleted", true)
        .order("created_at", { ascending: false });

      const trashedImages = data as ImageType[] | null;

      let storageError = null;

      if (trashedImages) {
        for (const image of trashedImages) {
          const { error } = await supabase.storage
            .from("images")
            .remove([image.path]);

          if (error) {
            storageError = error;
            break;
          }
        }
      }

      if (storageError) throw storageError;

      // Delete image
      const { error } = await supabase.from("images").delete().eq("is_deleted", true);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
      queryClient.invalidateQueries({ queryKey: ["trashed-images"] });
    },
  });
}
