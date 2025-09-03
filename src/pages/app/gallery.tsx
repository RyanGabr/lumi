import { CategoriesList } from "@/components/gallery/categories-list";
import { GalleryHero } from "@/components/gallery/hero";
import { ImagesList } from "@/components/gallery/images-list";
import { LoadingGallery } from "@/components/gallery/loading-gallery";
import { Suspense } from "react";

export function Gallery() {
  return (
    <Suspense fallback={<LoadingGallery />}>
      <div className="space-y-7 xl:w-10/12 2xl:w-8/12 mx-auto p-5 md:p-7 md:px-10">
        <GalleryHero />
        <CategoriesList />
        <ImagesList />
      </div>
    </Suspense>
  );
}
