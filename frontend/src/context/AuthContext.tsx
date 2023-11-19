/* eslint-disable @typescript-eslint/no-unused-vars */
import authApi from "@/api/authApi";
import { createContext, useState } from "react";

const testUsers: User[] = [
  {
    id: 1,
    email: "tranminhtoan1280@gmail.com",
    first_name: "Toan",
    last_name: "Tran",
    birthday: new Date("1999-12-12"),
    gender: "male",
    password: "123456",
  },
  {
    id: 2,
    email: "tranminhtoan1281@gmail.com",
    first_name: "Toan",
    last_name: "Tran2",
    birthday: new Date("1999-12-12"),
    gender: "male",
    password: "123456",
  },
];

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string;
  login: (email: string, password: string) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = (email: string, password: string) => {
    setLoading(true);
    const user = testUsers.find((user) => user.email === email);

    if (!user) {
      setError("User not found");
      setLoading(false);
      return;
    }

    if (user.email === email && user.password === password) {
      setUser(user);
      console.log("Login success", user);
      setLoading(false);
      return;
    }
  };

  const register = async (registerInstance: RegisterDTO) => {
    setLoading(true);
    try {
      const res = await authApi.register(registerInstance);
      if (res?.access_token) {
        localStorage.setItem("access-token", res.access_token);
        localStorage.setItem("refresh-token", res.refresh_token);
        // loadUser();
      }
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const data = {
    user,
    loading,
    error,
    login,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
