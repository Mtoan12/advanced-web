import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className=" container sticky top-0 flex items-center justify-between py-5">
      <h1 className="text-3xl font-bold">
        <Link to="/">Classroom</Link>
      </h1>
      <Button variant="ghost">
        <Link to="/login">Sign in</Link>
      </Button>
    </header>
  );
};
export default Header;
