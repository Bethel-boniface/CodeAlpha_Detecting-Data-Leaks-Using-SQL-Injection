import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AnimatedBackground from "../../components/landing/AnimatedBackground/AnimatedBackground";
import AuthCard from "../../components/auth/AuthCard";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";

import { useAuth } from "../../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setLoading(true);

        try {

            const data = await login(
                email,
                password
            );

            console.log("========== LOGIN SUCCESS ==========");

            console.log("API Response:", data);

            console.log(
                "Token from LocalStorage:",
                localStorage.getItem("token")
            );

            console.log(
                "User from LocalStorage:",
                localStorage.getItem("user")
            );

            console.log(
                "==================================="
            );

            navigate("/dashboard");

        } catch (err) {

            console.error("LOGIN FAILED");

            console.error(err);

            console.error(
                err.response?.data
            );

            console.log(
                "Token after failed login:",
                localStorage.getItem("token")
            );

            setError(
                err.response?.data?.message ||
                "Invalid email or password."
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
                    title="Welcome Back"
                    subtitle="Sign in to SQLShield"
                >

                    <form onSubmit={handleSubmit}>

                        <AuthInput
                            label="Email Address"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                        <PasswordInput
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                        <div className="mb-6 flex items-center justify-between">

                            <label className="flex items-center gap-2 text-sm text-slate-400">

                                <input type="checkbox" />

                                Remember Me

                            </label>

                            <Link
                                to="/forgot-password"
                                className="text-sm text-blue-400 hover:text-blue-300"
                            >
                                Forgot Password?
                            </Link>

                        </div>

                        {

                            error && (

                                <div className="mb-5 rounded-lg border border-red-500 bg-red-500/20 p-3 text-sm text-red-300">

                                    {error}

                                </div>

                            )

                        }

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
                        >
                            {

                                loading
                                    ? "Signing In..."
                                    : "Login"

                            }
                        </button>

                    </form>

                    <p className="mt-6 text-center text-slate-400">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="font-semibold text-blue-400 hover:text-blue-300"
                        >
                            Register
                        </Link>

                    </p>

                </AuthCard>

            </div>

        </section>

    );

}

export default Login;