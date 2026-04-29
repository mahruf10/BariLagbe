import React, { useContext } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Authentication/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';

const MyReviews = () => {
  const axiosSecure=useAxiosSecure()
  const{user}=useContext(AuthContext)
  const{data:reviewData=[],refetch,isLoading}=useQuery({
    queryKey:['review',user?.email],
    queryFn:async()=>{
     const res=await axiosSecure.get(`/review?email=${user.email}`)
     return res.data
    }
  })
  if(isLoading){
    return <p className='text-3xl text-center'>Wait a minutes</p>
  }
  const handleDelete=(id)=>{
  axiosSecure.delete(`/review/${id}`)
  .then(res=>{
    if(res.data.deletedCount > 0){
      toast.success('item delete successfully')
    }
    refetch()  
  })
  .catch(error=>{
    toast.error('somethings went wrong.please try again')
  })
  }
    return (
        <div>
            <div className="overflow-x-auto w-full p-8">
              <Toaster/>
    {
      reviewData.length ? <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Agent</th>
        <th>Review Time</th>
        <th>Review Description</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        reviewData.map((item,index)=><tr className="bg-base-200">
        <th>{index+1}</th>
        
        <td>{item.title}</td>
        <td>{item.agentName}</td>
        <td>{item.date}</td>
        <td>{item.description}</td>
        <td><button onClick={()=>handleDelete(item._id)}><FaTrashAlt className='text-red-500'></FaTrashAlt></button></td>
      </tr>)
      }
  
    </tbody>
  </table>
  :
  <p className='text-2xl text-center text-red-500'>There is no reviews item.Add some reviews</p>
    }
</div>
        </div>
    );
};

export default MyReviews;