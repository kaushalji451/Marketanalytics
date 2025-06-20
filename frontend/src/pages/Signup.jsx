import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import Navbar from "../components/Navbar";
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  let handlSubmit = async (e) => {
    e.preventDefault();
    let data = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    let res = await data.json();
    if (res.token) {
      alert("Signup successful know you can login");
      await Cookies.set("token", res.token, { expires: 1 }); // 1 day
      await Cookies.set("email", res.email, { expires: 1 });

      console.log(res);
      navigate("/login");
      setformData({
        email: "",
        password: "",
      });
    } else {
      alert("Signup failed: " + res.message);
    }
  };

  return (
    <div>
      <section className="bg-gray-200">
        <Navbar />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[90vh] lg:py-0">
          <div className="w-full bg-white rounded-lg shadow border border-slate-400 md:mt-0 sm:max-w-md xl:p-0 text-black ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl text-black">
                Create a new account
              </h1>
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
                    onChange={(e) =>
                      setformData({ ...formData, email: e.target.value })
                    }
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
                    value={formData.password}
                    onChange={(e) =>
                      setformData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>
                <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 w-full text-center me-2 mb-2">
                  Sign up
                </button>

                <p className="text-sm font-light text-black">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign in
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
