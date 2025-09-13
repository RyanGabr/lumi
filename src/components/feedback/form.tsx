import { ArrowRight, AtSign } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";

export function Form() {
  const user = useUser();
  const [feedbackText, setFeedbackText] = useState<string | undefined>();

  return (
    <>
      <h1 className="text-3xl font-bold text-foreground/90 tracking-tight">
        Como podemos melhorar?
      </h1>
      <div className="w-full p-3.5 border border-border/40 bg-foreground/3 rounded-2xl focus-within:border-border">
        {/* Textarea */}
        <textarea
          placeholder="Nos conte o que você está achando da experiência em usar nosso app..."
          className="w-full font-medium focus:outline-none resize-none min-h-32 overflow-hidden text-sm"
          onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
          }}
          onChange={(e) => setFeedbackText(e.target.value)}
          value={feedbackText}
        />

        {/* Form footer */}
        <div className="flex items-center justify-between">
          <Tooltip>
            <TooltipTrigger>
              <div className="px-3 py-1 rounded-md bg-foreground/7 flex items-center gap-1.5 cursor-pointer hover:bg-foreground/10">
                <AtSign className="size-4" />
                <span className="font-medium text-sm text-foreground/70">
                  {user?.email ?? "Nenhuma identificação encontrada"}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent className="relative bottom-1">
              Email para indentificar seu feedback
            </TooltipContent>
          </Tooltip>
          <div>
            <Button
              size="icon"
              className="rounded-full size-7"
              disabled={!feedbackText?.trim()}
            >
              <ArrowRight strokeWidth={3} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
