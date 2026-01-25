import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar/Navbar";
import { FC } from "react";
import Footer from "../components/shared/Footer/Footer";
import { Toaster } from "react-hot-toast";

const Root:FC = ():JSX.Element => {
  return (
    <div className="font-openSans max-w-[1440px] mx-auto overflow-hidden">
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <Outlet />
      <Footer/>
    </div>
  );
};

export default Root;
