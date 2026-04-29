import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Authentication/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';

const Wishlist = () => {
  const axiosSecure=useAxiosSecure()
  // const axiosPublic=useAxiosPublic()
  const{user}=useContext(AuthContext)
  const {data: wishlistData=[],refetch,isLoading}=useQuery({
    queryKey:['wishlist',user?.email],
    enabled:!!user?.email,
    queryFn:async()=>{
   const res=await axiosSecure.get(`/wishlist?email=${user?.email}`)
    
   return res.data
    }
  })
  const handleDelete=(id)=>{
   
    axiosSecure.delete(`/wishlist/${id}`)
    .then(res=>{
      if(res.data.deletedCount > 0 ){
   toast.success('your card has been removed')
        refetch()
      }
    })
     
  }
  if(isLoading){
  return <p>Please wait </p>
  }
  // const max=wishlistData.map(item=>item.priceRange.max)
  // console.log(max)
    
    return (
        <div className='p-8 grid md:grid-cols-3 gap-5'>
          <Toaster/>
         {
          wishlistData.map(item=>   <div className="card bg-base-100 w-70  shadow-sm">
              <figure className='h-48 overflow-hidden'>
                <img
                className='h-full w-full object-cover'
                  src={item.image}
                   />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <p>{item.location}</p>
                <span>Price:${item.priceRange?.min} - ${item.priceRange?.max}</span>
                {/* <small className='flex items-center gap-2'><img className='w-7.5 rounded-full' src={item.agent.image} />{item.agent.name} {item.agent.verified ? <RiVerifiedBadgeFill className='text-blue-500'/> :''} </small> */}
                
                <div className="card-actions justify-between">
                 <Link to={`/makeanoffer/${item._id}` }><button className="btn btn-primary">Make an offer</button> </Link> 
                 <button onClick={()=>handleDelete(item._id)} className="btn btn-primary">Remove</button> 
                </div>
              </div>
            </div>)
         }
        </div>
    );
};

export default Wishlist;