import { CategoriesList } from "@/components/gallery/categories-list";
import { GalleryHero } from "@/components/gallery/hero";
import { ImagesList } from "@/components/gallery/images-list";
import { LoadingPage } from "@/components/ui/loading-page";
import { Suspense, useEffect } from "react";

export function Gallery() {
  useEffect(() => {
    document.title = "Lumi | Página inicial";
  }, []);

  return (
    <Suspense fallback={<LoadingPage />}>
      <div className="space-y-7 w-full xl:w-10/12 2xl:w-8/12 mx-auto p-5 md:p-7 md:px-10">
        <GalleryHero />
        <CategoriesList />
        <ImagesList />
      </div>
    </Suspense>
  );
}
