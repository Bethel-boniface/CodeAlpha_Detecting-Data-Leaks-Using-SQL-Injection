import { useEffect, useState } from "react";

import { getSecurityEvents } from "../../api/admin.api";

function RecentAttacks() {

    const [attacks, setAttacks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        let mounted = true;

        const fetchAttacks = async () => {

            try {

                const response = await getSecurityEvents();

                if (!mounted) {

                    return;

                }

                setAttacks(response.data.events);

                setError("");

                setLoading(false);

            } catch (err) {

                console.error(err);

                if (!mounted) {

                    return;

                }

                setError(

                    err.response?.data?.message ||

                    "Unable to load security events."

                );

                setLoading(false);

            }

        };

        fetchAttacks();

        const interval = setInterval(

            fetchAttacks,

            5000

        );

        return () => {

            mounted = false;

            clearInterval(interval);

        };

    }, []);

    if (loading) {

        return (

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                <p className="text-slate-400">

                    Loading recent attacks...

                </p>

            </div>

        );

    }

    if (error) {

        return (

            <div className="rounded-2xl border border-red-500 bg-slate-900 p-6">

                <p className="text-red-400">

                    {error}

                </p>

            </div>

        );

    }

    return (

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="mb-6 flex items-center justify-between">

                <h2 className="text-2xl font-bold text-white">

                    Recent Threat Activity

                </h2>

                <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-400">

                    {attacks.length} Events

                </span>

            </div>

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead>

                        <tr className="border-b border-slate-700 text-left text-slate-400">

                            <th className="pb-3">IP Address</th>

                            <th className="pb-3">Endpoint</th>

                            <th className="pb-3">Category</th>

                            <th className="pb-3">Attack</th>

                            <th className="pb-3">Severity</th>

                            <th className="pb-3">Risk</th>

                            <th className="pb-3">Status</th>

                            <th className="pb-3">Time</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            attacks.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="py-8 text-center text-slate-500"
                                    >

                                        No security events recorded.

                                    </td>

                                </tr>

                            ) : (

                                attacks.map((attack) => (

                                    <tr

                                        key={attack.id}

                                        className="border-b border-slate-800 hover:bg-slate-800/40"

                                    >

                                        <td className="py-4 text-slate-300">

                                            {attack.ip_address}

                                        </td>

                                        <td className="py-4 text-slate-300">

                                            {attack.endpoint}

                                        </td>

                                        <td className="py-4">

                                            <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400">

                                                {attack.category}

                                            </span>

                                        </td>

                                        <td className="py-4 font-medium text-red-400">

                                            {attack.attack_type}

                                        </td>

                                        <td className="py-4">

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                    attack.severity === "CRITICAL"
                                                        ? "bg-red-500/20 text-red-500"
                                                        : attack.severity === "HIGH"
                                                        ? "bg-orange-500/20 text-orange-400"
                                                        : attack.severity === "MEDIUM"
                                                        ? "bg-yellow-500/20 text-yellow-400"
                                                        : "bg-green-500/20 text-green-400"
                                                }`}
                                            >

                                                {attack.severity}

                                            </span>

                                        </td>

                                        <td className="py-4">

                                            <span
                                                className={`font-bold ${
                                                    attack.risk_score >= 90
                                                        ? "text-red-500"
                                                        : attack.risk_score >= 70
                                                        ? "text-orange-400"
                                                        : attack.risk_score >= 50
                                                        ? "text-yellow-400"
                                                        : "text-green-400"
                                                }`}
                                            >

                                                {attack.risk_score}

                                            </span>

                                        </td>

                                        <td className="py-4">

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                    attack.blocked
                                                        ? "bg-green-500/20 text-green-400"
                                                        : "bg-red-500/20 text-red-400"
                                                }`}
                                            >

                                                {attack.blocked ? "Blocked" : "Allowed"}

                                            </span>

                                        </td>

                                        <td className="py-4 text-sm text-slate-400">

                                            {new Date(
                                                attack.created_at
                                            ).toLocaleString()}

                                        </td>

                                    </tr>

                                ))

                            )

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default RecentAttacks;