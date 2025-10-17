import { Header } from "@/components/collection/header";
import { ImagesList } from "@/components/collection/images-list";
import { Overview } from "@/components/collection/overview";
import { LoadingPage } from "@/components/ui/loading-page";
import { Suspense } from "react";

export function Collection() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Header />
      <div className="space-y-7 w-full xl:w-10/12 2xl:w-8/12 mx-auto p-5 md:p-7 md:px-10">
        <Overview />
        <ImagesList />
      </div>
    </Suspense>
  );
}
