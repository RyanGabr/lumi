import { useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { ImageType } from "@/types/image";

export function useGetImages() {
  return useSuspenseQuery<ImageType[]>({
    queryKey: ["images"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300)); // 300ms delay

      const { data, error } = await supabase
        .from("images")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}
