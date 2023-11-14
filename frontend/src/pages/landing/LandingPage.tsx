import { Button } from "@/components/ui/button";
import banner from "@/assets/banner.jpg";
import classroom from "@/assets/classroom.svg";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <main className="container grid grid-cols-1 gap-5 py-20 lg:grid-cols-2">
      <section className="flex flex-col gap-10">
        <h1 className="flex items-center gap-2 text-3xl font-semibold text-gray-500">
          <img src={classroom} alt="logo" />
          <span>Classroom</span>
        </h1>
        <h2 className="text-6xl font-bold">
          Where teaching and learning come together
        </h2>
        <p className="text-xl ">
          Google Classroom helps educators create engaging learning experiences
          they can personalize, manage, and measure. Classroom is part of Google
          Workspace for Education, which empowers your institution with simple,
          safer, collaborative tools.
        </p>
        <Button
          variant="outline"
          className="h-12 text-base font-semibold text-blue-500 hover:border-blue-500 hover:bg-blue-100/20 hover:text-blue-600"
        >
          <Link to="/login">Sign in to Classroom</Link>
        </Button>
      </section>
      <div className="overflow-hidden">
        <img src={banner} alt="banner" className="w-full" />
      </div>
    </main>
  );
};

export default LandingPage;
