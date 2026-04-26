import { Home } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const isSignedIn =
    localStorage.getItem("token") && localStorage.getItem("token") !== null;

  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-4">
      <h2 className="bg-custom-dark-blue p-4 rounded-md shadow-md text-custom-blue text-lg w-[350px] sm:w-[400px] text-center font-bold underline underline-offset-2">
        Welcome to DigiMenu, your one stop solution to digital menus
      </h2>
      <img
        src="landing-page.svg"
        alt="Digital Menu"
        width={400}
        className="bg-white p-10 w-[350px] sm:w-[400px] border shadow-md rounded-lg"
      />
      {isSignedIn && (
        <Button
          className="flex items-center justify-center w-[350px] sm:w-[400px]"
          onClick={() => navigate("/home")}
        >
          Go to home
          <Home className="ml-2" />
        </Button>
      )}
    </div>
  );
};

export default LandingPage;
