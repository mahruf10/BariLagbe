
import React, { useContext } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../Authentication/AuthProvider';
import { GoCodeReview } from "react-icons/go";
import { BsBookmarkStarFill } from "react-icons/bs";
const PropertiesDetails = () => {
const axiosSecure=useAxiosSecure()
  const data=useLoaderData()
  const {user}=useContext(AuthContext)
  
  const handlewishlist=async()=>{
    const wishListinfo={
      title:data.title,
      location:data.location,
      image:data.image,
      agentName:data.agentName,
      agentImg:data.agentImg,
      priceRange:data.priceRange,
      userEmail:user.email

    }
     
    
    const res=await axiosSecure.post('/wishlist',wishListinfo)
    if(res.data.insertedId){
      toast.success('Your data has been added!')
    }
  }
    return (
        <div>
           <Toaster/>
            <div className="card lg:card-side bg-base-100 shadow-sm w-300 p-20">
  <figure className='h-70 '>
    <img
    className='h-full w-full object-cover'
      src={data.image}
      alt="Album" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{data.title}</h2>
    <div className='flex gap-2'>
 <img className='w-7.5 rounded-full' src={data.agentImg}alt="" />
<h2>{data.agentName}</h2>
    </div>
    
   
    <p>{data.location}</p>
    <p>priceRange: ${data.priceRange.min}-${data.priceRange.max}</p>
    <div className="card-actions justify-evenly">
      <Link to={`/addReview/${data._id}`}><button className="btn "><GoCodeReview />Add a review</button></Link>  
   <button onClick={handlewishlist} className="btn "><BsBookmarkStarFill /></button>
     <Link to={`/review/${data.title}`}> <button  className="btn bg-green-500 text-black">Reviews</button></Link> 
    </div>
  </div>
</div>
        </div>
    );
};

export default PropertiesDetails;