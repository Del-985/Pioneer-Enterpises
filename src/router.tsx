import { createBrowserRouter } from "react-router-dom";

import Layout from "./components/layout/Layout";
import About from "./pages/About";
import Companies from "./pages/Companies";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Landscaping from "./pages/divisions/Landscaping";
import Productions from "./pages/divisions/Productions";
import Transport from "./pages/divisions/Transport";

export const router = createBrowserRouter([
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
        path: "productions",
        element: <Productions />
      },
      {
        path: "transport",
        element: <Transport />
      }
    ]
  }
]);