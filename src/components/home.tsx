import { jwtDecode } from "jwt-decode";
import Admin from "./admin";
import User from "./user";

type UserData = {
  email: string;
  role: "Admin" | "User";
};

const Home = () => {
  if (localStorage.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <h2 className="bg-custom-dark-blue p-4 rounded-md shadow-md text-custom-blue text-lg w-[350px] sm:w-[400px] text-center font-bold underline underline-offset-2">
          Welcome to DigiMenu. Kindly signin to use the application services.
        </h2>
      </div>
    );
  }

  const user: UserData = jwtDecode(localStorage.getItem("token")!);

  return (
    <div className="flex-1 bg-custom-black text-white flex flex-col">
      {user.role === "Admin" && <Admin />}
      {user.role === "User" && <User />}
    </div>
  );
};

export default Home;
