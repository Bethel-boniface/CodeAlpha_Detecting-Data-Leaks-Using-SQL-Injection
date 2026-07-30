import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { useAuth } from "../context/AuthContext";

function DashboardLayout() {

    const navigate = useNavigate();

    const {
        logout,
        isAuthenticated,
        user
    } = useAuth();

    const [sidebarOpen, setSidebarOpen] = useState(true);

    if (!isAuthenticated) {

        return <Navigate to="/login" replace />;

    }

    const handleLogout = () => {

        logout();

        navigate("/");

    };

    return (

        <div className="flex min-h-screen bg-slate-950">

            {/* Sidebar */}

            <aside
                className={`${sidebarOpen ? "w-72" : "w-24"} transition-all duration-300`}
            >

                <Sidebar />

            </aside>

            {/* Main Content */}

            <div className="flex flex-1 flex-col overflow-hidden">

                {/* Header */}

                <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-900">

                    <div className="flex items-center justify-between px-8 py-5">

                        <div>

                            <h1 className="text-2xl font-bold text-white">

                                SQLShield Security Center

                            </h1>

                            <p className="mt-1 text-sm text-slate-400">

                                Monitor attacks, users and system security.

                            </p>

                        </div>

                        <div className="flex items-center gap-6">

                            <div className="text-right">

                                <p className="font-semibold text-white">

                                    {user?.username || "Administrator"}

                                </p>

                                <p className="text-sm text-slate-400">

                                    {user?.role || "Admin"}

                                </p>

                            </div>

                            <button

                                onClick={handleLogout}

                                className="rounded-xl bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700"

                            >

                                Logout

                            </button>

                        </div>

                    </div>

                </header>

                {/* Existing Topbar */}

                <Topbar />

                {/* Page */}

                <main className="flex-1 overflow-y-auto bg-slate-950 p-8">

                    <div className="mx-auto max-w-7xl">

                        <Outlet />

                    </div>

                </main>

            </div>

        </div>

    );

}

export default DashboardLayout;