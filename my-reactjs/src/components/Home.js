import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
    let navigate = useNavigate();
    let token = localStorage.getItem("token");
    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [])
    return (
        <div>
            Home page
        </div>
    )
}

export default Home;