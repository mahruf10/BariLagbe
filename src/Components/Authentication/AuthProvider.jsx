import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../../../firebase.config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import useAxiosPublic from '../Hooks/useAxiosPublic';
 export const AuthContext=createContext(null)
const AuthProvider = ({children}) => {
    const [loading,setLoading]=useState(true)
    const [user,setUser]=useState(null)
    const axiosPublic=useAxiosPublic()
    const signUp=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const signIn=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logOut=()=>{
        return signOut(auth)
    }
    const updateUserProfile=(name,photo)=>{
        
     return updateProfile(auth.currentUser,{
        displayName:name,
        photoURL:photo
     })
    }
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            if(currentUser){
            const userInfo={email:currentUser?.email}
            
            axiosPublic.post('/jwt',userInfo)
            .then(res=>{
                if(res.data.token){
                    localStorage.setItem('access-token',res.data.token)
                }
            })
            .finally( ()=>{
               setLoading(false)
            })
            }
            else{
                localStorage.removeItem('access-token')
                setLoading(false)
            }
            
        })
        return ()=>unsubscribe()
    },[axiosPublic])
    const authInfo={
        signIn,
        signUp,
        user,
        loading,
        logOut,
        updateUserProfile,
    }
    return (
       <AuthContext.Provider value={authInfo}>
             {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;