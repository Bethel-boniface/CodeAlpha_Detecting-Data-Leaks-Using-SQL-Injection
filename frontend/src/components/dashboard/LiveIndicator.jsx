import { Activity } from "lucide-react";

function LiveIndicator({

    connected = true,

    text

}) {

    return (

        <div className="flex items-center gap-3">

            <span className="relative flex h-3 w-3">

                <span
                    className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
                        connected
                            ? "bg-green-500"
                            : "bg-red-500"
                    }`}
                />

                <span
                    className={`relative inline-flex h-3 w-3 rounded-full ${
                        connected
                            ? "bg-green-500"
                            : "bg-red-500"
                    }`}
                />

            </span>

            <Activity

                size={18}

                className={
                    connected
                        ? "text-green-400"
                        : "text-red-400"
                }

            />

            <span
                className={`font-semibold ${
                    connected
                        ? "text-green-400"
                        : "text-red-400"
                }`}
            >

                {

                    text ||

                    (

                        connected

                            ? "LIVE"

                            : "OFFLINE"

                    )

                }

            </span>

        </div>

    );

}

export default LiveIndicator;