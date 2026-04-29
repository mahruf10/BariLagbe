import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../Authentication/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MySoldProperties = () => {
  const {user}=useContext(AuthContext)
  const axiosSecure=useAxiosSecure()
  const{data:soldData}=useQuery({
    queryKey:['soldData',user?.email],
    queryFn:async()=>{
      const res=await axiosSecure.get(`/payments?name=${user.displayName}`)
      return res.data
    }
  })
  
    return (
        <div>
           {
            soldData &&  <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Title</th>
        <th>Location</th>
        <th>Buyer Email </th>
        <th>Buyer Name </th>
        <th>Sold Price </th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        soldData.map((item,index)=><tr>
        <th>{index + 1}</th>
        <td>{item?.title}</td>
        <td>{item?.location}</td>
        <td>{item.email}</td>
        <td>{item?.name}</td>
        <td>{item.price}</td>
      </tr>)
      }
    
    </tbody>
  </table>
</div>
           }
        </div>
    );
};

export default MySoldProperties;