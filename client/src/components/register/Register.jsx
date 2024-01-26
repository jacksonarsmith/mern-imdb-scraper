import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import './register.css';

const Register = () => {
        const navigate = useNavigate();
        const [inputValue, setInputValue] = useState({
            email: "",
            password: "",
            confirmPassword: "", 
        });
        const { email, password, confirmPassword } = inputValue; 
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

        const handleSuccess = (msg) => {
                toast.success(msg, {
                        position: "bottom-right",
                        icon: false,
                        closeButton: false,
                });
        };
            
        const handleSubmit = async (e) => {
                e.preventDefault();
                // Check if password and confirm password match
                if (password !== confirmPassword) {
                    handleError('Passwords do not match');
                    return;
                }
                try {
                    const { data } = await axios.post(
                        `${import.meta.env.VITE_PROD_URL}/users/register`,
                        {
                            email,
                            password,
                            confirmPassword,
                        },
                        { 
                            withCredentials: true,
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    const { success, message } = data;
                    if (success) {
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
                    confirmPassword: "",
                });
        };

        return (
                <div className="register-container">
                    <h1>Register Account</h1>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <div className='register-fields'>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Enter your email"
                                onChange={handleOnChange}
                                className="register-input"
                            />
                        </div>
                        <div className='register-fields'>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Enter your password"
                                onChange={handleOnChange}
                                className="register-input"
                            />
                        </div>
                        <div className='register-fields'>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                placeholder="Confirm your password"
                                onChange={handleOnChange}
                                className="register-input"
                            />
                        </div>
                        <button type="submit" className="register-button">Submit</button>
                        <span>
                            Already have an account? <Link to={"/login"}>Login</Link>
                        </span>
                    </form>
                    <ToastContainer className='toast-message'/>
                </div>
        );
}

export default Register