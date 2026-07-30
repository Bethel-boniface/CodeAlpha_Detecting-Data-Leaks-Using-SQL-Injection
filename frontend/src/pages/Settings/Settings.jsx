import {
    User,
    Shield,
    Server,
    Database,
    LogOut,
    CheckCircle
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function Settings() {

    const { user, logout } = useAuth();

    return (

        <div className="min-h-screen bg-slate-950 p-8 text-white">

            <div className="mb-10">

                <h1 className="text-4xl font-bold">

                    Settings

                </h1>

                <p className="mt-2 text-slate-400">

                    Manage your SQLShield account and system information.

                </p>

            </div>

            <div className="grid gap-8 lg:grid-cols-2">

                {/* Account */}

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                    <div className="mb-6 flex items-center gap-3">

                        <User className="text-blue-400" />

                        <h2 className="text-2xl font-bold">

                            Account Information

                        </h2>

                    </div>

                    <div className="space-y-5">

                        <div>

                            <p className="text-sm text-slate-400">

                                Username

                            </p>

                            <p className="mt-1 text-lg font-semibold">

                                {user?.username}

                            </p>

                        </div>

                        <div>

                            <p className="text-sm text-slate-400">

                                Email

                            </p>

                            <p className="mt-1 text-lg">

                                {user?.email}

                            </p>

                        </div>

                        <div>

                            <p className="text-sm text-slate-400">

                                Role

                            </p>

                            <span className="mt-2 inline-block rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold">

                                {user?.role}

                            </span>

                        </div>

                        <div>

                            <p className="text-sm text-slate-400">

                                Member Since

                            </p>

                            <p className="mt-1">

                                {user?.created_at
                                    ? new Date(user.created_at).toLocaleDateString()
                                    : "N/A"}

                            </p>

                        </div>

                    </div>

                </div>

                {/* Security */}

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                    <div className="mb-6 flex items-center gap-3">

                        <Shield className="text-green-400" />

                        <h2 className="text-2xl font-bold">

                            Security Status

                        </h2>

                    </div>

                    <div className="space-y-4">

                        {[
                            "SQL Injection Detection",
                            "Rate Limiter",
                            "Request Logging",
                            "Security Engine"
                        ].map((item) => (

                            <div
                                key={item}
                                className="flex items-center justify-between rounded-xl bg-slate-800 p-4"
                            >

                                <span>

                                    {item}

                                </span>

                                <span className="flex items-center gap-2 text-green-400">

                                    <CheckCircle size={18} />

                                    Enabled

                                </span>

                            </div>

                        ))}

                    </div>

                </div>

                {/* Application */}

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                    <div className="mb-6 flex items-center gap-3">

                        <Server className="text-orange-400" />

                        <h2 className="text-2xl font-bold">

                            Application

                        </h2>

                    </div>

                    <div className="space-y-5">

                        <div className="flex justify-between">

                            <span className="text-slate-400">

                                Version

                            </span>

                            <span>

                                v1.0.0

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span className="text-slate-400">

                                Environment

                            </span>

                            <span>

                                Development

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span className="text-slate-400">

                                Backend

                            </span>

                            <span>

                                Node.js + Express

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span className="text-slate-400">

                                Frontend

                            </span>

                            <span>

                                React + Tailwind CSS

                            </span>

                        </div>

                    </div>

                </div>

                {/* Database */}

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                    <div className="mb-6 flex items-center gap-3">

                        <Database className="text-purple-400" />

                        <h2 className="text-2xl font-bold">

                            Database

                        </h2>

                    </div>

                    <div className="space-y-5">

                        <div className="flex justify-between">

                            <span className="text-slate-400">

                                Database

                            </span>

                            <span>

                                PostgreSQL

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span className="text-slate-400">

                                Status

                            </span>

                            <span className="text-green-400">

                                Connected

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span className="text-slate-400">

                                Security

                            </span>

                            <span>

                                AES-256 Encryption

                            </span>

                        </div>

                    </div>

                </div>

            </div>

            {/* Danger Zone */}

            <div className="mt-8 rounded-2xl border border-red-500/40 bg-slate-900 p-6">

                <h2 className="mb-2 text-2xl font-bold text-red-400">

                    Danger Zone

                </h2>

                <p className="mb-6 text-slate-400">

                    Logout from the SQLShield Security Center.

                </p>

                <button

                    onClick={logout}

                    className="flex items-center gap-3 rounded-xl bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-700"

                >

                    <LogOut size={20} />

                    Logout

                </button>

            </div>

        </div>

    );

}

export default Settings;