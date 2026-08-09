import { useEffect, useState } from "react";

import {
ResponsiveContainer,
LineChart,
Line,
CartesianGrid,
XAxis,
YAxis,
Tooltip,
PieChart,
Pie,
Cell,
BarChart,
Bar,
} from "recharts";

import { getAnalytics } from "../../api/admin.api";

const COLORS = [
"#3B82F6",
"#EF4444",
"#F59E0B",
"#10B981",
"#8B5CF6",
"#EC4899",
];

function Analytics() {
    const [analytics, setAnalytics] = useState({
        attackTrend: [],
        severity: [],
        attackTypes: [],
        topIps: [],
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

useEffect(() => {
    let mounted = true;

    const fetchAnalytics = async () => {
        try {
            const response = await getAnalytics();

            const data = response?.data?.analytics || {};

            if (!mounted) {
                return;
            }

            setAnalytics({
                attackTrend: Array.isArray(data.attackTrend)
                    ? data.attackTrend
                    : [],

                severity: Array.isArray(data.severity)
                    ? data.severity
                    : [],

                attackTypes: Array.isArray(data.attackTypes)
                    ? data.attackTypes
                    : [],

                topIps: Array.isArray(data.topIps)
                    ? data.topIps
                    : [],
            });
        } catch (err) {
            console.error("Failed to load analytics:", err);

            if (!mounted) {
                return;
            }

            setError(
                err?.response?.data?.message ||
                "Unable to load analytics."
            );
        } finally {
            if (mounted) {
                setLoading(false);
            }
        }
    };

    fetchAnalytics();

    return () => {
        mounted = false;
    };
}, []);

const totalAttacks = analytics.attackTrend.reduce(
    (total, item) => total + Number(item?.count || 0),
    0
);

if (loading) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
            <div className="text-lg text-slate-300">
                Loading analytics...
            </div>
        </div>
    );
}

if (error) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 p-8 text-white">
            <div className="rounded-2xl border border-red-900 bg-slate-900 p-8 text-center">
                <h1 className="text-2xl font-bold text-red-400">
                    Analytics Error
                </h1>

                <p className="mt-3 text-slate-400">
                    {error}
                </p>
            </div>
        </div>
    );
}

return (
    <div className="min-h-screen bg-slate-950 p-6 text-white md:p-8">

        {/* HEADER */}
        <div className="mb-10">

            <h1 className="text-4xl font-bold">
                Security Analytics
            </h1>

            <p className="mt-2 text-slate-400">
                Real-time visualization of SQLShield security intelligence.
            </p>

        </div>


        {/* SUMMARY CARDS */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                <p className="text-sm text-slate-400">
                    Total Attacks
                </p>

                <p className="mt-2 text-4xl font-bold text-blue-400">
                    {totalAttacks}
                </p>

            </div>


            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                <p className="text-sm text-slate-400">
                    Severity Levels
                </p>

                <p className="mt-2 text-4xl font-bold text-red-400">
                    {analytics.severity.length}
                </p>

            </div>


            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                <p className="text-sm text-slate-400">
                    Attack Types
                </p>

                <p className="mt-2 text-4xl font-bold text-yellow-400">
                    {analytics.attackTypes.length}
                </p>

            </div>

        </div>


        {/* ANALYTICS GRID */}
        <div className="grid gap-8 xl:grid-cols-2">

            {/* ATTACK TREND */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                <h2 className="mb-6 text-2xl font-bold">
                    Attack Trend
                </h2>

                <div className="h-80">

                    {analytics.attackTrend.length === 0 ? (

                        <div className="flex h-full items-center justify-center text-slate-500">
                            No attack trend data available.
                        </div>

                    ) : (

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <LineChart
                                data={analytics.attackTrend}
                            >

                                <CartesianGrid
                                    stroke="#334155"
                                />

                                <XAxis
                                    dataKey="date"
                                    stroke="#94A3B8"
                                />

                                <YAxis
                                    stroke="#94A3B8"
                                />

                                <Tooltip />

                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#3B82F6"
                                    strokeWidth={3}
                                    dot={false}
                                />

                            </LineChart>

                        </ResponsiveContainer>

                    )}

                </div>

            </div>


            {/* SEVERITY DISTRIBUTION */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                <h2 className="mb-6 text-2xl font-bold">
                    Severity Distribution
                </h2>

                <div className="h-80">

                    {analytics.severity.length === 0 ? (

                        <div className="flex h-full items-center justify-center text-slate-500">
                            No severity data available.
                        </div>

                    ) : (

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <PieChart>

                                <Pie
                                    data={analytics.severity}
                                    dataKey="count"
                                    nameKey="severity"
                                    outerRadius={110}
                                    label
                                >

                                    {analytics.severity.map(
                                        (entry, index) => (
                                            <Cell
                                                key={index}
                                                fill={
                                                    COLORS[
                                                        index %
                                                        COLORS.length
                                                    ]
                                                }
                                            />
                                        )
                                    )}

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    )}

                </div>

            </div>


            {/* ATTACK TYPES */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                <h2 className="mb-6 text-2xl font-bold">
                    Attack Types
                </h2>

                <div className="h-80">

                    {analytics.attackTypes.length === 0 ? (

                        <div className="flex h-full items-center justify-center text-slate-500">
                            No attack type data available.
                        </div>

                    ) : (

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <BarChart
                                data={analytics.attackTypes}
                            >

                                <CartesianGrid
                                    stroke="#334155"
                                />

                                <XAxis
                                    dataKey="attack_type"
                                    stroke="#94A3B8"
                                />

                                <YAxis
                                    stroke="#94A3B8"
                                />

                                <Tooltip />

                                <Bar
                                    dataKey="count"
                                    fill="#EF4444"
                                    radius={[6, 6, 0, 0]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    )}

                </div>

            </div>


            {/* TOP IP ADDRESSES */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                <h2 className="mb-6 text-2xl font-bold">
                    Top Attacking IP Addresses
                </h2>

                {analytics.topIps.length === 0 ? (

                    <div className="flex h-80 items-center justify-center text-slate-500">
                        No attacking IP data available.
                    </div>

                ) : (

                    <div className="space-y-4">

                        {analytics.topIps.map(
                            (ip, index) => (

                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-xl bg-slate-800 p-4"
                                >

                                    <span className="font-mono text-slate-200">
                                        {ip?.ip_address || "Unknown"}
                                    </span>

                                    <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold">
                                        {Number(ip?.count || 0)} attacks
                                    </span>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

        </div>


        {/* RISK / SECURITY SUMMARY */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="mb-6 text-2xl font-bold">
                Security Intelligence Summary
            </h2>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-xl bg-slate-800 p-5">

                    <p className="text-sm text-slate-400">
                        Recorded Attack Days
                    </p>

                    <p className="mt-2 text-3xl font-bold text-blue-400">
                        {analytics.attackTrend.length}
                    </p>

                </div>


                <div className="rounded-xl bg-slate-800 p-5">

                    <p className="text-sm text-slate-400">
                        Severity Categories
                    </p>

                    <p className="mt-2 text-3xl font-bold text-red-400">
                        {analytics.severity.length}
                    </p>

                </div>


                <div className="rounded-xl bg-slate-800 p-5">

                    <p className="text-sm text-slate-400">
                        Attack Categories
                    </p>

                    <p className="mt-2 text-3xl font-bold text-yellow-400">
                        {analytics.attackTypes.length}
                    </p>

                </div>


                <div className="rounded-xl bg-slate-800 p-5">

                    <p className="text-sm text-slate-400">
                        Unique Attacking IPs
                    </p>

                    <p className="mt-2 text-3xl font-bold text-purple-400">
                        {analytics.topIps.length}
                    </p>

                </div>

            </div>

        </div>

    </div>
);
}

export default Analytics;
