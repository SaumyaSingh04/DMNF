import QRScanner from "./qr-scanner";
import { Routes, Route } from "react-router-dom";
import UserNavbar from "./user-navbar";
import MenuList from "./menu-list";
import Cart from "./cart";
import Orders from "./orders";

const User = () => {
  return (
    <div className="flex-1 flex flex-col">
      <UserNavbar />
      <Routes>
        <Route path="/" element={<QRScanner />} />
        <Route path="/menu" element={<MenuList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
};

export default User;
