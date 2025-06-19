import React from "react";
import { useState, useEffect } from "react";
import LoginUser from "../components/LoginUser";
import LoginAdmin from "../components/LoginAdmin";
import Navbar from "../components/Navbar";
const Login = () => {
  const [userOrAdmin, setuserOrAdmin] = useState("user");

  return (
    <div>
      <section className="bg-gray-100">
        <Navbar />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[90vh] lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 text-black dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex justify-between mb-4 border-slate-400 border items-center rounded-lg ">
                <button
                  className="text-black border-e border-slate-400 font-medium text-sm px-5 py-2.5 w-full text-center me-2 flex gap-2"
                  onClick={() => setuserOrAdmin("user")}
                >
                  user
                  {userOrAdmin !== "admin" && <p>&#9989;</p>}
                </button>
                <button
                  className="text-black  font-medium text-sm px-5 py-2.5 w-full text-center flex gap-2"
                  onClick={() => setuserOrAdmin("admin")}
                >
                  {" "}
                  admin
                  {userOrAdmin === "admin" && <p>&#9989;</p>}
                </button>
              </div>

              <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl text-black">
                Sign in to your account
              </h1>
              {userOrAdmin === "user" ? <LoginUser /> : <LoginAdmin />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
