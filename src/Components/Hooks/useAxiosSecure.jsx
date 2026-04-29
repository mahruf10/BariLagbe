import axios from 'axios';

import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../Authentication/AuthProvider';
import { useNavigate } from 'react-router-dom';
const axiosSecure=axios.create({
    baseURL:'https://e-state-server.vercel.app'
})
const useAxiosSecure = () => {
    const {logOut}=useContext(AuthContext)
    const navigate=useNavigate()
    useEffect(()=>{
   const requestInceptors= axiosSecure.interceptors.request.use(function(config){
     const token=localStorage.getItem('access-token')
     
     config.headers.authorization=token
        return config
    },function (error){
        return Promise.reject(error)
    })

    const responseInceptors=axiosSecure.interceptors.response.use((response)=>response,
   (error)=>{
    const status=error?.response?.status
    if(status ===401 || status ===403){
  logOut()
  navigate('/login')
    }
    return Promise.reject(error)
   }
)

return ()=>{
    axiosSecure.interceptors.request.eject(requestInceptors)
    axiosSecure.interceptors.response.eject(responseInceptors)
}

    },[logOut,navigate])
   
 return axiosSecure
};

export default useAxiosSecure;