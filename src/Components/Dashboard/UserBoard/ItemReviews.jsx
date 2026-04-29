import React, { useContext } from 'react';
import {  useParams } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Authentication/AuthProvider';
import SectionTitle from '../../Shared/SectionTitle';

const ItemReviews = () => {
    const axiosSecure=useAxiosSecure()
    const {user}=useContext(AuthContext)
    const title=useParams()
    const {data:reviews=[]}=useQuery({
        queryKey:['reviews',title.title],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/review?title=${title.title}`)
            return res.data
        }
    })
    
    // const data=useLoaderData()
    // console.log(data)
   
    return (
        <div>
            <SectionTitle heading='review' subheading={' Drop your reviews'}></SectionTitle>
          <div className="overflow-x-auto w-full p-8">
                
     <table className="table">
       {/* head */}
       <thead>
         <tr>
           <th>#</th>
           
           <th>Reviewer Name</th>
           <th>Review Description</th>
           <th>Date</th>
         </tr>
       </thead>
       <tbody>
         {/* row 1 */}
         {
           reviews.map((item,index)=><tr className="bg-base-200">
           <th>{index+1}</th>
           
        
           <td>{item.name}</td>
           <td>{item.description}</td>
           <td>{item.date}</td>
          
         </tr>)
         }
     
       </tbody>
     </table>
   </div>
        </div>
    );
};

export default ItemReviews;