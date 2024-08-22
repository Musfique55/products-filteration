import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../../firebase.config";

export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(false);
    const [loading,setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const register = (email,password) => {
        setLoading(false);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const login = (email,password) => {
        setLoading(false);
        return signInWithEmailAndPassword(auth,email,password);
    }

    const logout = () => {
        setLoading(false);
        return signOut(auth);
    }

    const google = () => {
        setLoading(false);
        return signInWithPopup(auth,googleProvider);
    }

    useEffect(() => {
       const unSubscribe =  onAuthStateChanged(auth,currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unSubscribe();
        }
    },[])
    
     const AuthInfo = {register,login,user,loading,logout,google};
     return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
     )
};

AuthProvider.propTypes = {
    children : PropTypes.node
}

export default AuthProvider;