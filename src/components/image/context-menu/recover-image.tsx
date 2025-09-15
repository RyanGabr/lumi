import { Undo2 } from "lucide-react";
import { useUpdateImage } from "@/hooks/use-update-image";
import { toast } from "sonner";
import { useImage } from "../image";
import { ContextMenuItem } from "@/components/ui/context-menu";

export function RecoverImage() {
  const { id } = useImage();
  const { mutateAsync, isPending } = useUpdateImage();

  async function recoverImage() {
    await mutateAsync({ id: id, data: { is_deleted: false } });

    toast.info("Imagem recuperada", {
      description: "Sua imagem está de volta à galeria",
      duration: 4000
    });
  }

  return (
    <ContextMenuItem disabled={isPending} onClick={recoverImage}>
      <Undo2 />
      Recuperar imagem
    </ContextMenuItem>
  );
}
