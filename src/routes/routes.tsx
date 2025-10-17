import { Layout } from "@/components/layout/layout";
import { Home } from "@/pages/app/home";
import { Auth } from "@/pages/auth/auth";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./protected-route";
import { Collection } from "@/pages/app/collection";
import { Favorite } from "@/pages/app/favorite";
import { Feedback } from "@/pages/app/feedback";
import { Trash } from "@/pages/app/trash";
import { ImageDetails } from "@/pages/app/image-details";

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
        element: <Navigate to="home" replace />,
      },
      {
        path: "",
        element: <Layout />,
        children: [
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "collection",
            element: <Collection />,
          },
          {
            path: "favorite",
            element: <Favorite />,
          },
          {
            path: "feedback",
            element: <Feedback />,
          },
          {
            path: "trash",
            element: <Trash />,
          },
        ],
      },
      {
        path: "details",
        element: <ImageDetails />,
      },
    ],
  },
]);
