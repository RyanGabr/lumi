import { Header } from "@/components/category/header";
import { ImagesList } from "@/components/category/images-list";
import { LoadingHeader } from "@/components/category/loading-header";
import { Overview } from "@/components/category/overview";
import { Suspense } from "react";

export function Category() {
  return (
    <>
      <Suspense fallback={<LoadingHeader />}>
        <Header />
      </Suspense>
      <div className="space-y-7 w-full xl:w-10/12 2xl:w-8/12 mx-auto p-5 md:p-7 md:px-10">
        <Suspense fallback={null}>
          <Overview />
        </Suspense>
        <Suspense fallback={null}>
          <ImagesList />
        </Suspense>
      </div>
    </>
  );
}
