import { useEffect, useMemo, useState } from "react";

import {
    ShieldAlert,
    RefreshCw,
    Search
} from "lucide-react";

import { getThreatMonitor } from "../../api/admin.api";

function ThreatMonitor() {

    const [events, setEvents] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const fetchEvents = async () => {

        try {

            const response = await getThreatMonitor();

            setEvents(response.data.events);

            setError("");

        } catch (err) {

            console.error(err);

            setError(

                err.response?.data?.message ||

                "Failed to load threat monitor."

            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchEvents();

        const interval = setInterval(

            fetchEvents,

            180000

        );

        return () => clearInterval(interval);

    }, []);

    const filteredEvents = useMemo(() => {

        return events.filter((event) => {

            const value = search.toLowerCase();

            return (

                event.ip_address.toLowerCase().includes(value) ||

                event.attack_type.toLowerCase().includes(value) ||

                event.endpoint.toLowerCase().includes(value) ||

                event.severity.toLowerCase().includes(value)

            );

        });

    }, [events, search]);

    if (loading) {

        return (

            <div className="flex h-96 items-center justify-center text-white">

                Loading Threat Monitor...

            </div>

        );

    }

    if (error) {

        return (

            <div className="flex h-96 items-center justify-center text-red-400">

                {error}

            </div>

        );

    }

    return (

        <div>

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h1 className="text-4xl font-bold text-white">

                        Threat Monitor

                    </h1>

                    <p className="mt-2 text-slate-400">

                        Live monitoring of SQL injection attempts.

                    </p>

                </div>

                <button

                    onClick={fetchEvents}

                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"

                >

                    <RefreshCw size={18} />

                    Refresh

                </button>

            </div>

            <div className="mb-6 relative">

                <Search

                    className="absolute left-4 top-3 text-slate-500"

                    size={18}

                />

                <input

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                    placeholder="Search IP, endpoint, attack..."

                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 text-white outline-none focus:border-blue-500"

                />

            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

                <table className="min-w-full">

                    <thead>

                        <tr className="border-b border-slate-700 text-left text-slate-400">

                            <th className="p-4">Time</th>

                            <th className="p-4">IP</th>

                            <th className="p-4">Attack</th>

                            <th className="p-4">Severity</th>

                            <th className="p-4">Risk</th>

                            <th className="p-4">Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredEvents.map((event) => (

                                <tr

                                    key={event.id}

                                    className="border-b border-slate-800 hover:bg-slate-800/50"

                                >

                                    <td className="p-4 text-slate-300">

                                        {

                                            new Date(

                                                event.created_at

                                            ).toLocaleString()

                                        }

                                    </td>

                                    <td className="p-4 font-mono text-slate-300">

                                        {event.ip_address}

                                    </td>

                                    <td className="p-4">

                                        <div className="flex items-center gap-2">

                                            <ShieldAlert

                                                size={18}

                                                className="text-red-400"

                                            />

                                            <span className="text-red-400">

                                                {event.attack_type}

                                            </span>

                                        </div>

                                    </td>

                                    <td className="p-4">

                                        {event.severity}

                                    </td>

                                    <td className="p-4 font-bold text-orange-400">

                                        {event.risk_score}

                                    </td>

                                    <td className="p-4">

                                        {

                                            event.blocked ? (

                                                <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">

                                                    Blocked

                                                </span>

                                            ) : (

                                                <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-400">

                                                    Allowed

                                                </span>

                                            )

                                        }

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default ThreatMonitor;