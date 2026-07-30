function AuthCard({ title, subtitle, children }) {
    return (
        <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900/80 backdrop-blur-xl p-8 shadow-2xl">

            <div className="mb-8 text-center">

                <h1 className="text-3xl font-bold text-white">
                    {title}
                </h1>

                <p className="mt-2 text-slate-400">
                    {subtitle}
                </p>

            </div>

            {children}

        </div>
    );
}

export default AuthCard;