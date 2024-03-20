import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';
import config from '../../../config';
const Register = () => {
    const [credentials, setCredentials] = useState<LoginCredentials>({ email: '', password: '' });
    const [confPass, setConfPass] = useState<string>('');// confirm password input
    const navigate = useNavigate();
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            if (checkCredentials()) {
                await sendRegisterReq();
            } else {
                toast.error("Either the email or password field is empty!")
            }

        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("An unknown error occurred.");
            }
        }
    };

    const checkCredentials: () => boolean | Error = () => {
        if ((credentials.email && credentials.password)) {
            if (credentials.password === confPass) return true
            else throw new Error("Password confirmation doesn't match");
        } else {
            return false;
        }
    }
    const sendRegisterReq = async () => {
        const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}/register`;
        const result = await (await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            }),
        })).json();
        if (!result.error) {
            toast.info(result.message);
            navigate('/');
        } else {
            toast.error(result.error);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            [name]: value
        }));
    };

    const handleConfPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfPass(e.currentTarget.value);
    }

    return (
        <div className="login-wrapper">
            <form onSubmit={handleSubmit}>
                <Typography
                    fontSize={"28px"}
                    fontFamily={"serif"}
                    fontWeight={"bold"}>
                    Register
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
                    <input
                        value={confPass}
                        onChange={handleConfPassChange}
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        placeholder="Confirm Password"
                    />
                    <button type="submit">Register</button>
                    <p className='ms-5'>Already have an account? <a href="/login">Login here</a></p>
                </div>
            </form>
        </div>
    );
};

export default Register;