import { useEffect, useState } from "react";
import { getSecurityEvents } from "../../api/admin.api";

function Attacks() {
    const [attacks, setAttacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;

        const fetchAttacks = async () => {
            try {
                setLoading(true);
                const response = await getSecurityEvents();
                if (!mounted) return;
                setAttacks(response?.data?.events || []);
                setError("");
            } catch (err) {
                console.error(err);
                if (!mounted) return;
                setError(
                    err?.response?.data?.message ||
                    "Unable to load attack events."
                );
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchAttacks();
        const interval = setInterval(fetchAttacks, 5000);

        return () => {
            mounted = false;
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 p-8 text-white">

            <h1 className="mb-8 text-4xl font-bold">
                SQL Injection Attacks
            </h1>

            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                {loading ? (
                    <div className="p-8 text-center text-slate-400">
                        Loading attack events...
                    </div>
                ) : error ? (
                    <div className="p-8 text-center text-red-400">
                        {error}
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-slate-800">
                            <tr>
                                <th className="p-4 text-left">IP</th>
                                <th className="p-4 text-left">Payload</th>
                                <th className="p-4 text-left">Risk</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-left">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attacks.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500">
                                        No attack events found.
                                    </td>
                                </tr>
                            ) : (
                                attacks.map((attack) => (
                                    <tr key={attack.id} className="border-t border-slate-800">
                                        <td className="p-4 text-slate-300">
                                            {attack.ip_address}
                                        </td>
                                        <td className="p-4 font-mono text-red-400">
                                            {attack.payload}
                                        </td>
                                        <td className="p-4 text-slate-300">
                                            {attack.risk_score ?? attack.risk || "N/A"}
                                        </td>
                                        <td className={`p-4 ${attack.blocked ? "text-green-400" : "text-red-400"}`}>
                                            {attack.blocked ? "Blocked" : "Allowed"}
                                        </td>
                                        <td className="p-4 text-slate-400">
                                            {attack.created_at ? new Date(attack.created_at).toLocaleString() : "Unknown"}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>

        </div>
    );
}

export default Attacks;