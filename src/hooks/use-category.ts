import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type {
  CategoryType,
  CreateCategoryType,
  EditCategoryType,
} from "@/types/category";

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

export function useGetCategoryById(id: string) {
  return useSuspenseQuery<CategoryType>({
    queryKey: ["category", id],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));

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

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error: imagesError } = await supabase
        .from("images")
        .delete()
        .eq("category_id", id);

      if (imagesError) throw imagesError;

      const { error } = await supabase.from("categories").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useEditCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EditCategoryType) => {
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
