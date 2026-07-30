import {
    FaShieldAlt,
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaArrowUp
} from "react-icons/fa";

function Footer() {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (

        <footer className="bg-slate-950 border-t border-slate-800">

            <div className="max-w-7xl mx-auto px-6 py-20">

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand */}

                    <div>

                        <div className="flex items-center gap-3 mb-5">

                            <div className="bg-blue-600 p-3 rounded-xl">

                                <FaShieldAlt
                                    className="text-white text-xl"
                                />

                            </div>

                            <div>

                                <h2 className="text-white text-2xl font-bold">
                                    SQLShield
                                </h2>

                                <p className="text-gray-400 text-sm">
                                    Enterprise Security Platform
                                </p>

                            </div>

                        </div>

                        <p className="text-gray-400 leading-7">

                            Protecting applications from SQL Injection,
                            unauthorized access and modern cyber threats.

                        </p>

                    </div>

                    {/* Product */}

                    <div>

                        <h3 className="text-white font-semibold mb-5">

                            Product

                        </h3>

                        <ul className="space-y-3 text-gray-400">

                            <li>
                                <a href="#features" className="hover:text-blue-400">
                                    Features
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    Dashboard
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    Threat Detection
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    Monitoring
                                </a>
                            </li>

                        </ul>

                    </div>

                    {/* Resources */}

                    <div>

                        <h3 className="text-white font-semibold mb-5">

                            Resources

                        </h3>

                        <ul className="space-y-3 text-gray-400">

                            <li>
                                <a href="#">
                                    Documentation
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    API Reference
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    Security Guide
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    FAQ
                                </a>
                            </li>

                        </ul>

                    </div>

                    {/* Contact */}

                    <div>

                        <h3 className="text-white font-semibold mb-5">

                            Connect

                        </h3>

                        <div className="flex gap-4 mb-8">

                            <button className="bg-slate-800 hover:bg-blue-600 transition p-3 rounded-lg">

                                <FaGithub />

                            </button>

                            <button className="bg-slate-800 hover:bg-blue-600 transition p-3 rounded-lg">

                                <FaLinkedin />

                            </button>

                            <button className="bg-slate-800 hover:bg-blue-600 transition p-3 rounded-lg">

                                <FaTwitter />

                            </button>

                        </div>

                        <button

                            onClick={scrollToTop}

                            className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"

                        >

                            <FaArrowUp />

                            Back To Top

                        </button>

                    </div>

                </div>

                <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">

                    <p className="text-gray-500">

                        © 2026 SQLShield. All rights reserved.

                    </p>

                    <p className="text-gray-500 mt-4 md:mt-0">

                        Built with React • Node.js • PostgreSQL • AWS

                    </p>

                </div>

            </div>

        </footer>

    );

}

export default Footer;