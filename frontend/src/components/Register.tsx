import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import config from '../../config';
const Register = () => {
    const [credentials, setCredentials] = useState<LoginCredentials>({ email: '', password: '' });
    const navigate = useNavigate();
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
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
                <div>Register</div>
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
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
};

export default Register;