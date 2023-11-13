import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  redirectPath?: string;
  children: React.ReactNode;
};

const PrivateRoute = ({ redirectPath = "/landing", children }: Props) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to={redirectPath} />;
  }

  return children;
};
export default PrivateRoute;
