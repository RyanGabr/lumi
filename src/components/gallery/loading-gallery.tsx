import { Loader2 } from "lucide-react";

export function LoadingGallery() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-foreground/50" />
    </div>
  );
}
