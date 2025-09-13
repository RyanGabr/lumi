import { Form } from "@/components/feedback/form";
import { Tags } from "@/components/feedback/tags";
import { Logo } from "@/components/ui/logo";
import { useEffect } from "react";

export function Feedback() {
  useEffect(() => {
    document.title = "Lumi | Enviar feedback";
  }, []);

  return (
    <div className="flex flex-col gap-7 items-center justify-center p-5 w-full h-[85%] lg:w-9/12 2xl:w-1/2 2xl:p-0 mx-auto">
      <Logo className="size-16"/>
      <Form />
      <Tags />
    </div>
  );
}
