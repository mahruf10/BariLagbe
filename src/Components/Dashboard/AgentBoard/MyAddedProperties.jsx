import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Authentication/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import toast, { Toaster } from 'react-hot-toast';
const MyAddedProperties = () => {
  const {user}=useContext(AuthContext)
  const axiosSecure=useAxiosSecure()
  const {data:myProperties=[],isLoading}=useQuery({
    queryKey:['properties',user?.email],
    queryFn:async()=>{
      const res=await axiosSecure.get(`/property?email=${user.email}`)
      return res.data
    }
  })
  if(isLoading){
    return <p>Loading.....</p>
  }
    const handleDelete=(id)=>{
      axiosSecure.delete(`/property/${id}`)
      .then(res=>{
        if(res.data.deletedCount > 0){
       toast.success('Deleted property successfully..')
        }
        
      })
    }
    return (
        <div >
          <Toaster/>
            {
              <div className='grid md:grid-cols-3 gap-4'>
     { myProperties.length ?  myProperties.map(item=> <div className="card bg-base-100   w-70 shadow-sm">
              <figure  className="h-48 overflow-hidden">
                <img
                  src={item.image}
                  className="w-full h-full object-cover"
                   />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <p>{item.location}</p>
                <span>Price: ${item.priceRange.min}-${item.priceRange.max}</span>
               <div className="badge badge-outline badge-accent"><span className='text-pink-300'>{item?.verified == false ? <p className='text-red-400'> pending</p>  : <p className='text-green-600'>verified</p>}</span></div>
                {/* <small className='flex items-center gap-2'><img className='w-7.5 rounded-full' src={item.agent.image} />{item.agent.name} {item.agent.verified ? <RiVerifiedBadgeFill className='text-blue-500'/> :''} </small> */}
                
                <div className="card-actions justify-between">
               <Link to={`/editProperty/${item._id}`}><button className="btn text-yellow-600"><MdOutlineModeEdit /></button></Link>  
                 <button onClick={()=>handleDelete(item._id)} className="btn text-red-500"><RiDeleteBin5Line /></button> 
                </div>
              </div>
            </div>)
            :
            <p className='text-3xl text-center'>No items added yet...</p>
          } 
            
          
              </div>
            
            }
        </div>
    );
};

export default MyAddedProperties;