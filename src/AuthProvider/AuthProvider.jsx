import { createContext } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.config";

export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
    const register = (email,password) => {
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const login = (email,password) => {
        return signInWithEmailAndPassword(auth,email,password);
    }
     const AuthInfo = {register,login};
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