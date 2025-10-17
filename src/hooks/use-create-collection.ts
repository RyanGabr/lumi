import { supabase } from "@/lib/supabase";
import type { CreateCollectionFormType } from "@/types/collection";
import { useUser } from "@supabase/auth-helpers-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCollection() {
  const queryClient = useQueryClient();
  const user = useUser();

  return useMutation({
    mutationFn: async (formData: CreateCollectionFormType) => {
      const { data, error } = await supabase
        .from("categories")
        .insert({
          ...formData,
          user_id: user?.id,
        })
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });
}
