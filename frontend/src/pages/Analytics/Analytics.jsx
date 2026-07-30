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
    Bar
} from "recharts";

import { getAnalytics } from "../../api/admin.api";

const COLORS = [
    "#3B82F6",
    "#EF4444",
    "#F59E0B",
    "#10B981",
    "#8B5CF6",
    "#EC4899"
];

function Analytics() {

    const [analytics, setAnalytics] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        const fetchAnalytics = async () => {

            try {

                const response = await getAnalytics();

                setAnalytics(response.data.analytics);

            } catch (err) {

                console.error(err);

                setError(
                    err.response?.data?.message ||
                    "Unable to load analytics."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchAnalytics();

    }, []);

    if (loading) {

        return (

            <div className="flex h-screen items-center justify-center bg-slate-950 text-white">

                Loading analytics...

            </div>

        );

    }

    if (error) {

        return (

            <div className="flex h-screen items-center justify-center bg-slate-950 text-red-400">

                {error}

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-slate-950 p-8 text-white">

            <div className="mb-10">

                <h1 className="text-4xl font-bold">

                    Security Analytics

                </h1>

                <p className="mt-2 text-slate-400">

                    Real-time visualization of SQLShield security intelligence.

                </p>

            </div>

            <div className="grid gap-8 xl:grid-cols-2">

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                    <h2 className="mb-6 text-2xl font-bold">

                        Attack Trend

                    </h2>

                    <div className="h-80">

                        <ResponsiveContainer>

                            <LineChart
                                data={analytics.attackTrend}
                            >

                                <CartesianGrid stroke="#334155" />

                                <XAxis dataKey="date" />

                                <YAxis />

                                <Tooltip />

                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#3B82F6"
                                    strokeWidth={3}
                                />

                            </LineChart>

                        </ResponsiveContainer>

                    </div>

                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                    <h2 className="mb-6 text-2xl font-bold">

                        Severity Distribution

                    </h2>

                    <div className="h-80">

                        <ResponsiveContainer>

                            <PieChart>

                                <Pie
                                    data={analytics.severity}
                                    dataKey="count"
                                    nameKey="severity"
                                    outerRadius={110}
                                    label
                                >

                                    {

                                        analytics.severity.map(
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
                                        )

                                    }

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                    <h2 className="mb-6 text-2xl font-bold">

                        Attack Categories

                    </h2>

                    <div className="h-80">

                        <ResponsiveContainer>

                            <BarChart
                                data={analytics.categories}
                            >

                                <CartesianGrid stroke="#334155" />

                                <XAxis dataKey="category" />

                                <YAxis />

                                <Tooltip />

                                <Bar
                                    dataKey="count"
                                    fill="#EF4444"
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                    <h2 className="mb-6 text-2xl font-bold">

                        Top Attacking IP Addresses

                    </h2>

                    <div className="space-y-4">

                        {

                            analytics.topIps.map((ip) => (

                                <div
                                    key={ip.ip_address}
                                    className="flex items-center justify-between rounded-xl bg-slate-800 p-4"
                                >

                                    <span className="font-mono">

                                        {ip.ip_address}

                                    </span>

                                    <span className="rounded-full bg-red-500 px-3 py-1 text-sm">

                                        {ip.count} attacks

                                    </span>

                                </div>

                            ))

                        }

                    </div>

                </div>

            </div>

            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

                <h2 className="mb-6 text-2xl font-bold">

                    Risk Distribution

                </h2>

                <div className="grid gap-4 md:grid-cols-3">

                    {

                        analytics.riskDistribution.map((risk) => (

                            <div
                                key={risk.risk_level}
                                className="rounded-xl bg-slate-800 p-5 text-center"
                            >

                                <h3 className="text-xl font-bold">

                                    {risk.risk_level}

                                </h3>

                                <p className="mt-2 text-4xl font-bold text-blue-400">

                                    {risk.count}

                                </p>

                            </div>

                        ))

                    }

                </div>

            </div>

        </div>

    );

}

export default Analytics;