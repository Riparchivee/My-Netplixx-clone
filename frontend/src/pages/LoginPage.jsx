import { Link } from "react-router-dom";
import { useState } from "react";
import {useAuthStore} from "../store/authStore"

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login, isLoggingIn} = useAuthStore()

    const handleLogin = event => {
        event.preventDefault();
        login({email, password})
        console.log(email, password);
    };
    return (
        <div className="h-screen w-full hero-bg">
            <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
                <Link to={"/"}>
                    <img className="w-20 md:w-40 text-red-700 text-2xl font-semibold"
                        src="/netflix-logo.png"
                        alt="netflix-logo"
                    />
                </Link>
            </header>

            <div className="flex justify-center items-center mt-20 mx-3">
                <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
                    <h1 className="text-center text-white text-2xl font-bold mb-4">
                        Log in
                    </h1>
                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div>
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-gray-300 block"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                                placeholder="you@example.com"
                                id="email"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="text-sm font-medium text-gray-300 block"
                            >
                                Password
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                                placeholder="******"
                                id="password"
                                value={password}
                                onChange={event =>
                                    setPassword(event.target.value)
                                }
                            />
                        </div>
                        <button className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 "
                        disabled={isLoggingIn}
                        >
                            {isLoggingIn ? "loading.." : "Login"}
                        </button>
                    </form>
                    <div className="items-center justify-center font-semibold flex flex-nowrap gap-1">
                        <h4 className="text-gray-400">Tidak memiliki akun?</h4>
                        <Link
                            to={"/signup"}
                            className="text-red-500 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
