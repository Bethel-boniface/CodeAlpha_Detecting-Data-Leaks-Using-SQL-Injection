import {
    Database,
    Server,
    ShieldCheck,
    Lock,
    Activity,
    Globe,
    CheckCircle2
} from "lucide-react";

const services = [

    {
        name: "API Server",
        description: "REST API responding normally.",
        status: "Operational",
        icon: Server,
        color: "text-green-400"
    },

    {
        name: "PostgreSQL Database",
        description: "Database connection active.",
        status: "Healthy",
        icon: Database,
        color: "text-green-400"
    },

    {
        name: "SQL Injection Engine",
        description: "Threat detection enabled.",
        status: "Running",
        icon: ShieldCheck,
        color: "text-cyan-400"
    },

    {
        name: "JWT Authentication",
        description: "Token validation active.",
        status: "Secure",
        icon: Lock,
        color: "text-blue-400"
    },

    {
        name: "Rate Limiter",
        description: "Abuse protection enabled.",
        status: "Protected",
        icon: Activity,
        color: "text-purple-400"
    },

    {
        name: "Network Gateway",
        description: "Incoming traffic monitored.",
        status: "Online",
        icon: Globe,
        color: "text-emerald-400"
    }

];

function SystemStatus() {

    return (

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h2 className="text-2xl font-bold text-white">

                        Security Services

                    </h2>

                    <p className="mt-2 text-slate-400">

                        Live operational status of SQLShield components.

                    </p>

                </div>

                <span className="rounded-full bg-green-500/15 px-4 py-2 text-sm font-semibold text-green-400">

                    All Systems Operational

                </span>

            </div>

            <div className="space-y-4">

                {

                    services.map((service) => {

                        const Icon = service.icon;

                        return (

                            <div
                                key={service.name}
                                className="
                                    group
                                    flex
                                    items-center
                                    justify-between
                                    rounded-2xl
                                    border
                                    border-slate-800
                                    bg-slate-950
                                    p-5
                                    transition-all
                                    duration-300
                                    hover:border-blue-500/40
                                    hover:bg-slate-900
                                "
                            >

                                <div className="flex items-center gap-4">

                                    <div
                                        className="
                                            rounded-xl
                                            bg-slate-800
                                            p-3
                                            transition
                                            group-hover:scale-110
                                        "
                                    >

                                        <Icon
                                            className={`h-6 w-6 ${service.color}`}
                                        />

                                    </div>

                                    <div>

                                        <h3 className="font-semibold text-white">

                                            {service.name}

                                        </h3>

                                        <p className="mt-1 text-sm text-slate-400">

                                            {service.description}

                                        </p>

                                    </div>

                                </div>

                                <div className="flex items-center gap-3">

                                    <CheckCircle2 className="h-5 w-5 text-green-400" />

                                    <span className="font-semibold text-green-400">

                                        {service.status}

                                    </span>

                                </div>

                            </div>

                        );

                    })

                }

            </div>

            <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">

                <div className="flex items-center justify-between">

                    <div>

                        <h3 className="font-semibold text-white">

                            Overall Security Status

                        </h3>

                        <p className="mt-1 text-sm text-slate-400">

                            All monitored services are functioning normally.

                        </p>

                    </div>

                    <div className="text-right">

                        <p className="text-3xl font-bold text-emerald-400">

                            100%

                        </p>

                        <p className="text-sm text-slate-400">

                            Availability

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default SystemStatus;