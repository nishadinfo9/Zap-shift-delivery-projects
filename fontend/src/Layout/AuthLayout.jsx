import { Outlet } from "react-router-dom";
import Logo from "../components/Logo/Logo";
import authImage from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto py-2">
      <Logo />

      <div className="flex items-center justify-center p-10 gap-5">
        <div className="flex-1 ">
          <Outlet />
        </div>
        <div className="flex-1 ">
          <img src={authImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
