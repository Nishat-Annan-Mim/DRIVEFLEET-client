import { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("drivefleet_user");
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  const loginWithGoogle = async () => {
    return new Promise((resolve, reject) => {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      const redirectUri = window.location.origin;
      const scope = "openid email profile";
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`;

      const popup = window.open(
        authUrl,
        "google-login",
        "width=500,height=600",
      );

      const interval = setInterval(async () => {
        try {
          if (popup.closed) {
            clearInterval(interval);
            reject(new Error("Popup closed"));
            return;
          }
          const url = popup.location.href;
          if (url.includes("access_token")) {
            clearInterval(interval);
            popup.close();
            const params = new URLSearchParams(url.split("#")[1]);
            const accessToken = params.get("access_token");
            const resp = await fetch(
              "https://www.googleapis.com/oauth2/v3/userinfo",
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              },
            );
            const info = await resp.json();
            const userData = {
              email: info.email,
              name: info.name,
              photo: info.picture,
            };
            const res = await axiosInstance.post("/api/auth/login", userData);
            const savedUser = res.data.user;
            const token = res.data.token;
            setUser(savedUser);
            localStorage.setItem("drivefleet_user", JSON.stringify(savedUser));
            if (token) localStorage.setItem("drivefleet_token", token);
            resolve(savedUser);
          }
        } catch (e) {}
      }, 500);
    });
  };

  const loginWithEmail = async (email, password) => {
    const res = await axiosInstance.post("/api/auth/login", {
      email,
      password,
    });
    const savedUser = res.data.user;
    const token = res.data.token;
    setUser(savedUser);
    localStorage.setItem("drivefleet_user", JSON.stringify(savedUser));
    if (token) localStorage.setItem("drivefleet_token", token);
    return savedUser;
  };

  const registerWithEmail = async (name, email, photo, password) => {
    await axiosInstance.post("/api/auth/register", {
      name,
      email,
      photo,
      password,
    });
  };

  const logout = async () => {
    await axiosInstance.post("/api/auth/logout");
    setUser(null);
    localStorage.removeItem("drivefleet_user");
    localStorage.removeItem("drivefleet_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
