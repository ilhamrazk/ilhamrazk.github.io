import {useNavigate} from "react-router";

export default function Home() {
    const navigate = useNavigate();

    function handleClick() {
        navigate({
            pathname: "/data",
        })
    }

    function handleAppClick() {
        navigate({
            pathname: "/App",
        })
    }

    function handleLoveClick() {
        navigate({
            pathname: "/LovePage",
        })
    }

    function handleLogOut() {
        localStorage.removeItem("user");
        navigate({
            pathname: "/",
        })
    }

    return (
        <div>
            <h1>Home</h1>
            <p>Ini adalah halaman Home</p>
            <button onClick={handleClick}>Go to data page</button>
            <br/>
            <button onClick={handleAppClick}>Go to home page</button>
            <br/>
            <button onClick={handleLoveClick}>Surprise</button>
            <br/>
            <button onClick={handleLogOut}>Log Out</button>
        </div>
    )
}