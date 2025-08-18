import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { CategoryType, CreateCategoryType } from "@/types/category";

export function useGetCategories() {
  return useSuspenseQuery<CategoryType[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300)); // 300ms delay

      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data;
    },
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: CreateCategoryType) => {
      const { data, error } = await supabase
        .from("categories")
        .insert([formData])
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
