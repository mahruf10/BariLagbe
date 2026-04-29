import React from 'react';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
const AllProperties = () => {
   const axiosPublic=useAxiosPublic()
  const {data:property=[],isLoading}=useQuery({
    queryKey:['property'],
    queryFn:async()=>{
      const res=await axiosPublic.get(`/property?verified=${true}`)
      return res.data
    }
    
  }) 
  if (isLoading) return <p>Loading...</p>;
 
    return (
        <div className='grid md:grid-cols-3 lg:grid-cols-4 space-y-4'>
            {
                property.map(item=> <div className="card bg-base-100 w-70  shadow-sm">
  <figure className="h-48 overflow-hidden">
    <img
      src={item.image}
        className="w-full h-full object-cover"
       />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{item.title}</h2>
    <p>{item.location}</p>
    <span>PriceRange: ${item.priceRange.min}-${item.priceRange.max}</span>
    <small className='flex items-center gap-2'><img className='w-7.5 rounded-full' src={item.agentImg} />{item.agentName} {item.verified ? <RiVerifiedBadgeFill className='text-blue-500'/> :''} </small>
    
    <div className="card-actions justify-end">
     <Link to={`/details/${item._id}`}><button className="btn btn-primary">Details</button> </Link> 
    </div>
  </div>
</div>)
            }
        </div>
    );
};

export default AllProperties;