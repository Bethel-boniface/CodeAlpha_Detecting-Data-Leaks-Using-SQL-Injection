import { useState } from "react";

import {
    ShieldAlert,
    ShieldCheck,
    Terminal,
    Search,
    AlertTriangle,
    Trash2,
    Copy
} from "lucide-react";

import { analyzePayload } from "../../api/security.api";

function Playground() {

    const [payload, setPayload] = useState("");

    const [analysis, setAnalysis] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const payloadLibrary = [

        {
            name: "Authentication Bypass",
            payload: "' OR 1=1 --"
        },

        {
            name: "Boolean Injection",
            payload: "' AND 1=1 --"
        },

        {
            name: "UNION Injection",
            payload: "' UNION SELECT username,password FROM users --"
        },

        {
            name: "Time Based",
            payload: "'; WAITFOR DELAY '00:00:05' --"
        },

        {
            name: "Stacked Query",
            payload: "'; DROP TABLE users; --"
        },

        {
            name: "Comment Injection",
            payload: "' OR 'a'='a' #"
        }

    ];

    const handleAnalyze = async () => {

        if (!payload.trim()) {

            setError("Please enter a SQL payload.");

            return;

        }

        try {

            setLoading(true);

            setError("");

            setAnalysis(null);

            const response = await analyzePayload(payload);

            setAnalysis(response.data.analysis);

        } catch (err) {

            console.error(err);

            setError(

                err.response?.data?.message ||

                err.message ||

                "Unable to analyze payload."

            );

        } finally {

            setLoading(false);

        }

    };

    const clearPlayground = () => {

        setPayload("");

        setAnalysis(null);

        setError("");

    };

    const copyPayload = async () => {

        try {

            await navigator.clipboard.writeText(payload);

        } catch {

            console.log("Clipboard unavailable");

        }

    };

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold text-white">

                    SQL Injection Playground

                </h1>

                <p className="mt-2 text-slate-400">

                    Safely test SQL Injection payloads using the SQLShield Detection Engine.

                </p>

            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

                <div className="mb-6">

                    <h2 className="mb-4 text-xl font-semibold text-white">

                        Payload Library

                    </h2>

                    <div className="flex flex-wrap gap-3">

                        {

                            payloadLibrary.map((item) => (

                                <button

                                    key={item.name}

                                    onClick={() => setPayload(item.payload)}

                                    className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-300 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"

                                >

                                    {item.name}

                                </button>

                            ))

                        }

                    </div>

                </div>

                <div className="mb-5 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <Terminal className="h-7 w-7 text-blue-400" />

                        <h2 className="text-2xl font-semibold text-white">

                            SQL Payload Editor

                        </h2>

                    </div>

                    <div className="flex gap-3">

                        <button

                            onClick={copyPayload}

                            className="rounded-lg bg-slate-800 p-2 text-slate-300 hover:bg-slate-700"

                        >

                            <Copy size={18} />

                        </button>

                        <button

                            onClick={clearPlayground}

                            className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"

                        >

                            <Trash2 size={18} />

                        </button>

                    </div>

                </div>

                <textarea

                    rows={10}

                    value={payload}

                    onChange={(e) => setPayload(e.target.value)}

                    placeholder="' OR 1=1 --"

                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 p-5 font-mono text-green-400 outline-none transition focus:border-blue-500"

                />

                <button

                    onClick={handleAnalyze}

                    disabled={loading}

                    className="mt-6 flex items-center gap-3 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"

                >

                    <Search size={18} />

                    {

                        loading

                            ? "Analyzing..."

                            : "Analyze Payload"

                    }

                </button>

                {

                    error && (

                        <div className="mt-5 rounded-xl border border-red-500 bg-red-500/10 p-4 text-red-400">

                            {error}

                        </div>

                    )

                }

            </div>

            {

                analysis && (

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

                        <div className="mb-8 flex items-center gap-3">

                            {

                                analysis.blocked

                                    ? <ShieldAlert className="h-8 w-8 text-red-500" />

                                    : <ShieldCheck className="h-8 w-8 text-green-500" />

                            }

                            <h2 className="text-3xl font-bold text-white">

                                Threat Analysis

                            </h2>

                        </div>

                        <div className="grid gap-6 md:grid-cols-3">

                            <div className="rounded-2xl bg-slate-950 p-6">

                                <p className="text-slate-400">

                                    Risk Score

                                </p>

                                <h2 className="mt-3 text-5xl font-bold text-red-500">

                                    {analysis.riskScore}

                                </h2>

                            </div>

                            <div className="rounded-2xl bg-slate-950 p-6">

                                <p className="text-slate-400">

                                    Severity

                                </p>

                                <h2 className="mt-3 text-4xl font-bold text-orange-400">

                                    {analysis.severity}

                                </h2>

                            </div>

                            <div className="rounded-2xl bg-slate-950 p-6">

                                <p className="text-slate-400">

                                    Status

                                </p>

                                <h2 className={`mt-3 text-4xl font-bold ${analysis.blocked ? "text-red-500" : "text-green-500"}`}>

                                    {

                                        analysis.blocked

                                            ? "BLOCKED"

                                            : "SAFE"

                                    }

                                </h2>

                            </div>

                        </div>

                        <div className="mt-10">

                            <h3 className="mb-5 text-2xl font-semibold text-white">

                                Matched Rules

                            </h3>

                            {

                                analysis.matchedRules?.length > 0 ? (

                                    <div className="space-y-4">

                                        {

                                            analysis.matchedRules.map((rule, index) => (

                                                <div

                                                    key={index}

                                                    className="rounded-xl border border-red-500/30 bg-red-500/10 p-5"

                                                >

                                                    <div className="flex items-center gap-3">

                                                        <AlertTriangle className="h-5 w-5 text-red-400" />

                                                        <span className="font-semibold text-red-400">

                                                            {rule.rule}

                                                        </span>

                                                    </div>

                                                    <p className="mt-2 text-slate-300">

                                                        Severity: {rule.severity}

                                                    </p>

                                                    <p className="mt-2 text-slate-400">

                                                        {rule.recommendation}

                                                    </p>

                                                </div>

                                            ))

                                        }

                                    </div>

                                ) : (

                                    <div className="rounded-xl border border-green-500 bg-green-500/10 p-5 text-green-400">

                                        No SQL Injection patterns detected.

                                    </div>

                                )

                            }

                        </div>

                    </div>

                )

            }

        </div>

    );

}

export default Playground;