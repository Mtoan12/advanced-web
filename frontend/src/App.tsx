import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./components/header/Header";
import PrivateRoute from "./components/private-route/PrivateRoute";

const HomePage = lazy(() => import("./pages/home/HomePage"));
const SignUpPage = lazy(() => import("./pages/signup/SignUpPage"));
const LoginPage = lazy(() => import("./pages/login/LoginPage"));
const LandingPage = lazy(() => import("./pages/landing/LandingPage"));

function App() {
  return (
    <div>
      <Header />
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/landing" element={<LandingPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
