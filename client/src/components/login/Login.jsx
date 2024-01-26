import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from 'react-cookie';
import "./login.css";

const Login = () => {
    const [cookies, setCookie] = useCookies(['token']);
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });
    const { email, password } = inputValue;

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
        ...inputValue,
        [name]: value,
        });
    };

    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
            icon: false,
            closeButton: false,
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-left",
            icon: false,
            closeButton: false,
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const { data } = await axios.post(
            `${import.meta.env.VITE_PROD_URL}/users/login`,
            {
            ...inputValue,
            },
            { withCredentials: true }
        );
        const { success, message, token } = data;
        if (success) {
            setCookie('token', token, { path: '/' }); // Set the token cookie
            handleSuccess(message);
            setTimeout(() => {
            navigate("/");
            }, 1000);
        } else {
            handleError(message);
        }
        } catch (error) {
        console.log(error);
        }
        setInputValue({
        ...inputValue,
        email: "",
        password: "",
        });
    };

    const isLoggedIn = !!cookies.token;
  
    return (
        <div className="login-container">
          <h1>Login Account</h1>
          <hr />
          {isLoggedIn ? (
            <div>
                <p>You are logged in.</p>
                <button className='login-browse-button'>
                    <Link to="/movies" className='browse-button'>Browse Movies</Link>
                </button>
            </div>
          ) : (
          <form onSubmit={handleSubmit}>
            <div className="login-fields">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleOnChange}
                className="login-input"
              />
            </div>
            <div className="login-fields">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={handleOnChange}
                className="login-input"
              />
            </div>
            <button type="submit" className="login-button">Submit</button>
            <span>
              Don&apos;t have an account? <Link to={"/register"}>Signup</Link>
            </span>
          </form>
          )}
          <ToastContainer className='toast-message'/>
        </div>
    );
};

export default Login;