import {
    LayoutDashboard,
    Activity,
    Shield,
    ShieldAlert,
    BarChart3,
    Users,
    FileText,
    Settings
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {

    const menu = [

        {
            icon: <LayoutDashboard size={20} />,
            title: "Dashboard",
            path: "/dashboard",
        },

        {
            icon: <BarChart3 size={20} />,
            title: "Analytics",
            path: "/analytics",
        },

        {
            icon: <Shield size={20} />,
            title: "Playground",
            path: "/playground",
        },

        {
            icon: <Activity size={20} />,
            title: "Threat Monitor",
            path: "/threat-monitor",
        },

        {
            icon: <ShieldAlert size={20} />,
            title: "Attacks",
            path: "/attacks",
        },

        {
            icon: <Users size={20} />,
            title: "Users",
            path: "/users",
        },

        {
            icon: <FileText size={20} />,
            title: "Logs",
            path: "/logs",
        },

        {
            icon: <Settings size={20} />,
            title: "Settings",
            path: "/settings",
        }

    ];

    return (

        <aside className="flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-900">

            <div className="border-b border-slate-800 p-6">

                <h1 className="text-2xl font-bold text-white">

                    SQLShield

                </h1>

                <p className="mt-1 text-sm text-slate-400">

                    Security Center

                </p>

            </div>

            <nav className="mt-6 flex-1 overflow-y-auto px-4">

                {

                    menu.map((item) => (

                        <NavLink

                            key={item.title}

                            to={item.path}

                            className={({ isActive }) =>

                                `mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                                    isActive
                                        ? "bg-blue-600 text-white"
                                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                }`

                            }

                        >

                            {item.icon}

                            <span>{item.title}</span>

                        </NavLink>

                    ))

                }

            </nav>

        </aside>

    );

}

export default Sidebar;