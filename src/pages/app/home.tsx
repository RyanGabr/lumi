import { CollectionsList } from "@/components/home/collections-list";
import { Feedback } from "@/components/home/feedback";
import { Hero } from "@/components/home/hero";
import { ImagesList } from "@/components/home/images-list";
import { LoadingPage } from "@/components/ui/loading-page";
import { Suspense, useEffect } from "react";

export function Home() {
  useEffect(() => {
    document.title = "Lumi | Página inicial";
  }, []);

  return (
    <Suspense fallback={<LoadingPage />}>
      <div className="space-y-7 w-full xl:w-10/12 2xl:w-8/12 mx-auto p-5 md:p-7 md:px-10">
        <Hero />
        <Feedback />
        <CollectionsList />
        <ImagesList />
      </div>
    </Suspense>
  );
}
