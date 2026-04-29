import axios from 'axios';
import React from 'react';
const axiosPublic=axios.create({
  baseURL:'https://e-state-server.vercel.app'
})
const useAxiosPublic = () => {
   return axiosPublic;
};

export default useAxiosPublic;