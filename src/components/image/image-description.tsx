import {
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "../ui/context-menu";
import { Text } from "lucide-react";
import { useRef } from "react";
import { useImage } from "./image";

export function ImageDescription() {
  const { description } = useImage();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger className="gap-2">
        <Text />
        Descrição
      </ContextMenuSubTrigger>
      <ContextMenuSubContent className="w-56 p-2.5">
        <textarea
          ref={textareaRef}
          placeholder="Adicionar descrição..."
          className="font-medium text-sm w-full resize-none focus:outline-none overflow-hidden h-full"
          defaultValue={description}
          value={description}
          onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
          }}
        />
      </ContextMenuSubContent>
    </ContextMenuSub>
  );
}
