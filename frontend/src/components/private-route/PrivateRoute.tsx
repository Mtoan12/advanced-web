import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

type Props = {
  redirectPath?: string;
  children: React.ReactNode;
};

const PrivateRoute = ({ redirectPath = "/landing", children }: Props) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={redirectPath} />;
  }

  return children;
};
export default PrivateRoute;
