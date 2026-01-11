import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./OtherPages/App.jsx";

import NotfindPage from "./StaticCompent/NotfindPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ArticleManagement from "./OtherPages/ArticleManagement.jsx";

const router = createBrowserRouter([
  { path: "/", element: <ArticleManagement /> },

  { path: "*", element: <NotfindPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
