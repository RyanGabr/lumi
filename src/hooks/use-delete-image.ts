import { supabase } from "@/lib/supabase";
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
    },
  });
}
