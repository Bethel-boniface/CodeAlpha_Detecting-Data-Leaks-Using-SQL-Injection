import { useEffect, useMemo, useState } from "react";

import { getSecurityEvents } from "../../api/admin.api";

function Logs() {

    const [events, setEvents] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [severity, setSeverity] = useState("ALL");

    const fetchEvents = async () => {

        try {

            const response = await getSecurityEvents();

            setEvents(response.data.events);

            setError("");

        } catch (err) {

            console.error(err);

            setError(

                err.response?.data?.message ||

                "Unable to load security events."

            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchEvents();

        const interval = setInterval(

            fetchEvents,

            5000

        );

        return () => clearInterval(interval);

    }, []);

    const filteredEvents = useMemo(() => {

        return events.filter((event) => {

            const keyword = search.toLowerCase();

            const matchesSearch =

                event.ip_address.toLowerCase().includes(keyword) ||

                event.endpoint.toLowerCase().includes(keyword) ||

                event.attack_type.toLowerCase().includes(keyword) ||

                (event.category || "").toLowerCase().includes(keyword);

            const matchesSeverity =

                severity === "ALL" ||

                event.severity === severity;

            return matchesSearch && matchesSeverity;

        });

    }, [events, search, severity]);

    if (loading) {

        return (

            <div className="flex h-96 items-center justify-center text-white">

                Loading security logs...

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

        <div className="space-y-8">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h1 className="text-4xl font-bold text-white">

                        Security Logs

                    </h1>

                    <p className="mt-2 text-slate-400">

                        Monitor detected attacks in real time.

                    </p>

                </div>

                <div className="flex flex-col gap-3 md:flex-row">

                    <input

                        type="text"

                        placeholder="Search..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                        className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-white"

                    />

                    <select

                        value={severity}

                        onChange={(e) =>

                            setSeverity(e.target.value)

                        }

                        className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-white"

                    >

                        <option value="ALL">

                            All Severities

                        </option>

                        <option value="LOW">

                            LOW

                        </option>

                        <option value="MEDIUM">

                            MEDIUM

                        </option>

                        <option value="HIGH">

                            HIGH

                        </option>

                        <option value="CRITICAL">

                            CRITICAL

                        </option>

                    </select>

                </div>

            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                <div className="mb-6 flex items-center justify-between">

                    <h2 className="text-xl font-bold text-white">

                        Threat Events

                    </h2>

                    <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-400">

                        {filteredEvents.length} Events

                    </span>

                </div>

                <div className="overflow-x-auto">

                    <table className="min-w-full">

                        <thead>

                            <tr className="border-b border-slate-700 text-left text-slate-400">

                                <th className="pb-3">

                                    IP

                                </th>

                                <th className="pb-3">

                                    Endpoint

                                </th>

                                <th className="pb-3">

                                    Category

                                </th>

                                <th className="pb-3">

                                    Attack

                                </th>

                                <th className="pb-3">

                                    Severity

                                </th>

                                <th className="pb-3">

                                    Risk

                                </th>

                                <th className="pb-3">

                                    Time

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredEvents.length === 0 ? (

                                    <tr>

                                        <td

                                            colSpan="7"

                                            className="py-8 text-center text-slate-500"

                                        >

                                            No security events found.

                                        </td>

                                    </tr>

                                ) : (

                                    filteredEvents.map((event) => (

                                        <tr

                                            key={event.id}

                                            className="border-b border-slate-800 hover:bg-slate-800/40"

                                        >

                                            <td className="py-4">

                                                {event.ip_address}

                                            </td>

                                            <td className="py-4">

                                                {event.endpoint}

                                            </td>

                                            <td className="py-4">

                                                {event.category}

                                            </td>

                                            <td className="py-4 text-red-400">

                                                {event.attack_type}

                                            </td>

                                            <td className="py-4">

                                                <span

                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${

                                                        event.severity === "CRITICAL"

                                                            ? "bg-red-600/20 text-red-500"

                                                            : event.severity === "HIGH"

                                                            ? "bg-orange-500/20 text-orange-400"

                                                            : event.severity === "MEDIUM"

                                                            ? "bg-yellow-500/20 text-yellow-400"

                                                            : "bg-green-500/20 text-green-400"

                                                    }`}

                                                >

                                                    {event.severity}

                                                </span>

                                            </td>

                                            <td className="py-4 font-bold">

                                                {event.risk_score}

                                            </td>

                                            <td className="py-4 text-slate-400">

                                                {

                                                    new Date(

                                                        event.created_at

                                                    ).toLocaleString()

                                                }

                                            </td>

                                        </tr>

                                    ))

                                )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default Logs;