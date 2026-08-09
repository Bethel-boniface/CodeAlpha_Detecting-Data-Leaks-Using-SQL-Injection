import { useEffect, useState } from "react";
import { FiActivity } from "react-icons/fi";
import { MdOutlineSecurity } from "react-icons/md";

import StatCard from "../../components/dashboard/StatCard";
import AttackChart from "../../components/dashboard/AttackChart";
import RecentAttacks from "../../components/dashboard/RecentAttacks";
import SystemStatus from "../../components/dashboard/SystemStatus";

import { getDashboardStats } from "../../api/admin.api";

function Dashboard() {

    const [stats, setStats] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const loadDashboard = async () => {

        try {

            const response = await getDashboardStats();

            setStats(response.data.stats);

            setError("");

        } catch (err) {

            console.error(err);

            setError(

                err.response?.data?.message ||

                "Unable to load dashboard."

            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadDashboard();

        const interval = setInterval(

            loadDashboard,

            180000

        );

        return () => clearInterval(interval);

    }, []);

    if (loading) {

        return (

            <div className="flex h-[70vh] items-center justify-center">

                <div className="text-center">

                    <div className="mx-auto mb-6 h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

                    <p className="text-lg text-slate-300">

                        Loading Security Dashboard...

                    </p>

                </div>

            </div>

        );

    }

    if (error) {

        return (

            <div className="flex h-[70vh] items-center justify-center">

                <div className="rounded-2xl border border-red-500 bg-red-500/10 p-8 text-center">

                    <h2 className="mb-3 text-2xl font-bold text-red-400">

                        Dashboard Error

                    </h2>

                    <p className="text-slate-300">

                        {error}

                    </p>

                </div>

            </div>

        );

    }

    return (

        <div className="space-y-8">

            {/* Header */}

            <section className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 p-8 shadow-2xl">

                <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

                    <div>

                        <h1 className="mb-3 text-5xl font-bold text-white">

                            Security Operations Center

                        </h1>

                        <p className="max-w-3xl text-lg text-slate-400">

                            Monitor SQL injection attempts, system activity,
                            user security, and real-time threat intelligence
                            from one centralized dashboard.

                        </p>

                    </div>

                    <div className="flex gap-5">

                        <div className="rounded-2xl border border-blue-500 bg-blue-500/10 p-5">

                            <FiActivity className="mb-3 text-3xl text-blue-400" />

                            <p className="text-sm text-slate-400">

                                Threat Monitor

                            </p>

                            <h3 className="mt-2 text-xl font-bold text-white">

                                Active

                            </h3>

                        </div>

                        <div className="rounded-2xl border border-green-500 bg-green-500/10 p-5">

                            <MdOutlineSecurity className="mb-3 text-3xl text-green-400" />

                            <p className="text-sm text-slate-400">

                                Protection

                            </p>

                            <h3 className="mt-2 text-xl font-bold text-white">

                                Enabled

                            </h3>

                        </div>

                    </div>

                </div>

            </section>

            {/* Statistics */}

            <section>

                <div className="mb-6 flex items-center justify-between">

                    <h2 className="text-2xl font-bold text-white">

                        Security Overview

                    </h2>

                    <span className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-400">

                        Live Monitoring

                    </span>

                </div>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                    <StatCard
                        title="Total Users"
                        value={stats.totalUsers}
                        color="text-blue-400"
                    />

                    <StatCard
                        title="Total Attacks"
                        value={stats.totalAttacks}
                        color="text-red-400"
                    />

                    <StatCard
                        title="Blocked Attacks"
                        value={stats.blockedAttacks}
                        color="text-green-400"
                    />

                    <StatCard
                        title="Critical Attacks"
                        value={stats.criticalAttacks}
                        color="text-red-600"
                    />

                    <StatCard
                        title="High Risk"
                        value={stats.highRiskAttacks}
                        color="text-orange-400"
                    />

                    <StatCard
                        title="Today's Attacks"
                        value={stats.attacksToday}
                        color="text-purple-400"
                    />

                    <StatCard
                        title="System Health"
                        value={stats.systemHealth}
                        color="text-emerald-400"
                    />

                </div>

            </section>

            {/* Charts */}

            <section className="grid gap-8 xl:grid-cols-2">

                <AttackChart />

                <SystemStatus />

            </section>

            {/* Recent Activity */}

            <section>

                <div className="mb-5">

                    <h2 className="text-2xl font-bold text-white">

                        Recent Security Events

                    </h2>

                    <p className="mt-2 text-slate-400">

                        Latest SQL injection attempts detected by SQLShield.

                    </p>

                </div>

                <RecentAttacks />

            </section>

        </div>

    );

}

export default Dashboard;