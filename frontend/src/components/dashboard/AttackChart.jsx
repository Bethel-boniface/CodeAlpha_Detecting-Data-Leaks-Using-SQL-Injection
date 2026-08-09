import { useEffect, useState } from "react";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Area,
    AreaChart
} from "recharts";

import { Activity } from "lucide-react";

import { getAttackChart } from "../../api/admin.api";

function AttackChart() {

    const [chartData, setChartData] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const loadChart = async () => {

        try {

            const response = await getAttackChart();

            const formatted = response.data.chart.map((item) => ({

                day: new Date(item.date).toLocaleDateString(
                    "en-US",
                    {
                        month: "short",
                        day: "numeric"
                    }
                ),

                attacks: Number(item.attacks)

            }));

            setChartData(formatted);

            setError("");

        } catch (err) {

            console.error(err);

            setError(

                err.response?.data?.message ||

                "Unable to load attack trend."

            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadChart();

        const interval = setInterval(

            loadChart,

            180000

        );

        return () => clearInterval(interval);

    }, []);

    return (

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h2 className="text-2xl font-bold text-white">

                        Attack Trend

                    </h2>

                    <p className="mt-2 text-slate-400">

                        SQL injection attempts detected over time.

                    </p>

                </div>

                <div className="rounded-2xl bg-blue-500/10 p-4">

                    <Activity
                        className="h-8 w-8 text-blue-400"
                    />

                </div>

            </div>

            {

                loading ? (

                    <div className="flex h-80 items-center justify-center">

                        <div className="text-center">

                            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

                            <p className="text-slate-400">

                                Loading chart...

                            </p>

                        </div>

                    </div>

                ) : error ? (

                    <div className="flex h-80 items-center justify-center rounded-2xl border border-red-500 bg-red-500/10">

                        <p className="text-red-400">

                            {error}

                        </p>

                    </div>

                ) : chartData.length === 0 ? (

                    <div className="flex h-80 items-center justify-center">

                        <p className="text-slate-500">

                            No attack data available.

                        </p>

                    </div>

                ) : (

                    <div className="h-80">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <AreaChart
                                data={chartData}
                            >

                                <defs>

                                    <linearGradient
                                        id="attackGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >

                                        <stop
                                            offset="5%"
                                            stopColor="#3B82F6"
                                            stopOpacity={0.5}
                                        />

                                        <stop
                                            offset="95%"
                                            stopColor="#3B82F6"
                                            stopOpacity={0}
                                        />

                                    </linearGradient>

                                </defs>

                                <CartesianGrid
                                    stroke="#334155"
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    dataKey="day"
                                    stroke="#94A3B8"
                                />

                                <YAxis
                                    stroke="#94A3B8"
                                />

                                <Tooltip
                                    contentStyle={{
                                        background: "#0F172A",
                                        border: "1px solid #334155",
                                        borderRadius: "12px",
                                        color: "#fff"
                                    }}
                                />

                                <Area
                                    type="monotone"
                                    dataKey="attacks"
                                    stroke="#3B82F6"
                                    fill="url(#attackGradient)"
                                />

                                <Line
                                    type="monotone"
                                    dataKey="attacks"
                                    stroke="#60A5FA"
                                    strokeWidth={4}
                                    dot={{
                                        r: 5,
                                        fill: "#3B82F6"
                                    }}
                                    activeDot={{
                                        r: 8
                                    }}
                                />

                            </AreaChart>

                        </ResponsiveContainer>

                    </div>

                )

            }

        </div>

    );

}

export default AttackChart;