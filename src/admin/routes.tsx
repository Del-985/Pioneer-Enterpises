import type { RouteObject } from "react-router-dom";

import AdminLayout from "./layout/AdminLayout";
import Calendar from "./pages/Calendar";
import Contacts from "./pages/Contacts";
import Customers from "./pages/Customers";
import Overview from "./pages/Overview";

export const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Overview /> },
      { path: "overview", element: <Overview /> },
      { path: "calendar", element: <Calendar /> },
      { path: "customers", element: <Customers /> },
      { path: "contacts", element: <Contacts /> }
    ]
  }
];
