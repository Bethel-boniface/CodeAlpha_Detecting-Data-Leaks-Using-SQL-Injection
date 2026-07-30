import { Routes, Route, Navigate } from "react-router-dom";

// Landing Components
import Navbar from "./components/landing/Navbar/Navbar";
import Hero from "./components/landing/Hero/Hero";
import Features from "./components/landing/Features/Features";
import Stats from "./components/landing/Stats/Stats";
import CTA from "./components/landing/CTA/CTA";
import Footer from "./components/landing/Footer/Footer";

// Pages
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Analytics from "./pages/Analytics/Analytics";
import Playground from "./pages/Playground/Playground";
import ThreatMonitor from "./pages/ThreatMonitor/ThreatMonitor";
import Attacks from "./pages/Attacks/Attacks";
import Users from "./pages/Users/Users";
import Logs from "./pages/Logs/Logs";
import Settings from "./pages/Settings/Settings";

// Layout
import DashboardLayout from "./layouts/DashboardLayout";

// Authentication
import { useAuth } from "./context/AuthContext";

function LandingPage() {

    return (
        <>
            <Navbar />
            <Hero />
            <Features />
            <Stats />
            <CTA />
            <Footer />
        </>
    );

}

function ProtectedRoute({ children }) {

    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {

        return <Navigate to="/login" replace />;

    }

    return children;

}

function PublicRoute({ children }) {

    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {

        return <Navigate to="/dashboard" replace />;

    }

    return children;

}

function NotFound() {

    return (

        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-white">

            <h1 className="mb-4 text-8xl font-bold text-blue-500">

                404

            </h1>

            <p className="mb-8 text-xl text-slate-400">

                The page you're looking for doesn't exist.

            </p>

            <a
                href="/"
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
            >

                Return Home

            </a>

        </div>

    );

}

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<LandingPage />}
            />

            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />

            <Route
                path="/register"
                element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                }
            />

            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/analytics"
                    element={<Analytics />}
                />

                <Route
                    path="/playground"
                    element={<Playground />}
                />

                <Route
                    path="/threat-monitor"
                    element={<ThreatMonitor />}
                />

                <Route
                    path="/attacks"
                    element={<Attacks />}
                />

                <Route
                    path="/users"
                    element={<Users />}
                />

                <Route
                    path="/logs"
                    element={<Logs />}
                />

                <Route
                    path="/settings"
                    element={<Settings />}
                />

            </Route>

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>

    );

}

export default App;