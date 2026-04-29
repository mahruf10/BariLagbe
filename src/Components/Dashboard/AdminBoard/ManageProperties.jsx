import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { SiVerizon } from "react-icons/si";
import { RxCross1 } from "react-icons/rx";
import Swal from 'sweetalert2';
const ManageProperties = () => {
    const axiosSecure=useAxiosSecure()
    const{data:agentItem=[],refetch}=useQuery({
        queryKey:['items'],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/property?verified=${false}`)
            return res.data
            
        }
    })

    const handleConfirm=async(id)=>{
      const res=await axiosSecure.patch(`/property/${id}`)
      if(res.data.modifiedCount > 0){
         Swal.fire({
                  title: "Property added to the main page!",
                  icon: "success",
                  draggable: true
                })
      }
      refetch()
    }
    const handleReject=(id)=>{
      axiosSecure.delete(`/property/${id}`)
      .then(res=>{
        if(res.data.deletedCount > 0){
          Swal.fire({
                  title: "Property has been rejected.",
                  icon: "success",
                  draggable: true
                })
        }
        refetch()
      })
    }

    return (
        <div>
          {
            agentItem.length ?  <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Title</th>
        <th>Location</th>
        <th>Agent </th>
        <th>Agent Email </th>
        <th> PriceRange </th>
        <th>Accept </th>
        <th>Reject </th>
      </tr>
    </thead>
    <tbody className='ml-4'>
      {/* row 1 */}
      {
        agentItem.map((item,index)=><tr>
        <th>{index+1}</th>
        <td>{item.title}</td>
        <td>{item.location}</td>
        <td>{item.agentName}</td>
        <td>{item.agentEmail}</td>
        <td>${item.priceRange.min} - ${item.priceRange.max}</td>
        <td><button onClick={()=>handleConfirm(item._id)} className='text-green-600  btn'><SiVerizon /></button></td>
        <td><button onClick={()=>handleReject(item._id)} className='text-red-600  btn'><RxCross1 /></button></td>
      </tr> )
      }
      
     
    </tbody>
  </table>
</div>:<p className='text-2xl text-center'>No latest item added yet</p>
          }
  
        </div>
    );
};

export default ManageProperties;