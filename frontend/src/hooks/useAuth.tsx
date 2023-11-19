import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);

  useEffect(() => {
    context.loadUser();
  }, [context]);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
