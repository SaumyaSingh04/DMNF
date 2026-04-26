import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { Home, ListOrdered, QrCode, SquareMenu, Utensils } from "lucide-react";

const AdminNavbar = () => {
  return (
    <div className="p-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            <Link to="/home" className="flex items-center justify-center gap-2">
              <Home className="h-4 w-4" />
              <span className="hidden md:block">Home</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            <Link
              to="/home/menu"
              className="flex items-center justify-center gap-2"
            >
              <SquareMenu className="h-4 w-4" />
              <span className="hidden md:block">Menu</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            <Link
              to="/home/restaurants"
              className="flex items-center justify-center gap-2"
            >
              <Utensils className="h-4 w-4" />
              <span className="hidden md:block">Restaurants</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            <Link
              to="/home/qrcodes"
              className="flex items-center justify-center gap-2"
            >
              <QrCode className="h-4 w-4" />
              <span className="hidden md:block">QR Codes</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            <Link
              to="/home/orders"
              className="flex items-center justify-center gap-2"
            >
              <ListOrdered className="h-4 w-4" />
              <span className="hidden md:block">Orders</span>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default AdminNavbar;
