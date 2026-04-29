import axios from 'axios';
import React from 'react';
const axiosPublic=axios.create({
  baseURL:'https://e-state-server-jh3i81lpb-md-mahrufs-projects.vercel.app'
})
const useAxiosPublic = () => {
   return axiosPublic;
};

export default useAxiosPublic;