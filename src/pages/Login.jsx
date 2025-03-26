import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await login(username, password);
        } catch {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="flex max-w-dvw items-center justify-center min-h-screen bg-gray-900 px-4">
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
                <div className="flex justify-center mb-6">
                    <img src="../logo.svg" alt="Logo" className="w-32 h-auto rounded-lg" />
                </div>

                <h2 className="text-2xl font-bold text-center text-gray-50 mb-6">Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-100 font-medium mb-1" htmlFor="username">User Name</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 text-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-100 font-medium mb-1" htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 text-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button type="submit" className="w-full cursor-pointer bg-green-700 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition duration-300">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
