import {useNavigate, useSearchParams} from "react-router";
import {useState} from "react";

export default function ProductSearch() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [search, setSearch] = useState(searchParams.get("search") || "");

    function handleSearch() {
        if (search) {
            navigate({
                pathname: "/data/products/search",
                search: `?search=${search}`
            })
        }
    }

    return (
        <>
            <h1>Search Product</h1>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
            <button onClick={handleSearch}>Search</button>

            <p>
                Kamu mencari : {searchParams.get("search")}
            </p>

            <p>
                Created by Ilhamrazk
            </p>
        </>
    )
}