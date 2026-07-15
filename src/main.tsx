import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./styles/global.css";
import "./styles/admin.css";
import "./styles/calendar.css";
import "./styles/customers.css";
import "./styles/contacts.css";
import "./styles/expenses.css";
import "./styles/metrics.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    'Unable to start Pioneer Management Group: the root element with id="root" was not found.'
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
