import { ArrowLeft } from "lucide-react";
import { Button } from "../../ui/button";
import { DownloadImage } from "./download-image";
import { FavoriteImage } from "./favorite-image";
import { TrashImage } from "./trash-image";
import { RecoverImage } from "./recover-image";
import { DeleteImage } from "./delete-image";
// import { ZoomIn } from "./zoom-in";
// import { ZoomOut } from "./zoom-out";
import { parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetImageById } from "@/hooks/use-get-images";

function ImageIsNotTrashedOptions() {
  return (
    <>
      {/* <ZoomIn /> */}
      {/* <ZoomOut /> */}
      <DownloadImage />
      <FavoriteImage />
      <TrashImage />
    </>
  );
}

function ImageIsTrashedOptions() {
  return (
    <>
      {/* <ZoomIn /> */}
      {/* <ZoomOut /> */}
      <RecoverImage />
      <DeleteImage />
    </>
  );
}

export function Options() {
  const navigate = useNavigate();

  const location = useLocation();
  const imageId = location.search.replace("?", "");

  const {
    data: { created_at, is_deleted },
  } = useGetImageById(imageId);

  const date = parseISO(created_at);

  const formatted = format(date, "d 'de' MMMM 'de' yyyy 'às' HH:mm", {
    locale: ptBR,
  });

  return (
    <header className="relative w-full flex items-center justify-between border-b-2 px-3 h-14 bg-foreground/3">
      <div>
        <Button onClick={() => navigate(-1)} variant="ghost" size="sm">
          <ArrowLeft className="size-4.5" />
        </Button>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <span className="font-medium text-sm">{formatted}</span>
      </div>
      <div className="flex items-center">
        {is_deleted ? <ImageIsTrashedOptions /> : <ImageIsNotTrashedOptions />}
      </div>
    </header>
  );
}
