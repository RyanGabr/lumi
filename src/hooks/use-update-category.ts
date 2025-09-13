import { supabase } from "@/lib/supabase";
import type { UpdateCategoryType } from "@/types/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateCategoryType) => {
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
      queryClient.invalidateQueries({ queryKey: ["category"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
