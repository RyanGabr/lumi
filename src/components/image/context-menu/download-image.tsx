import { Download } from "lucide-react";
import { ContextMenuItem } from "../../ui/context-menu";
import { supabase } from "@/lib/supabase";
import { useImage } from "../image";

export function DownloadImage() {
  const { path } = useImage();

  async function downloadImage() {
    const { data } = supabase.storage.from("images").getPublicUrl(path);

    const publicUrl: string = data?.publicUrl ?? "";
    if (!publicUrl) {
      console.error("Public URL não encontrada");
      return;
    }

    try {
      const response = await fetch(publicUrl);
      if (!response.ok) {
        throw new Error(`Erro ao buscar a imagem: ${response.statusText}`);
      }

      const blob: Blob = await response.blob();
      const url: string = URL.createObjectURL(blob);

      const link: HTMLAnchorElement = document.createElement("a");
      link.href = url;

      const fileName: string = path.split("/").pop() ?? "download.png";
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Erro ao baixar a imagem:", err);
    }
  }

  return (
    <ContextMenuItem onClick={downloadImage}>
      <Download />
      Fazer download
    </ContextMenuItem>
  );
}
