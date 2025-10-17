import { ArrowRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";

export function Form() {
  const user = useUser();
  const [feedbackText, setFeedbackText] = useState<string | undefined>();

  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <>
      <h1 className="text-3xl font-bold text-foreground/90 tracking-tight">
        Como podemos melhorar?
      </h1>
      <div className="w-full p-3.5 border-2 border-border/40 bg-foreground/3 rounded-2xl focus-within:border-(--purple)">
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
              <div className="px-2.5 py-1.5 rounded-full bg-background border flex items-center gap-2 cursor-pointer hover:bg-foreground/2">
                <img src={avatarUrl} alt="User profile picture" className="size-5 rounded-full"/>
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
