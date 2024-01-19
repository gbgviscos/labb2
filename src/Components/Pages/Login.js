import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../Context/UserContext';

function Login() {
    const { login, user } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/users?username=${username}`);
            const userData = response.data[0];

            if (userData && userData.password === password) {
                login(userData);
                console.log(user);
            } else {
                console.error("Invalid username or password");
            }
        } catch (error) {
            console.error('Error logging in', error);
        }
    };

    return (
        <div>
            <input
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
            />
            <button onClick={handleLogin}>Submit</button>
        </div>
    );
}

export default Login;
