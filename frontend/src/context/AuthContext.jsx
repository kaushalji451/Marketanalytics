import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './Context';

const AuthContextProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    email: null,
    token: null,
    isLoggedIn: false,
    error: null,
    loading: true,
  });

  useEffect(() => {
    const token = Cookies.get('token');
      const email = Cookies.get("email");
    if (token && email) {
      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          handleLogout("Token expired");
        } else {
          setAuthData({
            email,
            token,
            isLoggedIn: true,
            error: null,
            loading: false,
          });
        }
      } catch (err) {
        handleLogout("Invalid token");
      }
    } else {
      handleLogout("No token found");
    }
  }, []);

  const handleLogout = (errorMessage) => {
    Cookies.remove('token'); // Optional: clear token
    setAuthData({
      email: null,
      token: null,
      isLoggedIn: false,
      error: errorMessage,
      loading: false,
    });
  };

  console.log("AuthContextProvider initialized with authData:", authData);

  return (
    <AuthContext.Provider value={{ ...authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
