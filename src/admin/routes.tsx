import type { RouteObject } from "react-router-dom";

import AdminLayout from "./layout/AdminLayout";
import Calendar from "./pages/Calendar";
import Overview from "./pages/Overview";

export const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Overview />
      },
      {
        path: "overview",
        element: <Overview />
      },
      {
        path: "calendar",
        element: <Calendar />
      }
    ]
  }
];
