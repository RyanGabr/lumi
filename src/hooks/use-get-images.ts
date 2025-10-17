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
        .eq("is_deleted", false)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function useGetImageById(imageId: string) {
  return useSuspenseQuery<ImageType>({
    queryKey: ["image", imageId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("images")
        .select("*")
        .eq("id", imageId)
        .single();

      if (error) throw error;
      return data;
    },
  });
}

export function useGetImagesByCollectionId(collectionId: string) {
  return useSuspenseQuery<ImageType[]>({
    queryKey: ["images", collectionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("images")
        .select("*")
        .eq("category_id", collectionId)
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

export function useGetTrashedImages() {
  return useSuspenseQuery<ImageType[]>({
    queryKey: ["trashed-images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("images")
        .select("*")
        .eq("is_deleted", "TRUE");

      if (error) throw error;

      return data;
    },
  });
}
