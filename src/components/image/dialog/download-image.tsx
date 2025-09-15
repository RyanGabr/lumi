import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Download } from "lucide-react";
import { useImage } from "../image";
import { supabase } from "@/lib/supabase";

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
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={downloadImage} variant="ghost" size="sm">
          <Download className="size-4.5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Baixar imagem</TooltipContent>
    </Tooltip>
  );
}
