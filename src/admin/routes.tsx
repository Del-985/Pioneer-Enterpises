import type { RouteObject } from "react-router-dom";

import AdminLayout from "./layout/AdminLayout";
import Calendar from "./pages/Calendar";
import Contacts from "./pages/Contacts";
import Customers from "./pages/Customers";
import Estimates from "./pages/Estimates";
import Expenses from "./pages/Expenses";
import Forms from "./pages/Forms";
import History from "./pages/History";
import Jobs from "./pages/Jobs";
import Metrics from "./pages/Metrics";
import Notifications from "./pages/Notifications";
import Overview from "./pages/Overview";
import Settings from "./pages/Settings";

export const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Overview /> },
      { path: "overview", element: <Overview /> },
      { path: "calendar", element: <Calendar /> },
      { path: "customers", element: <Customers /> },
      { path: "contacts", element: <Contacts /> },
      { path: "estimates", element: <Estimates /> },
      { path: "jobs", element: <Jobs /> },
      { path: "expenses", element: <Expenses /> },
      { path: "forms", element: <Forms /> },
      { path: "history", element: <History /> },
      { path: "metrics", element: <Metrics /> },
      { path: "notifications", element: <Notifications /> },
      { path: "settings", element: <Settings /> }
    ]
  }
];