import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {login} from "./api/authApi.js";
import {isLoggedIn} from "./api/auth.js";

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isLoggedIn()) {
            navigate("/Home", {replace: true});
        }
    }, [navigate]);

    async function handleLogin() {
        try {
            // 🔥 bypass login
            if (username === "ica" && password === "admin") {
                console.log("Login bypass berhasil");

                // simpan fake user
                localStorage.setItem("user", JSON.stringify({
                    email: "ica",
                    role: "admin"
                }));

                navigate("/Home", {replace: true});
                return; // ⛔ stop di sini, gak lanjut ke API
            }

            // 🔥 selain itu hit API
            const response = await login({
                email: username,
                password: password
            });

            // save token
            localStorage.setItem("user", JSON.stringify(response.data));
            console.log(response);

            navigate("/Home", {replace: true});
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message);
        }
    }
    return (
        <div>
            <h2>LOGIN OLIVE KITCHEN</h2>
            <p>Email : </p>
            <input type="text" onChange={event => setUsername(event.target.value)}/>
            <p>Password : </p>
            <input type="password" onChange={event => setPassword(event.target.value)}/>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}