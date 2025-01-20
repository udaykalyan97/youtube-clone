import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Login = ({ setLoginModal }) => {

    const [loginField, setLoginField] = useState({ "userName": "", "password": "" });
    const [loader, setLoader] = useState(false);

    const handleOnChangeInput = (event, name) => {
        setLoginField({
            ...loginField,
            [name]: event.target.value
        });
    };

    const handleLoginFun = async()=>{
        setLoader(true);
        axios.post('http://localhost:4000/auth/login', loginField, {withCredentials: true}).then((res=>{
            console.log(res);
            setLoader(false);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.user._id);
            localStorage.setItem("username", res.data.user.userName);
            localStorage.setItem("userProfilePic", res.data.user.profilePic);
            window.location.reload();
        })).catch(err=>{
            setLoader(false);
            toast.error("Invalid Credentials");
            console.log(err);
        })
    }

    return (
        <div className="login min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-90">

            <div className="login_card bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-sm">
                {/* Title */}
                <div className="titleCard_login flex items-center justify-center text-2xl font-bold text-white mb-6 space-x-3">
                    <FontAwesomeIcon className="text-red-500" icon={faYoutube} />
                    <span>Login</span>
                </div>

                {/* Login Form */}
                <div className="loginCredentials space-y-4">
                    <div className="userNameLogin">
                        <input
                            className="userNameLoginUserName w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                            placeholder="Username"
                            type="text"
                            value={loginField.userName}
                            onChange={(e) => handleOnChangeInput(e, "userName")}
                        />
                    </div>
                    <div className="userNameLogin">
                        <input
                            className="userNameLoginUserName w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                            placeholder="Password"
                            type="password"
                            value={loginField.password}
                            onChange={(e) => handleOnChangeInput(e, "password")}
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="login_buttons flex justify-between items-center mt-6">
                    <button onClick={handleLoginFun} className="login-btn bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-all">
                        Login
                    </button>
                    <Link to="/signUp" onClick={() => setLoginModal()}>
                        <button className="login-btn bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-all">
                            Sign Up
                        </button>
                    </Link>
                    <button className="login-btn bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-all" onClick={() => setLoginModal()}>
                        Cancel
                    </button>
                    {loader && <ToastContainer/>}
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Login;
