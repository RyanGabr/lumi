import { supabase } from "@/lib/supabase";
import type { CollectionType } from "@/types/collection";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useGetCollection() {
  return useSuspenseQuery<CollectionType[]>({
    queryKey: ["collections"],
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

export function useGetCollectionById(id: string) {
  return useSuspenseQuery<CollectionType>({
    queryKey: ["collection", id],
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
