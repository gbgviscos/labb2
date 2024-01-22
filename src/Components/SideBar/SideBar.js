import React, { useContext } from 'react';
import UserContext from '../Context/UserContext'
import '../../global.css'
import toast from 'react-hot-toast';


export const SideBar = ({setActivetab}) => {
    const {user, logout} = useContext(UserContext)

    const logOutFunc = () => {
        toast.success("Utloggad!", {
            position:"top-center"
        })
        logout()
        setActivetab("Home")
    }

    return (
        <div className='sidebarContainer'>
            <p className='navHeader'>Navigation</p>
            <ul className='sidebarNav'>
                <li className='navItem' onClick={() => setActivetab("Home")}>
                🏡 Hem 
                </li>
                <li className='navItem' onClick={() => setActivetab("About")}>
                🤔 Om oss 
                </li>
                {user.username === "" ? 
                <li className='navItem' onClick={() => setActivetab("Login")}>✔ Login </li>
                : 
                <div>
                    <li className='navItem' onClick={() => setActivetab("Events")}>📆 Evenemang  </li>
                    <li className='navItem' onClick={() => setActivetab("Profile")}>👩‍🏫 Profil  </li>
                    <li className='navItem' onClick={() => logOutFunc()}>❌ Logga Ut </li>
                </div>
                }
            </ul>
        </div>
    );
}
