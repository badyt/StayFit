import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import useLoginStore from '../../stores/loginstore';
import { toast } from 'react-toastify';
import { Typography } from '@mui/material';
import './Login.css';

//Login 
const Login = () => {
    const { setUser, login } = useLoginStore();
    const [credentials, setCredentials] = useState<LoginCredentials>({ email: '', password: '' });
    const navigate = useNavigate();
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const accesstoken = await login(credentials);
            if (accesstoken) {
                setUser({
                    accessToken: accesstoken
                });
                navigate('/');
                // Store tokens in local storage
                localStorage.setItem('accessToken', accesstoken);
            }
            else {
                toast.error("Login Failed!")
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("An unknown error occurred.");
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            [name]: value
        }));
    };

    return (
        <div className="login-wrapper">
            <form onSubmit={handleSubmit}>
                <Typography
                    fontSize={"28px"}
                    fontFamily={"serif"}
                    fontWeight={"bold"}>
                    Log in
                </Typography>
                <div className="login-input">
                    <input
                        value={credentials.email}
                        onChange={handleChange}
                        type="text"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                    />
                    <input
                        value={credentials.password}
                        onChange={handleChange}
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        placeholder="Password"
                    />
                    <button type="submit">LOGIN</button>
                </div>
            </form>
        </div>
    );
};

export default Login;