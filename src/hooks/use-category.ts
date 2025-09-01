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
      // Get images from category
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

      // Delete category
      const { error: deleteCategoryError } = await supabase
        .from("categories")
        .delete()
        .eq("id", id);
      if (deleteCategoryError) throw deleteCategoryError;
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
