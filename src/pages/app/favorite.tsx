import { Header } from "@/components/favorite/header";
import { ImagesList } from "@/components/favorite/images-list";
import { LoadingFavorite } from "@/components/favorite/loading-favorite";
import { Overview } from "@/components/favorite/overview";
import { Suspense } from "react";

export function Favorite() {
  return (
    <Suspense fallback={<LoadingFavorite />}>
      <Header />
      <div className="space-y-7 w-full xl:w-10/12 2xl:w-8/12 mx-auto p-5 md:p-7 md:px-10">
        <Overview />
        <ImagesList />
      </div>
    </Suspense>
  );
}
