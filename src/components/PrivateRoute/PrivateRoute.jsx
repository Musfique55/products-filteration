import React, { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {loading,user} = useContext(AuthContext);
    const location = useLocation();
    if(loading){
        return <div className="flex justify-center"><span className="loading loading-bars loading-lg"></span></div>;
    }

    if(user){
        return children;
    }

    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

export default PrivateRoute;