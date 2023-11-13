import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 w-full border-b-[1px] bg-white py-5 shadow-sm">
      <div className="container flex items-center justify-between ">
        <h2 className="text-3xl font-bold">
          <Link to="/">Classroom</Link>
        </h2>
        <Button variant="ghost">
          <Link to="/login">Sign in</Link>
        </Button>
      </div>
    </header>
  );
};
export default Header;
