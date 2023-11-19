/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import authApi from "@/api/authApi";
import { createContext, useState } from "react";

export const AuthContext = createContext<any>(null);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadUser = async () => {
    setLoading(true);

    try {
      const res = await authApi.loadUser();

      if (res) {
        const { id, email, dob, first_name, last_name, gender } = res;
        const user = {
          id,
          email,
          dob: dob ? new Date(dob) : new Date("1/1/2000"),
          firstName: first_name ?? "",
          lastName: last_name ?? "",
          gender: gender,
        };

        setUser(user);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);

    try {
      const res = await authApi.login({ email, password });

      if (res?.access_token) {
        localStorage.setItem("access-token", res.access_token);
        localStorage.setItem("refresh-token", res.refresh_token);
        loadUser();
      }
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    }
  };

  const data = {
    user,
    loading,
    error,
    login,
    loadUser,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
