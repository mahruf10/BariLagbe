import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
const useAgent = () => {
       const {user}=useContext(AuthContext)
       const axiosSecure=useAxiosSecure()
       const {data:isAgent,isLoading}=useQuery({
           queryKey:['agent',user?.email],
           queryFn:async()=>{
               const res=await axiosSecure.get(`/user/agent/${user?.email}`)
               
               return res.data?.agent
           }
       })
       return [isAgent,isLoading]
};

export default useAgent;