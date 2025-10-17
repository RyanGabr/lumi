import { CollectionsList } from "@/components/collections/collections-list";
import { Header } from "@/components/collections/header";
import { LoadingPage } from "@/components/ui/loading-page";
import { Suspense } from "react";

export function Collections() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <div className="w-full xl:w-10/12 2xl:w-8/12 mx-auto p-5 md:p-7 md:px-10">
        <Header />
        <CollectionsList />
      </div>
    </Suspense>
  );
}
