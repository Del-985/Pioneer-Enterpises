import { Outlet } from "react-router-dom";

import LandscapingFooter from "./LandscapingFooter";
import LandscapingHeader from "./LandscapingHeader";

function LandscapingLayout() {
  return (
    <div className="landscaping-app">
      <LandscapingHeader />
      <main className="landscaping-app__main">
        <Outlet />
      </main>
      <LandscapingFooter />
    </div>
  );
}

export default LandscapingLayout;
