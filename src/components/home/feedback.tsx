import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export function Feedback() {
  return (
    <div className="border border-border/60 rounded-2xl p-6 flex items-center justify-between w-full bg-foreground/2 overflow-hidden">
      <div className="w-1/2 flex flex-col gap-5">
        <div className="space-y-2">
          <h1 className="font-medium text-base">
            O que você gostaria de mudar?
          </h1>
          <p className="text-muted-foreground text-sm">
            Gostaríamos muito de saber sua opinião: conte o que achou do app, o
            que mais gostou e o que podemos melhorar para deixar sua experiência
            ainda melhor.
          </p>
        </div>

        <Link to="/feedback">
          <Button variant="purple" size="sm" className="w-fit rounded-sm">
            Enviar meu feedback
          </Button>
        </Link>
      </div>

      <div className="w-1/2 h-full relative">
        <div className="rounded-md bg-white w-96 h-72 absolute -right-10 -top-16 border-2 border-border/30"/>
      </div>
    </div>
  );
}
