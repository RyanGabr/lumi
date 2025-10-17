import { supabase } from "@/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      // Get images from collection
      const { data: images, error: imagesError } = await supabase
        .from("images")
        .select("id, path")
        .eq("category_id", id);

      if (imagesError) throw imagesError;

      // Get images path and delete from storage
      if (images && images.length > 0) {
        const paths = images.map((img) => img.path);
        const { error: storageError } = await supabase.storage
          .from("images")
          .remove(paths);

        if (storageError) throw storageError;
      }

      // Delete images
      const { error: deleteImagesError } = await supabase
        .from("images")
        .delete()
        .eq("category_id", id);

      if (deleteImagesError) throw deleteImagesError;

      // Delete collection
      const { error: deleteCollectionError } = await supabase
        .from("categories")
        .delete()
        .eq("id", id);
      if (deleteCollectionError) throw deleteCollectionError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
