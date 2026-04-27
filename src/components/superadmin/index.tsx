import { Navigate, Route, Routes } from "react-router-dom";
import SuperAdminNavbar from "./superadmin-navbar";
import ManageAdmins from "./manage-admins";

const SuperAdmin = () => {
  return (
    <div className="flex-1 flex flex-col">
      <SuperAdminNavbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home/admins" replace />} />
        <Route path="/admins" element={<ManageAdmins />} />
      </Routes>
    </div>
  );
};

export default SuperAdmin;
