import {
    Users,
    Shield,
    ShieldCheck,
    ShieldAlert,
    Activity,
    Server,
    TrendingUp,
    TriangleAlert
} from "lucide-react";

const cardConfig = {

    "Total Users": {
        icon: Users,
        border: "border-blue-500/30",
        bg: "from-blue-500/10 to-blue-700/5",
        badge: "System"
    },

    "Total Attacks": {
        icon: Shield,
        border: "border-red-500/30",
        bg: "from-red-500/10 to-red-700/5",
        badge: "Threat"
    },

    "Blocked Attacks": {
        icon: ShieldCheck,
        border: "border-green-500/30",
        bg: "from-green-500/10 to-green-700/5",
        badge: "Protected"
    },

    "Critical Attacks": {
        icon: ShieldAlert,
        border: "border-red-600/40",
        bg: "from-red-600/15 to-red-900/10",
        badge: "Critical"
    },

    "High Risk": {
        icon: TriangleAlert,
        border: "border-orange-500/30",
        bg: "from-orange-500/10 to-orange-700/5",
        badge: "High Risk"
    },

    "High Risk Attacks": {
        icon: TriangleAlert,
        border: "border-orange-500/30",
        bg: "from-orange-500/10 to-orange-700/5",
        badge: "High Risk"
    },

    "Today's Attacks": {
        icon: Activity,
        border: "border-purple-500/30",
        bg: "from-purple-500/10 to-purple-700/5",
        badge: "Today"
    },

    "System Health": {
        icon: Server,
        border: "border-emerald-500/30",
        bg: "from-emerald-500/10 to-emerald-700/5",
        badge: "Healthy"
    }

};

function StatCard({

    title,

    value,

    color

}) {

    const config =
        cardConfig[title] || {

            icon: Activity,

            border: "border-slate-700",

            bg: "from-slate-800 to-slate-900",

            badge: "Security"

        };

    const Icon = config.icon;

    return (

        <div
            className={`
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                ${config.border}
                bg-gradient-to-br
                ${config.bg}
                bg-slate-900
                p-6
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-2xl
                hover:shadow-blue-500/10
            `}
        >

            {/* Decorative glow */}

            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5 blur-3xl"></div>

            <div className="relative z-10">

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-sm uppercase tracking-wider text-slate-400">

                            {title}

                        </p>

                        <h2 className={`mt-4 text-5xl font-extrabold ${color}`}>

                            {value}

                        </h2>

                    </div>

                    <div
                        className="
                            rounded-2xl
                            border
                            border-slate-700
                            bg-slate-800/70
                            p-4
                            transition-all
                            duration-300
                            group-hover:scale-110
                            group-hover:rotate-6
                        "
                    >

                        <Icon
                            className={`h-8 w-8 ${color}`}
                        />

                    </div>

                </div>

                <div className="mt-8 flex items-center justify-between">

                    <div className="flex items-center gap-2">

                        <TrendingUp
                            className="h-4 w-4 text-emerald-400"
                        />

                        <span className="text-sm text-emerald-400">

                            Live Data

                        </span>

                    </div>

                    <span
                        className="
                            rounded-full
                            border
                            border-slate-700
                            bg-slate-800
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            text-slate-300
                        "
                    >

                        {config.badge}

                    </span>

                </div>

                <div className="mt-5 h-1 overflow-hidden rounded-full bg-slate-800">

                    <div
                        className="
                            h-full
                            w-4/5
                            rounded-full
                            bg-gradient-to-r
                            from-blue-500
                            via-cyan-400
                            to-emerald-400
                        "
                    />

                </div>

            </div>

        </div>

    );

}

export default StatCard;