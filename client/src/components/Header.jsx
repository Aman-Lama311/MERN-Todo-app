import React, { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { RiMenuFill } from "react-icons/ri";
import { RiArrowLeftSLine } from "react-icons/ri";

const Header = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:8000/users/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/signIn");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Fullstack Todo App 🚀
          </h1>
        </Link>
        <nav className="flex gap-6 justify-center items-center">
          <div className="hidden sm:block space-x-6">
            <NavLink to="/signIn">Sign In</NavLink>
            <NavLink to="/signUp">Sign Up</NavLink>
            <Button className="cursor-pointer" onClick={handleLogout}>
              Logout
            </Button>
          </div>

          <RiMenuFill
            onClick={() => setVisible(true)}
            size={30}
            className="block sm:hidden"
          />
        </nav>
      </div>
      {/* Sidebar menu */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-2 p-4 cursor-pointer"
          >
            <RiArrowLeftSLine size={25} />
            <p className="text-lg font-semibold">Close</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            to="/signIn"
            className="py-2 pl-8 border text-lg"
          >
            SIGN IN
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/signUp"
            className="py-2 pl-8 border text-lg"
          >
            SIGN UP
          </NavLink>
          <NavLink onClick={handleLogout} className="py-2 pl-8 border text-lg">
            LOGOUT
          </NavLink>
        </div>
      </div>
      <hr className="my-8 mb-15" />
    </div>
  );
};

export default Header;
