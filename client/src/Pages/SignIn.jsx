import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    setData({ email: "", password: "" });
  };

  const handleClick = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/users/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-md mx-auto shadow-2xl px-6 py-8 rounded-md"
      >
        <h1 className="text-2xl font-semibold">Sign In</h1>
        <Input
          type="email"
          placeholder="Enter your email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <Input
          type="password"
          placeholder="Enter your password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <Button className="cursor-pointer" type="Submit" onClick={handleClick}>
          Sign In
        </Button>
        <p>
          Don't have an account?{" "}
          <Link to="/signUp" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
