
import React, { useContext } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Authentication/AuthProvider';
import { SiVerizon } from "react-icons/si";
import { RxCross1 } from "react-icons/rx";
import toast, { Toaster } from 'react-hot-toast';
const OfferedProperties = () => {
   const axiosSecure=useAxiosSecure()
    const {user}=useContext(AuthContext)
    const {data: reqItem=[],refetch}=useQuery({
        queryKey:['offeredItem',user?.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/offers?name=${user.displayName}&status=pending`)
            return res.data
        }
    })
    const handleConfirm=async(id)=>{
     const res=await axiosSecure.patch(`/offers/${id}`)
     if(res.data.modifiedCount > 0){
      toast.success('confirmed offer')
     }
     refetch()
    }
    const handleReject=(id)=>{
     axiosSecure.patch(`/rejectOffer/${id}`)
     .then(res=>{
       if(res.data.modifiedCount > 0){
      toast.success('Offer has been rejected')
     }
     refetch()
    })
     
    }
    return (
        <div>
          <Toaster/>
          {
            reqItem.length ?      <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Title</th>
        <th>Location</th>
        <th>Buyer Email </th>
        <th>Buyer Name </th>
        <th>Offered Price </th>
        <th>Accept </th>
        <th>Reject </th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        reqItem.map((item,index)=><tr>
        <th>{index+1}</th>
        <td>{item.title}</td>
        <td>{item.location}</td>
        <td>{item.userEmail}</td>
        <td>{item.userName}</td>
        <td>{item.offer}</td>
        <td><button onClick={()=>handleConfirm(item._id)} className='text-green-600  btn'><SiVerizon /></button></td>
        <td><button onClick={()=>handleReject(item._id)} className='text-red-600  btn'><RxCross1 /></button></td>
      </tr> )
      }
      
     
    </tbody>
  </table>
</div> :<p className='text-2xl text-center'>There is no offered Item</p>
          }
       
        </div>
    );
};

export default OfferedProperties;