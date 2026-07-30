import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function PasswordInput({
    label,
    value,
    onChange,
    placeholder
}) {

    const [showPassword, setShowPassword] = useState(false);

    return (

        <div className="mb-5">

            <label className="mb-2 block text-sm font-medium text-slate-300">
                {label}
            </label>

            <div className="relative">

                <input
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 pr-12 text-white outline-none transition focus:border-blue-500"
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>

            </div>

        </div>

    );
}

export default PasswordInput;