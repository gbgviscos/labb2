import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../Context/UserContext';

function Login() {
    const { login, user } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const [sex, setSex] = useState('')
    const [firstname, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [reg, setReg] = useState(false)

    const handleLogin = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/users?username=${username}`);
            const userData = response.data[0];

            if (userData && userData.password === password) {
                login(userData);
            } else {
                console.error("Invalid username or password");
            }
        } catch (error) {
            console.error('Error logging in', error);
        }
    };

    const regForm = () => {
        if (reg === true) {
            setReg(false)
        } else {
            setReg(true)
        }
    }


    const registerUser = async () => {

        try {
            const response = await axios.get(`http://localhost:3001/users?username=${username}`);
            const userData = response.data[0];

            if (userData) {
                alert("Användarnamnet är taget")
            } else {
                if (username !== "" && password !== "" && firstname !== "" && lastname !== "" && email !== "") {
                
                    const userObject = {
                        "username": username,
                        "password": password,
                        "firstname": firstname,
                        "lastname": lastname,
                        "gender": sex,
                        "email": email,
                        "events": [],
                        "rights": "user",
                    };
            
                    const url = `http://localhost:3001/users`;
                    let config = {
                        method: 'post',
                        maxBodyLength: Infinity,
                        url: url,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: userObject
                    };
            
            
            
                    axios.request(config)
                        .then((response) => {
                            regForm(false)
                            setEmail('')
                            setLastname('')
                            setName('')
                            setSex('')
                        })
                        .catch((error) => {
                            alert(error);
                        });
                } else {
                    alert("Saknas data")
                }
            }
        } catch (error) {
            console.error('Ett fel uppstod', error);
        }

        
    };

    return (
        <div className='loginContainer'>
            {reg === false ? <>
                <label>Användarnamn</label>
                <input
                    className='loginInput'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Lösenord</label>
                <input
                    className='loginInput'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
                <button className='loginButton' onClick={handleLogin}>Submit</button>
                <button className='regButton' onClick={regForm}> Registrera dig </button> </>
                : // sätter en kommentar här bara för att visa gränsen för min if state
                <>
                    <label>Användarnamn</label>
                    <input
                        className='loginInput'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Förnamn</label>
                    <input
                        className='loginInput'
                        placeholder='Förnamn'
                        value={firstname}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label>Efternamn</label>
                    <input
                        className='loginInput'
                        placeholder='Efternamn'
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                    <label>Email</label>
                    <input
                        className='loginInput'
                        placeholder='email'
                        value={email}
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Kön</label>
                    <select
                        className='loginInput'
                        placeholder="Välj"
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                    >
                        <option value="Male">Man</option>
                        <option value="Female">Kvinna</option>
                        <option value="NonBinary">Ej Binär</option>
                        <option value="Secret">Vill ej uppge</option>
                    </select>
                    <label>Lösenord</label>
                    <input
                        className='loginInput'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />
                    <button className='loginButton' onClick={registerUser}>Registrera</button>
                    <button className='remove-button' onClick={regForm}> Avbryt </button>

                </>}
        </div >
    );
}

export default Login;
