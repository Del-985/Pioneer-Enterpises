import { RouterProvider } from "react-router-dom";

import DebugToolbar from "./shared/components/DebugToolbar";
import { router } from "./router";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      {import.meta.env.DEV ? <DebugToolbar /> : null}
    </>
  );
}

export default App;
