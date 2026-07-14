import { createBrowserRouter } from "react-router-dom";

import { adminRoutes } from "./admin/routes";
import { websiteRoutes } from "./website/routes";

export const router = createBrowserRouter([
  ...websiteRoutes,
  ...adminRoutes
]);