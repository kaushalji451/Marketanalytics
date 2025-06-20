import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../context/Context";
import { useContext, useEffect } from "react";
import useLogout from "./Logout";
const Navbar = () => {
  const logout = useLogout();
  const [islogin, setIsLogin] = useState(false);
  const [openDropDown, setopenDropDown] = useState(false);

  const { isLoggedIn, loading } = useContext(AuthContext);
  let handleDropDown = () => {
    if (openDropDown === false) {
      setopenDropDown(true);
    } else {
      setopenDropDown(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [isLoggedIn]);

  return (
    <div className="py-4 flex border-b border-slate-200 bg-white justify-between px-10 items-center">
      <div className="">
        <Link to="/" className="font-semibold text-xl">
          Nivesh Jano
        </Link>
      </div>
      <div>
        <div>
          <button onClick={handleDropDown}>
            <lord-icon
              src="https://cdn.lordicon.com/dygfbwwx.json"
              trigger="hover"
            ></lord-icon>
          </button>
          <div className="bg-white absolute right-3 border border-slate-400 rounded-lg">
            {openDropDown && (
              <ul>
                {" "}
                {!islogin && (
                  <div>
                    <li className="px-10 border-b border-slate-400 py-1 ">
                      <Link to="/login">Login</Link>
                    </li>
                    <li className="px-10 border-b border-slate-400 py-1">
                      <Link to="/signup">Signup</Link>
                    </li>
                  </div>
                )}
                {islogin && (
                  <li className="px-10 border-b border-slate-400 py-1">
                    <button onClick={logout}>Logout</button>
                  </li>
                )}
                <li className="px-10 border-b border-slate-400 py-1">
                  <a
                    href="https://drive.google.com/file/d/18TpbYsAK-x_Ggvc9HRJ0TNaGEmFw-a9j/view?usp=sharing"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
