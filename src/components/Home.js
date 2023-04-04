import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);

    const userHome = async () => {
        try {
            const res = await axios.get("http://localhost:8080/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setUser(res.data);
            setAuthenticated(true);
        } catch (error) {
            console.log(error);
            setAuthenticated(false);
        }
    };

    useEffect(() => {
        userHome();
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (!authenticated) {
        return (
            <div className="box m-auto mt-5">
                <div className="text-center mb-3">
                    <h1>Hello There !!!</h1>
                </div>
                <div className="text-center">
                    <NavLink to="/login" className="btn btn-primary m-2">Login</NavLink>
                    <NavLink to="/register" className="btn btn-primary m-2">Register</NavLink>
                </div>
            </div>
        );
    } else {

        return (
            <div className="box m-auto mt-5">
                <div className="text-center mb-3">
                    <h1>Welcome {user && user.name}</h1>
                </div>
                <p className="text-center mb-3">You have logged in successfully</p>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>
        );
    }
};

export default Home;
