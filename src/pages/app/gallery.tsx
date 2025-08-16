import { CategoriesList } from "@/components/gallery/categories-list";
import { GalleryHeader } from "@/components/gallery/gallery-header";
import { ImagesList } from "@/components/gallery/images-list";
import { LoadingCategoriesList } from "@/components/gallery/loading-categories-list";
import { Suspense } from "react";

export function Gallery() {
  return (
    <div className="space-y-7">
      <GalleryHeader />
      <Suspense fallback={<LoadingCategoriesList />}>
        <CategoriesList />
      </Suspense>
      <ImagesList />
    </div>
  );
}
