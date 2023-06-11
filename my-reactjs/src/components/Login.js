import { useState } from "react"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    return (
        <div className="login-container col-12 col-sm-6">
            <div className="title">Log in</div>
            <div className="text">Email or Username</div>
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
                disabled={!(email && password)}>Login</button>
            <div className="back">
                <i className="fa-solid fa-angle-left"></i> Go back
            </div>
        </div>
    )
}
export default Login