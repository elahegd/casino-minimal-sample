import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/logo.svg";

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await login(username, password);
        } catch {
            setError("Invalid username or password");
            setPassword("");
            setUsername("");
            setTimeout(() => setError(null), 3000);
        }

        setLoading(false);
    };

    return (
        <div className="flex max-w-dvw items-center justify-center min-h-screen bg-gray-900 px-4">
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
                <div className="flex justify-center mb-6">
                    <img src={Logo} alt="Logo" className="w-32 h-auto" />
                </div>

                <h2 className="text-2xl font-bold text-center text-gray-50 mb-6">Login</h2>

                <form onSubmit={handleSubmit} data-testid="login-form">
                    <div className="mb-4">
                        <label className="block text-gray-100 font-medium mb-1" htmlFor="username">User Name</label>
                        <input
                            type="text"
                            name="username"
                            data-testid="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 text-gray-50 rounded-md focus:outline-none focus:ring-2 transition" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-100 font-medium mb-1" htmlFor="password">Password</label>
                        <input
                            data-testid="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 text-gray-50 rounded-md focus:outline-none focus:ring-2 transition" />
                    </div>

                    {error && <p data-testid="error-text" className="mb-4 text-red-500 text-sm">{error}</p>}

                    <button 
                        type="submit" 
                        disabled={loading} 
                        className={`w-full cursor-pointer ${loading ? "bg-gray-600" : "bg-green-700 hover:bg-green-600"} text-white font-semibold py-2 rounded-md transition duration-300`}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
