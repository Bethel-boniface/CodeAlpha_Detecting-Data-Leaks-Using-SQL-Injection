import { motion } from "framer-motion";
import { FaArrowRight, FaShieldAlt } from "react-icons/fa";

function CTA() {
    return (
        <section className="relative overflow-hidden py-24 px-6">

            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900"></div>

            {/* Decorative Blurs */}
            <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl"></div>

            <div className="relative max-w-6xl mx-auto text-center">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >

                    <div className="flex justify-center mb-8">

                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-full border border-white/20">

                            <FaShieldAlt
                                className="text-white"
                                size={50}
                            />

                        </div>

                    </div>

                    <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">

                        Secure Your Applications

                        <br />

                        Before Attackers Find Them

                    </h2>

                    <p className="text-blue-100 text-lg mt-8 max-w-3xl mx-auto leading-8">

                        SQLShield continuously monitors your application,
                        detects SQL injection attempts, protects sensitive
                        data with AES-256 encryption, and gives your team
                        real-time visibility into security events.

                    </p>

                    <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">

                        <button className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition duration-300 flex items-center justify-center gap-3">

                            Get Started

                            <FaArrowRight />

                        </button>

                        <button className="border border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-700 transition duration-300">

                            View Documentation

                        </button>

                    </div>

                </motion.div>

            </div>

        </section>
    );
}

export default CTA;