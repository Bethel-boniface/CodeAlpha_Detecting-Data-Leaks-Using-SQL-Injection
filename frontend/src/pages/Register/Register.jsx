import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AnimatedBackground from "../../components/landing/AnimatedBackground/AnimatedBackground";
import AuthCard from "../../components/auth/AuthCard";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";

import authService from "../../services/auth.service";

function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            await authService.register({
                username,
                email,
                password,
            });

            navigate("/login");
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">
            <AnimatedBackground />

            <div className="relative z-10 w-full max-w-md">
                <AuthCard
                    title="Create Account"
                    subtitle="Join SQLShield"
                >
                    <form onSubmit={handleSubmit}>

                        <AuthInput
                            label="Username"
                            type="text"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <AuthInput
                            label="Email Address"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <PasswordInput
                            label="Password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && (
                            <div className="mb-5 rounded-lg border border-red-500 bg-red-500/20 p-3 text-sm text-red-300">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>

                    </form>

                    <p className="mt-6 text-center text-slate-400">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-semibold text-blue-400 hover:text-blue-300"
                        >
                            Login
                        </Link>
                    </p>

                </AuthCard>
            </div>
        </section>
    );
}

export default Register;