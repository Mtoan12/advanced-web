import { Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/home/Homepage';
import { LoginPage } from './pages/login/LoginPage';
import { SignUpPage } from './pages/signup/SignUpPage';
import { LandingPage } from './pages/landing/LandingPage';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/landing" element={<LandingPage />} />
            </Routes>
        </div>
    );
}

export default App;
