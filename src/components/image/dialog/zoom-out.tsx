import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ZoomOutIcon } from "lucide-react";
import { useControls } from "react-zoom-pan-pinch";

export function ZoomOut() {
  const { zoomOut } = useControls();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={() => zoomOut()} variant="ghost" size="sm">
          <ZoomOutIcon className="size-4.5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Diminuir zoom</TooltipContent>
    </Tooltip>
  );
}
