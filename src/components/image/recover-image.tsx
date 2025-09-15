import { Undo2 } from "lucide-react";
import { ContextMenuItem } from "../ui/context-menu";
import { useUpdateImage } from "@/hooks/use-update-image";
import { useImage } from "./image";
import { toast } from "sonner";

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
