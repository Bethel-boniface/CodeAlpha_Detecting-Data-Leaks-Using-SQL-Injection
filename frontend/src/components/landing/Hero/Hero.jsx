import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

import AnimatedBackground from "../AnimatedBackground/AnimatedBackground";
import DashboardPreview from "../DashboardPreview/DashboardPreview";

function Hero() {
    return (
        <section
            id="home"
            className="relative min-h-screen overflow-hidden bg-slate-950 text-white pt-28"
        >
            {/* Animated Background */}
            <AnimatedBackground />

            <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6">

                <div className="grid w-full items-center gap-16 lg:grid-cols-2">

                    {/* Left Content */}

                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >

                        {/* Badge */}

                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-8 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2"
                        >

                            <span className="text-sm font-semibold tracking-wide text-blue-300">
                                Enterprise Cybersecurity Platform
                            </span>

                        </motion.div>

                        {/* Heading */}

                        <h1 className="text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl">

                            Secure Your

                            <span className="text-blue-500">
                                {" "}Applications
                            </span>

                            <br />

                            <span className="text-cyan-400">

                                <TypeAnimation
                                    sequence={[
                                        "Against SQL Injection",
                                        2000,
                                        "Against Data Breaches",
                                        2000,
                                        "Against Insider Threats",
                                        2000,
                                        "With Real-Time Monitoring",
                                        2000,
                                        "Using Enterprise Security",
                                        2000
                                    ]}
                                    wrapper="span"
                                    speed={50}
                                    repeat={Infinity}
                                />

                            </span>

                        </h1>

                        {/* Description */}

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 max-w-2xl text-lg leading-8 text-slate-300"
                        >

                            SQLShield is an enterprise-grade cybersecurity
                            platform that protects modern web applications from
                            SQL injection attacks, secures sensitive data with
                            AES-256 encryption, monitors suspicious activity in
                            real time, and provides actionable security
                            insights through a modern dashboard.

                        </motion.p>

                        {/* Buttons */}

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="mt-10 flex flex-wrap gap-5"
                        >

                            <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold shadow-xl transition-all duration-300 hover:scale-105 hover:bg-blue-700">

                                Get Started

                            </button>

                            <button className="rounded-xl border border-slate-600 bg-slate-900/40 px-8 py-4 font-semibold transition-all duration-300 hover:border-blue-500 hover:bg-slate-800">

                                View Documentation

                            </button>

                        </motion.div>

                        {/* Stats */}

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="mt-16 grid grid-cols-3 gap-8"
                        >

                            <div>

                                <h2 className="text-4xl font-bold text-blue-400">
                                    99.9%
                                </h2>

                                <p className="mt-2 text-slate-400">
                                    Detection Accuracy
                                </p>

                            </div>

                            <div>

                                <h2 className="text-4xl font-bold text-blue-400">
                                    24/7
                                </h2>

                                <p className="mt-2 text-slate-400">
                                    Live Monitoring
                                </p>

                            </div>

                            <div>

                                <h2 className="text-4xl font-bold text-blue-400">
                                    AES-256
                                </h2>

                                <p className="mt-2 text-slate-400">
                                    Encryption
                                </p>

                            </div>

                        </motion.div>

                    </motion.div>

                    {/* Right Side */}

                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9 }}
                        className="flex justify-center"
                    >

                        <DashboardPreview />

                    </motion.div>

                </div>

            </div>

        </section>
    );
}

export default Hero;