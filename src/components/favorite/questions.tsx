import { CircleQuestionMark } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function Questions() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="has-[>svg]:px-2 h-7 rounded-sm"
        >
          <CircleQuestionMark className="size-4.5" />
          {/* Dúvidas sobre a página */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="rounded-xl p-5.5 space-y-3" align="end">
        <div className="space-y-7">
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">
              Como posso remover imagem dos favoritos?
            </h3>
            <p className="text-sm font-medium text-foreground/50">
              Para remover uma imagem dos favoritos, basta clicar com o botão
              direito sobre ela e selecionar a opção "Remover dos favoritos".
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Como favoritar imagens?</h3>
            <p className="text-sm font-medium text-foreground/50">
              Para favoritar imagens, na sua galeria ou coleção, clique com o
              botão direito sobre a imagem e selecione a opção "Adicionar aos
              favoritos".
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
