import { CategoriesList } from "@/components/gallery/categories-list";
import { GalleryHeader } from "@/components/gallery/gallery-header";
import { ImagesList } from "@/components/gallery/images-list";

export function Gallery() {
  return (
    <div className="space-y-7">
      <GalleryHeader />
      <CategoriesList />
      <ImagesList />
    </div>
  );
}
