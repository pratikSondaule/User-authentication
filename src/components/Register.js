import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"

const Register = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    });

    let name, value
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    }

    const register = async (e) => {
        e.preventDefault();

        const { name, email, password, cpassword } = user;

        try {

            if (password === cpassword) {

                const res = await axios.post("http://localhost:8080/register", { name, email, password, cpassword }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                console.log(res.data);

                window.alert("Registered successfully");
                console.log("Registered");

                navigate("/login");
            } else {
                window.alert("Password and Confirm password didn't match");
            }

        } catch (err) {
            console.error(err);
            window.alert("Invalid Registration");
            console.log("Not registered");
        }
    }

    return (
        <div className="box m-auto mt-5">
            <div className="text-center mb-3">
                <h1>Register</h1>
            </div>

            <form method="POST" className="form">
                <div className="mb-3">
                    <input name="name" type="text" placeholder="Name" value={user.name} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <input name="email" type="email" placeholder="E-mail" value={user.email} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <input name="password" type="password" placeholder="Password" value={user.password} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <input name="cpassword" type="password" placeholder="Confirm Password" value={user.cpassword} onChange={handleChange} className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary mb-3 form-control" onClick={register} >SignUp</button>
            </form>

            <div className="text-center">
            <p>Or</p>
            <p>Already a user? <NavLink to="/login">Login</NavLink></p>
            </div>
        </div>
    )
}

export default Register