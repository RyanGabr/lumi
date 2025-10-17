import { CheckCircle2, MousePointerClick, Shapes } from "lucide-react";

export function Tags() {
  return (
    <div className="flex items-center gap-3 justify-center">
      <div className="flex items-center gap-2 bg-foreground/5 rounded-md py-2.5 px-4 cursor-default select-none text-muted-foreground">
        <MousePointerClick className="size-5" />
        <span className="font-medium text-sm">Experiência do usuário</span>
      </div>
      <div className="flex items-center gap-2 bg-foreground/5 rounded-md py-2.5 px-4 cursor-default select-none text-muted-foreground">
        <CheckCircle2 className="size-4" />
        <span className="font-medium text-sm">Interface</span>
      </div>
      <div className="flex items-center gap-2 bg-foreground/5 rounded-md py-2.5 px-4 cursor-default select-none text-muted-foreground">
        <Shapes className="size-4.5" />
        <span className="font-medium text-sm">Funcionalidades</span>
      </div>
    </div>
  );
}
