import React from "react";
import { useState, useEffect } from "react";
const LoginAdmin = () => {
  const [passcode, setpasscode] = useState("");

  let handleClick = async () => {
    if (!passcode) {
      alert("Please enter the passcode");
      return;
    }
    if (passcode !== import.meta.env.VITE_ADMIN_PASSCODE) {
      alert("Incorrect passcode");
      return;
    } else {
      window.location.href = `${import.meta.env.VITE_API_URL}/gmail-auth`;
    }
  };

 let handleSubmit = (e) => {
    e.preventDefault();
    if (!passcode) {
      alert("Please enter the passcode");
      return;
    }
    if (passcode !== import.meta.env.VITE_ADMIN_PASSCODE) {
      alert("Incorrect passcode");
      return;
    }
    else{
      alert("Passcode is correct, Know you can login to the admin panel");
    }
  }


  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      <div className="flex gap-4 justify-between ">
        <div className="w-full">
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-black"
          >
            Enter the admin passcode
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            value={passcode}
            onChange={(e) => setpasscode(e.target.value)}
            className="bg-white border border-gray-300 text-gray-900 rounded-lg w-full  block p-2.5 "
            required=""
          />
        </div>
        <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 h-1/2 font-medium rounded-lg text-sm px-5 py-2.5  text-center me-2 mb-2 mt-7">
          Submit
        </button>
      </div>
      <button
        type="button"
        className="text-black border border-slate-400 font-medium rounded-lg text-sm px-5 py-2.5 w-full text-center me-2 mb-2"
        onClick={handleClick}
      >
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

export default LoginAdmin;
