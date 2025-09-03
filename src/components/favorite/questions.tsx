import { CircleQuestionMark } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";

export function Questions() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="has-[>svg]:px-2 h-7 rounded-sm font-medium"
        >
          <CircleQuestionMark />
          Dúvidas sobre a página
        </Button>
      </PopoverTrigger>
      <PopoverContent className="rounded-xl py-3 space-y-3" align="end">
        <header>
          <span className="text-xs font-medium text-foreground/50">
            Dúvidas
          </span>
        </header>
        <div className="space-y-7">
          <div className="space-y-2">
            <h3 className="font-medium text-sm">
              Como posso remover imagem dos favoritos?
            </h3>
            <p className="text-sm text-foreground/50">
              Para remover uma imagem dos favoritos, basta clicar com o botão
              direito sobre ela e selecionar a opção "Remover dos favoritos".
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Como favoritar imagens?</h3>
            <p className="text-sm text-foreground/50">
              Para favoritar imagens, na sua galeria ou categoria, clique com o
              botão direito sobre a imagem e selecione a opção "Adicionar aos
              favoritos".
            </p>
          </div>
        </div>
        <Separator />
        <div>
          <p className="font-medium text-xs text-foreground/40">
            Dúvidas frequentes desta página.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
