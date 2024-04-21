import React, {useEffect, useState} from 'react';
import axios from "../api/axios";
import {Link, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Auth from "./Auth";
import {NotificationManager} from "react-notifications";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import api from "../api/axios";

function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [notificationShown, setNotificationShown] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const notificationShown = localStorage.getItem('notificationShown');
        if (location.state && !notificationShown && location.state.hasVisited === false) {
            NotificationManager.success(location.state.message, location.state.title, 3000);
            localStorage.setItem('notificationShown', true);
        }


    }, [location]);

    const handleClick = async (event) => {
        event.preventDefault();

        try {
            const response = await api.post('api/users/token/', {
                email: name,
                password: password
            });
            const {refreshToken, token} = response.data
            setName('')
            setPassword('')
            console.log(response.data);
            localStorage.setItem('access', token)
            localStorage.setItem('refresh', refreshToken)
            navigate('/')
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError("Invalid email or password. Please try again.");
            } else {
                setError("An error occurred. Please try again later.");
            }
        }
    }

    const handleNavigate = () => {
        setNotificationShown(false);
        localStorage.removeItem('notificationShown');
    }

    return (
        <div className="container">
            <NotificationContainer/>
            <div className="auth-box">
                <div className="auth-header">SIGN IN</div>
                <div className="auth-body">
                    <form className="login-form" onSubmit={handleClick}>
                        <input type="email" placeholder="EMAIL" name="email"
                               className="phoneNumberInput" autoComplete="off" value={name}
                               onChange={(event) => {
                                   setName(event.target.value)
                               }}/>
                        <input type="password" placeholder="PASSWORD" name="password" className="passwordInput"
                               autoComplete="off" value={password}
                               onChange={(event) => {
                                   setPassword(event.target.value)
                               }}/>
                        <div style={{width: "100%", display: "flex", justifyContent: "left", alignItems: "flex-start"}}>
                            <Link to="/forgot-password"><a style={{color: "red"}}>Forgot password?</a></Link>
                        </div>
                        <input type="submit" value="SIGN IN" className="signInButton"/>
                    </form>

                    {error && <div className="error-message" style={{
                        display: "flex",
                        textAlign: "center",
                        justifyContent: "center",
                        top: "15px",
                        position: "relative"
                    }}><p style={{color: "red"}}>{error}</p></div>}
                    <div className="forgetText">
                        <p>If you don’t have an account &nbsp;</p>
                        <Link to="/auth" onClick={handleNavigate}>click here!</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
