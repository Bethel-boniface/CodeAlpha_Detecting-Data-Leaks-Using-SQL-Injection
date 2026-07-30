import { motion } from "framer-motion";
import {
    FaShieldAlt,
    FaLock,
    FaUserShield,
    FaChartLine,
    FaDatabase,
    FaCloud
} from "react-icons/fa";

const features = [
    {
        icon: <FaShieldAlt size={40} />,
        title: "SQL Injection Protection",
        description:
            "Detects and blocks SQL Injection attacks before they reach your database."
    },
    {
        icon: <FaLock size={40} />,
        title: "AES-256 Encryption",
        description:
            "Protect sensitive information using enterprise-grade encryption."
    },
    {
        icon: <FaUserShield size={40} />,
        title: "Role-Based Access",
        description:
            "Manage users securely with roles and permission-based authorization."
    },
    {
        icon: <FaChartLine size={40} />,
        title: "Real-Time Analytics",
        description:
            "Monitor attacks and application activity with live dashboards."
    },
    {
        icon: <FaDatabase size={40} />,
        title: "PostgreSQL Ready",
        description:
            "Designed to integrate seamlessly with PostgreSQL databases."
    },
    {
        icon: <FaCloud size={40} />,
        title: "Cloud Monitoring",
        description:
            "Monitor application health using Amazon CloudWatch integration."
    }
];

function Features() {
    return (
        <section
            id="features"
            className="bg-slate-900 py-24 px-6"
        >
            <div className="max-w-7xl mx-auto">

                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl font-bold text-center text-white mb-6"
                >
                    Powerful Security Features
                </motion.h2>

                <p className="text-center text-gray-400 mb-16">
                    Everything you need to protect your web applications.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {features.map((feature, index) => (

                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: index * 0.1,
                                duration: 0.5
                            }}
                            whileHover={{
                                y: -10,
                                scale: 1.03
                            }}
                            className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-blue-500 transition-all shadow-xl"
                        >
                            <div className="text-blue-500 mb-6">
                                {feature.icon}
                            </div>

                            <h3 className="text-2xl font-semibold text-white mb-4">
                                {feature.title}
                            </h3>

                            <p className="text-gray-400 leading-7">
                                {feature.description}
                            </p>

                        </motion.div>

                    ))}

                </div>

            </div>
        </section>
    );
}

export default Features;