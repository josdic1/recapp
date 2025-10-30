// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/api';
import { useUser } from '../providers';

function LoginPage() {
    const { setUser } = useUser();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(formData.name, formData.password);
            setUser(data.user);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed');
        }
    };

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={onChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={onChange}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;