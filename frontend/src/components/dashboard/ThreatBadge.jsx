function ThreatBadge({

    severity

}) {

    const styles = {

        CRITICAL: "bg-red-600 text-white border-red-500",

        HIGH: "bg-orange-500/20 text-orange-400 border-orange-500/40",

        MEDIUM: "bg-yellow-500/20 text-yellow-400 border-yellow-500/40",

        LOW: "bg-green-500/20 text-green-400 border-green-500/40"

    };

    const badgeStyle =

        styles[severity] ||

        "bg-slate-700 text-slate-300 border-slate-600";

    return (

        <span

            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${badgeStyle}`}

        >

            {severity || "UNKNOWN"}

        </span>

    );

}

export default ThreatBadge;