function RiskScore({

    score = 0

}) {

    const value = Math.max(0, Math.min(100, Number(score)));

    let color = "bg-green-500";
    let textColor = "text-green-400";

    if (value >= 90) {

        color = "bg-red-600";
        textColor = "text-red-500";

    } else if (value >= 70) {

        color = "bg-orange-500";
        textColor = "text-orange-400";

    } else if (value >= 50) {

        color = "bg-yellow-500";
        textColor = "text-yellow-400";

    }

    return (

        <div className="w-full">

            <div className="mb-2 flex items-center justify-between">

                <span className="text-sm text-slate-400">

                    Risk Score

                </span>

                <span className={`font-bold ${textColor}`}>

                    {value}/100

                </span>

            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">

                <div

                    className={`h-full rounded-full transition-all duration-500 ${color}`}

                    style={{

                        width: `${value}%`

                    }}

                />

            </div>

        </div>

    );

}

export default RiskScore;