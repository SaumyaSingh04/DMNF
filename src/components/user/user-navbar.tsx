import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { ListOrdered, QrCode, ScanLine, ShoppingCart } from "lucide-react";

const UserNavbar = () => {
  return (
    <div className="p-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            <Link to="/home" className="flex items-center justify-center gap-2">
              <ScanLine className="h-4 w-4" />
              <span className="hidden md:block">Scanner</span>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            <Link
              to="/home/menu"
              className="flex items-center justify-center gap-2"
            >
              <QrCode className="h-4 w-4" />
              <span className="hidden md:block">Menu</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            <Link
              to="/home/cart"
              className="flex items-center justify-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden md:block">Cart</span>
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

export default UserNavbar;
