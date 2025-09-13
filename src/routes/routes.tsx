import { Layout } from "@/components/layout/layout";
import { Gallery } from "@/pages/app/gallery";
import { Auth } from "@/pages/auth/auth";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./protected-route";
import { Category } from "@/pages/app/category";
import { Favorite } from "@/pages/app/favorite";
import { Feedback } from "@/pages/app/feedback";

export const routes = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Navigate to="gallery" replace />,
      },
      {
        path: "",
        element: <Layout />,
        children: [
          {
            path: "gallery",
            element: <Gallery />,
          },
          {
            path: "category",
            element: <Category />,
          },
          {
            path: "favorite",
            element: <Favorite />,
          },
          {
            path: "feedback",
            element: <Feedback />,
          },
        ],
      },
    ],
  },
]);
