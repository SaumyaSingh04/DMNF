import AdminNavbar from "./admin-navbar";
import { CreateRestaurant } from "./create-restaurant";
import { JoinRestaurant } from "./join-restaurant";
import { Route, Routes } from "react-router-dom";
import Restaurants from "./restaurants";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Menu from "./menu";
import QRCodes from "./qr-codes";
import Orders from "./orders";

type UserData = {
  userId: string;
  email: string;
  role: "Admin" | "User";
};

const Admin = () => {
  const [user, setUser] = useState<UserData>();

  useEffect(() => {
    const token = localStorage.getItem("token");

    setUser(jwtDecode(token!));
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      <AdminNavbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="items-center justify-center flex-1 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <JoinRestaurant />
              <CreateRestaurant />
            </div>
          }
        />
        <Route
          path="/restaurants"
          element={<Restaurants id={user?.userId!} />}
        />
        <Route path="/menu" element={<Menu id={user?.userId!} />} />
        <Route path="/qrcodes" element={<QRCodes id={user?.userId!} />} />
        <Route path="/orders" element={<Orders id={user?.userId!} />} />
      </Routes>
    </div>
  );
};

export default Admin;
