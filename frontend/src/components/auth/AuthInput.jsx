function AuthInput({
    label,
    type = "text",
    placeholder,
    value,
    onChange
}) {
    return (
        <div className="mb-5">

            <label className="mb-2 block text-sm font-medium text-slate-300">
                {label}
            </label>

            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-blue-500"
            />

        </div>
    );
}

export default AuthInput;