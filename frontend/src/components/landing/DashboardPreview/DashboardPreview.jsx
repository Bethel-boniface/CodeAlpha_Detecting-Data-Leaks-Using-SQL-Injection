import { motion } from "framer-motion";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    Tooltip
} from "recharts";
import {
    FaShieldAlt,
    FaUserShield,
    FaDatabase,
    FaExclamationTriangle,
    FaCircle
} from "react-icons/fa";

const chartData = [
    { time: "1", attacks: 5 },
    { time: "2", attacks: 8 },
    { time: "3", attacks: 6 },
    { time: "4", attacks: 12 },
    { time: "5", attacks: 9 },
    { time: "6", attacks: 15 },
    { time: "7", attacks: 10 }
];

function DashboardPreview() {

    return (

        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-xl rounded-3xl border border-slate-700 bg-slate-900/80 backdrop-blur-xl shadow-2xl overflow-hidden"
        >

            {/* Header */}

            <div className="flex items-center justify-between border-b border-slate-700 p-6">

                <div>

                    <h3 className="text-white text-xl font-bold">
                        SQLShield Dashboard
                    </h3>

                    <p className="text-slate-400 text-sm">
                        Live Security Monitoring
                    </p>

                </div>

                <div className="flex items-center gap-2 text-green-400">

                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.5
                        }}
                    >
                        <FaCircle size={10} />
                    </motion.div>

                    <span className="text-sm">
                        System Online
                    </span>

                </div>

            </div>

            {/* Cards */}

            <div className="grid grid-cols-2 gap-4 p-6">

                <div className="rounded-xl bg-slate-800 p-4">

                    <FaUserShield
                        className="mb-3 text-green-400"
                        size={22}
                    />

                    <h2 className="text-3xl font-bold text-white">
                        248
                    </h2>

                    <p className="text-slate-400">
                        Protected Users
                    </p>

                </div>

                <div className="rounded-xl bg-slate-800 p-4">

                    <FaExclamationTriangle
                        className="mb-3 text-red-500"
                        size={22}
                    />

                    <h2 className="text-3xl font-bold text-white">
                        12
                    </h2>

                    <p className="text-slate-400">
                        Threats Blocked
                    </p>

                </div>

                <div className="rounded-xl bg-slate-800 p-4">

                    <FaDatabase
                        className="mb-3 text-blue-400"
                        size={22}
                    />

                    <h2 className="text-2xl font-bold text-white">
                        AES-256
                    </h2>

                    <p className="text-slate-400">
                        Encryption
                    </p>

                </div>

                <div className="rounded-xl bg-slate-800 p-4">

                    <FaShieldAlt
                        className="mb-3 text-cyan-400"
                        size={22}
                    />

                    <h2 className="text-2xl font-bold text-white">
                        99.8%
                    </h2>

                    <p className="text-slate-400">
                        Security Score
                    </p>

                </div>

            </div>

            {/* Chart */}

            <div className="px-6">

                <h4 className="mb-3 text-white font-semibold">
                    Attack Activity
                </h4>

                <div className="h-48">

                    <ResponsiveContainer width="100%" height="100%">

                        <AreaChart data={chartData}>

                            <Tooltip />

                            <Area
                                type="monotone"
                                dataKey="attacks"
                                stroke="#3B82F6"
                                fill="#2563EB55"
                            />

                        </AreaChart>

                    </ResponsiveContainer>

                </div>

            </div>

            {/* Activity Feed */}

            <div className="space-y-3 p-6">

                <h4 className="font-semibold text-white">
                    Recent Activity
                </h4>

                <div className="flex justify-between rounded-lg bg-slate-800 p-3">
                    <span className="text-slate-300">
                        SQL Injection Blocked
                    </span>
                    <span className="text-red-400 font-semibold">
                        HIGH
                    </span>
                </div>

                <div className="flex justify-between rounded-lg bg-slate-800 p-3">
                    <span className="text-slate-300">
                        User Login Successful
                    </span>
                    <span className="text-green-400 font-semibold">
                        OK
                    </span>
                </div>

                <div className="flex justify-between rounded-lg bg-slate-800 p-3">
                    <span className="text-slate-300">
                        Backup Completed
                    </span>
                    <span className="text-blue-400 font-semibold">
                        INFO
                    </span>
                </div>

            </div>

        </motion.div>

    );

}

export default DashboardPreview;