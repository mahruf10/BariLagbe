import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Authentication/AuthProvider';

const SecretRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
   
    const location=useLocation()
   
    if(user){
   return children
    }
    if(loading){
        return <p>please wait...</p>
    }
    return (
       <Navigate to={'/login'} state={location}></Navigate>
    );
};

export default SecretRoute;