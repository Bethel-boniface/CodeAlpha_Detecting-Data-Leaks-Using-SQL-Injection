import { Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Topbar() {
    const { user } = useAuth();

    return (
        <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-8 py-5">

            <div>

                <h2 className="text-3xl font-bold text-white">
                    Dashboard
                </h2>

                <p className="text-slate-400">
                    Welcome back, {user?.username}
                </p>

            </div>

            <button className="rounded-full bg-slate-800 p-3 transition hover:bg-slate-700">
                <Bell className="text-white" size={20} />
            </button>

        </header>
    );
}

export default Topbar;