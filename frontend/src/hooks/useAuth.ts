import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return auth;
};
