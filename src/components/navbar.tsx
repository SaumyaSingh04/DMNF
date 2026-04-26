import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowLeftToLine, Fingerprint } from "lucide-react";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isAuth = pathname === "/auth";

  const handleClick = () => {
    navigate("/auth");
  };

  const handleSignout = () => {
    localStorage.removeItem("token");

    if (
      localStorage.getItem("restaurantId") &&
      localStorage.getItem("restaurantId") !== null
    ) {
      localStorage.removeItem("token");
    }

    navigate("/");
  };

  const isSignedIn =
    localStorage.getItem("token") && localStorage.getItem("token") !== null;

  return (
    <div
      className={`${
        isAuth && "hidden"
      } bg-custom-dark-blue h-12 py-10 px-6 md:px-10 flex items-center justify-between`}
    >
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => navigate(`${isSignedIn ? "/home" : "/"}`)}
      >
        <img src="/logo.svg" alt="Logo" width={32} height={32} />
        <span className="text-custom-black font-bold text-xl">DigiMenu</span>
      </div>
      {!isSignedIn ? (
        <Button variant="custom" onClick={handleClick}>
          Signin
          <Fingerprint className="text-custom-blue h-5 w-5 ml-2" />
        </Button>
      ) : (
        <Button variant="custom" onClick={handleSignout}>
          Signout
          <ArrowLeftToLine className="text-custom-blue h-5 w-5 ml-2" />
        </Button>
      )}
    </div>
  );
};

export default Navbar;
