import React, { useContext } from 'react';
import SectionTitle from '../../Shared/SectionTitle';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Authentication/AuthProvider';
import { Link } from 'react-router-dom';

const PropertyBought = () => {
  const axiosSecure=useAxiosSecure()
  const {user}=useContext(AuthContext)
  const {data:boughtItem=[],isLoading}=useQuery({
    queryKey:['boughtItem',user?.email],
    queryFn:async()=>{
      const res=await axiosSecure.get(`/offers?email=${user.email}`)
      return res.data
    }
  })
 if(isLoading){
  return <p className='text-2xl text-center my-10'>Please wait few seconds</p>
 }
    return (
       <div>
        <SectionTitle heading='my bougth item'></SectionTitle>
        <div className='flex justify-end mb-5'>
          
         <Link to={'/payment'}>  <button className='btn bg-yellow-700'>Pay</button> </Link>   </div>  
        
            <div className="overflow-x-auto ml-8 md:size-220">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Img</th>
        <th>Title</th>
        <th>Agent</th>
        <th>Location</th>
        <th>off.amount</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
      boughtItem.map(item=> <tr>
       
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={item.image}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
          </div>
        </td>
        <td>
          {item.title}
          <br />
        
        </td>
        <td>{item.agentName}</td>
        <td>{item.location}</td>
        <td>${item.offer}</td>
       <td>
  {item.status === 'Confirm' 
    ? <p className="text-green-600">{item.status}</p> 
    : <p>{item.status}</p>
  }
</td>
        
      </tr>)
     }
    </tbody>
    
  </table>
</div>
        </div>
    );
};

export default PropertyBought;