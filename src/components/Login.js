import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {

    const navigate = useNavigate();

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",

    });

    const { email, password } = userLogin;

    let name, value
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUserLogin({ ...userLogin, [name]: value });
    }

    const login = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:8080/login', {
                email,
                password
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            localStorage.setItem("token", res.data.token);
            window.alert("Login Successful");
            navigate("/")

        } catch (error) {
            console.log(error);

            window.alert("Invalid Credentials");
        }
    }


    return (
        <div className="box m-auto mt-5">
            <div className="text-center mb-3">
                <h1>Log in</h1>
            </div>
            <form method="POST">
                <div className="mb-3">
                    <input name="email" id="email" type="email" placeholder="E-mail" value={email} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <input name="password" id="password" type="password" placeholder="Password" value={password} onChange={handleChange} className="form-control" />
                </div>
                {/* <button type="submit" className="btn" onClick={login}>Login</button> */}
                <button type="submit" className="btn btn-primary mb-3 form-control" onClick={login}>Log in</button>
            </form>
            <div className="text-center">
                <p >Or</p>
                <p >New User? <NavLink to="/register">SignUp</NavLink> </p>
            </div>
        </div>
    )
}

export default Login