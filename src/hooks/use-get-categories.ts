import { supabase } from "@/lib/supabase";
import type { CategoryType } from "@/types/category";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useGetCategories() {
  return useSuspenseQuery<CategoryType[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data;
    },
  });
}

export function useGetCategoryById(id: string) {
  return useSuspenseQuery<CategoryType>({
    queryKey: ["category", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      return data;
    },
  });
}
