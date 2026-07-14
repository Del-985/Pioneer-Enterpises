import type { RouteObject } from "react-router-dom";

import Layout from "./layout/Layout";
import About from "./pages/About";
import Companies from "./pages/Companies";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Landscaping from "../divisions/landscaping/Landscaping";
import Productions from "../divisions/productions/Productions";
import Transport from "../divisions/transport/Transport";

export const websiteRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "companies",
        element: <Companies />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "landscaping",
        element: <Landscaping />
      },
      {
        path: "transport",
        element: <Transport />
      },
      {
        path: "productions",
        element: <Productions />
      }
    ]
  }
];
