import { supabase } from "@/lib/supabase";
import type { UpdateCollectionType } from "@/types/collection";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateCollectionType) => {
      const { id, ...fields } = data;

      const { error } = await supabase
        .from("categories")
        .update(fields)
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collection"] });
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });
}
