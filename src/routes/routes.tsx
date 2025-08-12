import { Layout } from "@/components/layout/layout";
import { Gallery } from "@/pages/app/gallery";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "gallery",
        element: <Gallery />,
      },
    ],
  },
]);
