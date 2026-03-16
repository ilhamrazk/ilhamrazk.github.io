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

    return (
        <div>
            <h1>Home</h1>
            <p>Ini adalah halaman Home</p>
            <button onClick={handleClick}>Go to data page</button>
            <br/>
            <button onClick={handleAppClick}>Go to home page</button>
        </div>
    )
}