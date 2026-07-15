import { createBrowserRouter } from "react-router-dom";

import { adminRoutes } from "./admin/routes";
import { landscapingRoutes } from "./divisions/landscaping/routes";
import { websiteRoutes } from "./website/routes";

export const router = createBrowserRouter([
  ...websiteRoutes,
  ...landscapingRoutes,
  ...adminRoutes
]);
