import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {login} from "./api/authApi.js";
import {isLoggedIn} from "./api/auth.js";
import {motion} from "motion/react"
import toast from "react-hot-toast";

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dark, setDark] = useState(false);

    useEffect(() => {
        if (isLoggedIn()) {
            navigate("/Home", { replace: true });
        }
    }, [navigate]);

    async function handleLogin() {
        // 🔒 validasi
        if (!username || !password) {
            toast.error("Username & Password wajib diisi!");
            return;
        }

        setLoading(true);

        try {
            // 🔥 bypass login
            if (username === "ica" && password === "admin") {
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        email: "ica",
                        role: "admin",
                    })
                );

                toast.success("Login berhasil 🚀", {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
                navigate("/Home", { replace: true });
                return;
            }

            // 🔥 API login
            const response = await login({
                email: username,
                password: password,
            });

            localStorage.setItem("user", JSON.stringify(response.data));

            toast.success("Login berhasil 🚀", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            navigate("/Home", { replace: true });
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Login gagal!");
        } finally {
            setLoading(false); // ⚡ loading off (pasti jalan)
        }
    }

    return (
        <div className={dark ? "dark" : ""}>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 dark:from-gray-900 dark:to-gray-800 transition">

                {/* 🌙 Dark Mode */}
                <button
                    onClick={() => setDark(!dark)}
                    className="absolute top-5 right-5 bg-white dark:bg-gray-700 px-4 py-2 rounded-lg shadow"
                >
                    {dark ? "☀️ Light" : "🌙 Dark"}
                </button>

                {/*🎬 Animasi*/}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md"
                >
                    <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
                        Login Olive Kitchen 🍽️
                    </h2>

                    {/* Username */}
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none dark:bg-gray-800 dark:text-white"
                    />

                    {/* Password */}
                    <div className="relative mb-6">
                        <input
                            type={show ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none dark:bg-gray-800 dark:text-white"
                        />
                        <span
                            onClick={() => setShow(!show)}
                            className="absolute right-3 top-3 cursor-pointer"
                        >
                          {show ? "🙈" : "👁"}
                        </span>
                    </div>

                    {/* Button */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full bg-blue-500 text-white p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Loading...
                            </>
                        ) : (
                            "Login"
                        )}
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
}