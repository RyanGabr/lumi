import { CategoriesList } from "@/components/gallery/categories-list";
import { GalleryHero } from "@/components/gallery/hero";
import { ImagesList } from "@/components/gallery/images-list";
import { LoadingCategoriesList } from "@/components/gallery/loading-categories-list";
import { LoadingImagesList } from "@/components/gallery/loading-images-list";
import { Suspense } from "react";

export function Gallery() {
  return (
    <div className="space-y-7 xl:w-10/12 2xl:w-8/12 mx-auto p-5 md:p-7 md:px-10">
      <GalleryHero />
      <Suspense fallback={<LoadingCategoriesList />}>
        <CategoriesList />
      </Suspense>
      <Suspense fallback={<LoadingImagesList />}>
        <ImagesList />
      </Suspense>
    </div>
  );
}
