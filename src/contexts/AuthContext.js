import React, {useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {auth} from '../firebase.js'

const AuthContext = React.createContext();

export const useAuth = ()=> useContext(AuthContext)

export const AuthProvider = ({children}) =>{
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    // const history = useHistory();

    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            setUser(user)
            setLoading(false)
            if (user){
                // history.push('/chats')
            }
        })
    }, [user])

    const value = {user}

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}