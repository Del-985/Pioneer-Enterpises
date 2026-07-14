import { Outlet } from "react-router-dom";

import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-layout__main">
        <AdminHeader />

        <main className="admin-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
