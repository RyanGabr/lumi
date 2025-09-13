import { supabase } from "@/lib/supabase";
import type { ImageType } from "@/types/image";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useGetImages() {
  return useSuspenseQuery<ImageType[]>({
    queryKey: ["images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("images")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function useGetImagesByCategoryId(categoryId: string) {
  return useSuspenseQuery<ImageType[]>({
    queryKey: ["images", categoryId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("images")
        .select("*")
        .eq("category_id", categoryId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data;
    },
  });
}

export function useGetFavoriteImages() {
  return useSuspenseQuery<ImageType[]>({
    queryKey: ["favorite-images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("images")
        .select("*")
        .eq("is_favorite", "TRUE");

      if (error) throw error;

      return data;
    },
  });
}
