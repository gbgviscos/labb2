import React, {createContext, useState} from "react";

const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState({
        username: '',
        password:'',
        firstname: '',
        lastname: '',
        gender: '',
        email: '',
        rights: '',
        events:'',
        isLoggedIn: 'false',
    })

    const login = (userData) => {
        setUser({
            ...user,
            ...userData,
            isLoggedIn: true
        })
    }

    const logout = () => {
        setUser({
            username: '',
            password:'',
            firstname: '',
            lastname: '',
            gender: '',
            email: '',
            rights: '',
            isLoggedIn: 'false',
        })
    }


  return (
    <UserContext.Provider value={{ user, login, logout}} >
        {children}
    </UserContext.Provider>
     )
}

export default UserContext