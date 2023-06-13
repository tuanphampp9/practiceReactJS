import { useEffect, useState } from "react"
import { loginApi } from "../services/UserService";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from 'react';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loadingAPI, setLoadingAPI] = useState(false);
    const navigate = useNavigate();
    const { loginContext } = useContext(UserContext);
    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, [])
    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("You dont type email or password!")
            return;
        }
        setLoadingAPI(true);
        let res = await loginApi(email, password);
        if (res && res.status === 400) {
            /* user not found */
            toast.error(res.data.error);
        } else {

            loginContext(email, res.token);
            toast.success("login successfully!");
            navigate("/");
        }
        return setLoadingAPI(false);
    }
    console.log(loadingAPI);
    return (
        <div className="login-container col-12 col-sm-6">
            <div className="title">Log in</div>
            <div className="text">Email or Username (email: michael.lawson@reqres.in)</div>
            <input
                type="text"
                placeholder="Email or username"
                value={email}
                onChange={(event) => setEmail(event.target.value)} />
            <div className="box-password">
                <input
                    type={isShowPassword === true ? "text" : "password"}
                    placeholder="Password..."
                    value={password}
                    onChange={(event) => setPassword(event.target.value)} />
                <i
                    className={isShowPassword === true ? "fa-solid fa-eye eye" : "fa-solid fa-eye-slash eye"}
                    onClick={() => setIsShowPassword(!isShowPassword)}></i>
            </div>
            <button
                className={email && password ? "active" : ""}
                disabled={!(email && password)}
                onClick={() => handleLogin()}>
                {loadingAPI && <i className="fas fa-circle-notch fa-spin"></i>}&nbsp;Login</button>
            <div className="back">
                <i className="fa-solid fa-angle-left"></i>
                <NavLink className="back" to="/">Go back</NavLink>
            </div>
        </div>
    )
}
export default Login