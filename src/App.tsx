import { Route, Routes } from "react-router-dom";
import AuthPage from "./components/auth-pages";
import { Toaster } from "./components/ui/toaster";
import Navbar from "./components/navbar";
import Home from "./components/home";
import LandingPage from "./components/landing-page";

const App = () => {
  return (
    <div className="min-h-dvh flex flex-col">
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/home/*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
