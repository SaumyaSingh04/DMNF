import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { Users } from "lucide-react";

const SuperAdminNavbar = () => {
  return (
    <div className="p-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            <Link
              to="/home/admins"
              className="flex items-center justify-center gap-2"
            >
              <Users className="h-4 w-4" />
              <span className="hidden md:block">Manage Admins</span>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default SuperAdminNavbar;
