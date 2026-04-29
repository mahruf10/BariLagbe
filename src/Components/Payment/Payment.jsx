import React, { useContext } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOut from './CheckOut';
import SectionTitle from '../Shared/SectionTitle';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Authentication/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const stripePromise=loadStripe(import.meta.env.VITE_STRIPE_KEY)
const Payment = () => {
    const axiosSecure=useAxiosSecure()
    // const[data,setData]=useState(null)
    const {user}=useContext(AuthContext)
    const {data,isLoading}=useQuery({
        queryKey:['offersData',user?.email],
        enabled:!!user.email,
        queryFn:async()=>{
        const res=await axiosSecure.get(`/offers?email=${user?.email}&status=Confirm`)
        return res.data
        }
    })
if(isLoading){
    return <p>please wait...</p>
}

    
    return (
        <div>
            <SectionTitle heading={'payment'} subheading={'make payment for your properties'}></SectionTitle>
            <Elements stripe={stripePromise}>
            <CheckOut data={data}></CheckOut>
            </Elements>
            
        </div>
    );
};

export default Payment;