// src/pages/TestPage.jsx
import { useState } from 'react';
import axios from 'axios';
import { useUser } from '../providers';

function TestPage() {
    const [message, setMessage] = useState('Click a button to test');
    const { login, logout } = useUser();

    const testHealthCheck = async () => {
        console.log('🧪 [TestPage] Health check button clicked');
        try {
            const response = await axios.get('/api/', {
                withCredentials: true
            });
            setMessage(`✅ Health Check: ${response.data.message}`);
        } catch (error) {
            setMessage(`❌ Error: ${error.message}`);
        }
    };

    const testLogin = async () => {
        console.log('🧪 [TestPage] Login button clicked - calling login("alex", "1111")');
        
        const result = await login('alex', '1111');
        
        if (result.success) {
            console.log('🧪 [TestPage] Login successful! User:', result.user);
            setMessage(`✅ Login Success! User: ${result.user.name}`);
        } else {
            console.log('🧪 [TestPage] Login failed:', result.error);
            setMessage(`❌ Login Error: ${result.error}`);
        }
    };

    const testCheckSession = async () => {
        console.log('🧪 [TestPage] Check session button clicked');
        try {
            const response = await axios.get('/api/check-session', {
                withCredentials: true
            });
            setMessage(`✅ You are logged in as: ${response.data.user.name}`);
        } catch (error) {
            setMessage(`❌ Not logged in: ${error.response?.data?.error || error.message}`);
        }
    };

    const testLogout = async () => {
        console.log('🧪 [TestPage] Logout button clicked - calling logout()');
        
        const result = await logout();
        
        if (result.success) {
            console.log('🧪 [TestPage] Logout successful!');
            setMessage(`✅ Logged out successfully`);
        } else {
            console.log('🧪 [TestPage] Logout failed:', result.error);
            setMessage(`❌ Logout Error: ${result.error}`);
        }
    };

    const testCategories = async () => {
    console.log('🧪 [TestPage] Testing categories endpoint...');
    try {
        const response = await axios.get('/api/categories', {
            withCredentials: true
        });
        console.log('✅ Categories:', response.data);
        setMessage(`✅ Found ${response.data.length} categories`);
    } catch (error) {
        console.error('❌ Error:', error);
        setMessage(`❌ Error: ${error.message}`);
    }
};

    return (
        <div>
            <h1>Connection Test</h1>
            
            <button onClick={testHealthCheck}>
                Test Health Check
            </button>
            
            <button onClick={testLogin}>
                Test Login (alex / 1111)
            </button>

            <button onClick={testCheckSession}>
                Check If Logged In
            </button>

            <button onClick={testLogout}>
                Logout
            </button>

            <button onClick={testCategories}>
    Test Categories
</button>
            
            <p style={{ marginTop: '20px', fontSize: '18px' }}>
                {message}
            </p>
        </div>
    );
}

export default TestPage;