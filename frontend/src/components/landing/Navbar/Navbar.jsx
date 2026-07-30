import { motion } from "framer-motion";
import { FaShieldAlt } from "react-icons/fa";

function Navbar() {
    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-lg border-b border-white/10"
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-3">

                    <div className="bg-blue-600 p-3 rounded-xl">
                        <FaShieldAlt className="text-white text-xl" />
                    </div>

                    <div>
                        <h1 className="text-white text-2xl font-bold">
                            SQLShield
                        </h1>

                        <p className="text-gray-300 text-xs">
                            Enterprise Security
                        </p>
                    </div>

                </div>

                {/* Navigation */}
                <div className="hidden md:flex gap-8 text-gray-200">

                    <a href="#home" className="hover:text-blue-400 transition">
                        Home
                    </a>

                    <a href="#features" className="hover:text-blue-400 transition">
                        Features
                    </a>

                    <a href="#about" className="hover:text-blue-400 transition">
                        About
                    </a>

                    <a href="#contact" className="hover:text-blue-400 transition">
                        Contact
                    </a>

                </div>

                {/* Buttons */}
                <div className="hidden md:flex gap-3">

                    <button
                        className="px-5 py-2 rounded-lg border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition"
                    >
                        Login
                    </button>

                    <button
                        className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
                    >
                        Register
                    </button>

                </div>

            </div>
        </motion.nav>
    );
}

export default Navbar;