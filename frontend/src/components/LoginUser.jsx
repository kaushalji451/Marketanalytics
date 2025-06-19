import React from "react";
import { useState, useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../context/Context";
const LoginUser = () => {
   const { setAuthData } = useContext(AuthContext); // <-- get context updater
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const handlSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    
    if (data.token) {
      alert("Login successful");

      Cookies.set("token", data.token, { expires: 1 });
      Cookies.set("email", data.email, { expires: 1 });

      // 🔥 manually update AuthContext
      setAuthData({
        email: data.email,
        token: data.token,
        isLoggedIn: true,
        error: null,
        loading: false,
      });

      setformData({ email: "", password: "" });
      navigate("/dashboard");
    } else {
      alert("Login failed: " + data.message);
    }
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handlSubmit}>
      <div>
        <label
          for="email"
          className="block mb-2 text-sm font-medium text-black"
        >
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="bg-white border border-gray-300 text-gray-900 rounded-lg  block w-full p-2.5  "
          placeholder="name@company.com"
          required
          value={formData.email}
          onChange={(e) => setformData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <label
          for="password"
          className="block mb-2 text-sm font-medium text-black"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="bg-white border border-gray-300 text-gray-900 rounded-lg  block w-full p-2.5 "
          required
          value={formData.password}
          onChange={(e) =>
            setformData({ ...formData, password: e.target.value })
          }
        />
      </div>
      <div className="flex items-center justify-between">
        <a
          href="#"
          className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Forgot password?
        </a>
      </div>
      <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 w-full text-center me-2 mb-2">
        Sign in
      </button>

      <p className="text-sm font-light text-black">
        Don’t have an account yet?{" "}
        <a
          href="/signup"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Sign up
        </a>
      </p>
    </form>
  );
};

export default LoginUser;
