import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const RightSideHeader = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Button variant="ghost">
        <Link to="/login">Sign in</Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <h2>Hello, {`${user.first_name} ${user.last_name}`}</h2>
      <Button variant="ghost">
        <Link to="/login">Sign out</Link>
      </Button>
    </div>
  );
};
export default RightSideHeader;
