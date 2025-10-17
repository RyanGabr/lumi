import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ZoomInIcon } from "lucide-react";
import { useControls } from "react-zoom-pan-pinch";

export function ZoomIn() {
  const { zoomIn } = useControls();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={() => zoomIn()} variant="ghost" size="sm">
          <ZoomInIcon className="size-4.5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Ampliar</TooltipContent>
    </Tooltip>
  );
}
