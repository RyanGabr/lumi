import { CategoriesList } from "@/components/gallery/categories-list";
import { GalleryHeader } from "@/components/gallery/gallery-header";
import { ImagesList } from "@/components/gallery/images-list";
import { LoadingCategoriesList } from "@/components/gallery/loading-categories-list";
import { LoadingImagesList } from "@/components/gallery/loading-images-list";
import { DialogProvider } from "@/context/dialog-context";
import { Suspense } from "react";

export function Gallery() {
  return (
    <DialogProvider>
      <div className="space-y-7">
        <GalleryHeader />
        <Suspense fallback={<LoadingCategoriesList />}>
          <CategoriesList />
        </Suspense>
        <Suspense fallback={<LoadingImagesList />}>
          <ImagesList />
        </Suspense>
      </div>
    </DialogProvider>
  );
}
