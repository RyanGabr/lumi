import { Header } from "@/components/trash/header";
import { ImagesList } from "@/components/trash/images-list";
import { LoadingPage } from "@/components/ui/loading-page";
import { Suspense } from "react";

export function Trash() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Header />
      <div className="space-y-7 w-full xl:w-10/12 2xl:w-8/12 mx-auto p-5 md:p-7 md:px-10">
        <h1 className="text-3xl font-bold tracking-tight">Lixeira</h1>
        <ImagesList />
      </div>
    </Suspense>
  );
}
