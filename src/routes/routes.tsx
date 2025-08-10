import { Layout } from "@/components/layout/layout";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
]);
