import { RouterProvider } from "react-router-dom";

import DebugToolbar from "./shared/components/DebugToolbar";
import { router } from "./router";

const showDebugToolbar =
  import.meta.env.DEV || import.meta.env.VITE_DEBUG_NAV === "true";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      {showDebugToolbar ? <DebugToolbar /> : null}
    </>
  );
}

export default App;
