import { ShieldCheck } from "lucide-react";

function EmptyState({

    title = "No Data Available",

    message = "Everything looks good. No security events were found."

}) {

    return (

        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900 px-8 py-16">

            <div className="mb-6 rounded-full bg-green-500/10 p-5">

                <ShieldCheck
                    size={52}
                    className="text-green-400"
                />

            </div>

            <h2 className="text-2xl font-bold text-white">

                {title}

            </h2>

            <p className="mt-3 max-w-md text-center text-slate-400">

                {message}

            </p>

        </div>

    );

}

export default EmptyState;