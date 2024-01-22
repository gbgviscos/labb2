import React, { useState, useContext } from 'react';
import UserContext from '../Context/UserContext';
import toast from 'react-hot-toast';

function Profile() {

  const { user} = useContext(UserContext)
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('*****');
  const [email, setEmail] = useState(user.email)
  const [sex, setSex] = useState(user.gender)
  const [firstname, setName] = useState(user.firstname)
  const [lastname, setLastname] = useState(user.lastname)

  const onSave = () => {
    toast.error("Denna funktionen är inte implementerad")
    setUsername(user.username)// för att tabort ett lint problem
  }


  return (
    <>
      <div className='loginContainer'>
        <label>Användarnamn</label>
        <input
          className='loginInput'
          placeholder='Username'
          value={username}
          disabled='true'
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
        <button className='loginButton' onClick={onSave}>Spara ändringar</button>
      </div >
    </>
  );
}

export default Profile;
