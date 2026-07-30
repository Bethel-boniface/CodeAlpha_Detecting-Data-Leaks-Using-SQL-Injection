import { recentAttacks } from "../../data/dashboardData";

function Attacks() {
    return (
        <div className="min-h-screen bg-slate-950 p-8 text-white">

            <h1 className="mb-8 text-4xl font-bold">
                SQL Injection Attacks
            </h1>

            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

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

                        {recentAttacks.map((attack) => (

                            <tr
                                key={attack.id}
                                className="border-t border-slate-800"
                            >

                                <td className="p-4">{attack.ip}</td>

                                <td className="p-4 font-mono text-red-400">
                                    {attack.payload}
                                </td>

                                <td className="p-4">
                                    {attack.risk}
                                </td>

                                <td className="p-4 text-green-400">
                                    {attack.status}
                                </td>

                                <td className="p-4">
                                    {attack.time}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Attacks;