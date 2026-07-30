import { useEffect, useMemo, useState } from "react";

import {

    getUsers,

    activateUser,

    deactivateUser

} from "../../api/admin.api";

function Users() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [processingUser, setProcessingUser] = useState(null);

    const fetchUsers = async () => {

        try {

            const response = await getUsers();

            setUsers(response.data.users);

            setError("");

        } catch (err) {

            console.error(err);

            setError(

                err.response?.data?.message ||

                "Unable to load users."

            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchUsers();

        const interval = setInterval(

            fetchUsers,

            5000

        );

        return () => clearInterval(interval);

    }, []);

    const filteredUsers = useMemo(() => {

        return users.filter((user) => {

            const keyword = search.toLowerCase();

            return (

                user.username.toLowerCase().includes(keyword) ||

                user.email.toLowerCase().includes(keyword) ||

                user.role.toLowerCase().includes(keyword)

            );

        });

    }, [users, search]);

    const handleToggleUser = async (user) => {

        try {

            setProcessingUser(user.id);

            if (user.is_active) {

                await deactivateUser(user.id);

            } else {

                await activateUser(user.id);

            }

            await fetchUsers();

        } catch (err) {

            console.error(err);

            alert(

                err.response?.data?.message ||

                "Unable to update user."

            );

        } finally {

            setProcessingUser(null);

        }

    };

    if (loading) {

        return (

            <div className="flex h-96 items-center justify-center text-white">

                Loading users...

            </div>

        );

    }

    if (error) {

        return (

            <div className="flex h-96 items-center justify-center text-red-400">

                {error}

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h1 className="text-4xl font-bold text-white">

                        User Management

                    </h1>

                    <p className="mt-2 text-slate-400">

                        Manage SQLShield users.

                    </p>

                </div>

                <input

                    type="text"

                    placeholder="Search users..."

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500 lg:w-80"

                />

            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                <div className="mb-6 flex items-center justify-between">

                    <h2 className="text-xl font-bold text-white">

                        Users

                    </h2>

                    <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-400">

                        {filteredUsers.length} Users

                    </span>

                </div>

                <div className="overflow-x-auto">

                    <table className="min-w-full">

                        <thead>

                            <tr className="border-b border-slate-700 text-left text-slate-400">

                                <th className="pb-4">Username</th>

                                <th className="pb-4">Email</th>

                                <th className="pb-4">Role</th>

                                <th className="pb-4">Status</th>

                                <th className="pb-4">Created</th>

                                <th className="pb-4 text-center">

                                    Actions

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredUsers.length === 0 ? (

                                    <tr>

                                        <td

                                            colSpan="6"

                                            className="py-8 text-center text-slate-500"

                                        >

                                            No users found.

                                        </td>

                                    </tr>

                                ) : (

                                    filteredUsers.map((user) => (

                                        <tr

                                            key={user.id}

                                            className="border-b border-slate-800 hover:bg-slate-800/40"

                                        >

                                            <td className="py-4 font-medium text-white">

                                                {user.username}

                                            </td>

                                            <td className="py-4 text-slate-300">

                                                {user.email}

                                            </td>

                                            <td className="py-4">

                                                <span

                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${

                                                        user.role === "admin"

                                                            ? "bg-purple-500/20 text-purple-400"

                                                            : "bg-blue-500/20 text-blue-400"

                                                    }`}

                                                >

                                                    {user.role}

                                                </span>

                                            </td>

                                            <td className="py-4">

                                                <span

                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${

                                                        user.is_active

                                                            ? "bg-green-500/20 text-green-400"

                                                            : "bg-red-500/20 text-red-400"

                                                    }`}

                                                >

                                                    {

                                                        user.is_active

                                                            ? "Active"

                                                            : "Disabled"

                                                    }

                                                </span>

                                            </td>

                                            <td className="py-4 text-slate-400">

                                                {

                                                    new Date(

                                                        user.created_at

                                                    ).toLocaleDateString()

                                                }

                                            </td>

                                            <td className="py-4">

                                                <div className="flex justify-center">

                                                    <button

                                                        onClick={() =>

                                                            handleToggleUser(user)

                                                        }

                                                        disabled={

                                                            processingUser === user.id

                                                        }

                                                        className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${

                                                            user.is_active

                                                                ? "bg-red-600 text-white hover:bg-red-500"

                                                                : "bg-green-600 text-white hover:bg-green-500"

                                                        } disabled:cursor-not-allowed disabled:opacity-50`}

                                                    >

                                                        {

                                                            processingUser === user.id

                                                                ? "Processing..."

                                                                : user.is_active

                                                                ? "Deactivate"

                                                                : "Activate"

                                                        }

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default Users;