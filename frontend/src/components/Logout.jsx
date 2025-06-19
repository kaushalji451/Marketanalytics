import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/Context"; // Adjust this import path

const useLogout = () => {
  const navigate = useNavigate();
  const { setAuthData } = useContext(AuthContext);

  const logout = () => {
    // Remove the JWT token and other related cookies
    Cookies.remove("token");
    Cookies.remove("email");

    // Reset context
    setAuthData({
      email: null,
      token: null,
      isLoggedIn: false,
      error: null,
      loading: false,
    });

    // Redirect user to login or homepage
    navigate("/");
  };

  return logout;
};

export default useLogout;
