import { Layout } from "@/components/layout/layout";
import { Gallery } from "@/pages/app/gallery";
import { Auth } from "@/pages/auth/auth";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./protected-route";

export const routes = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <Layout />,
        children: [
          {
            path: "gallery",
            element: <Gallery />,
          },
        ],
      },
    ],
  },
]);
