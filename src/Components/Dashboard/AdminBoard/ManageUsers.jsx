import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from '@tanstack/react-query';
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdSupportAgent } from "react-icons/md";
import { BsPersonXFill } from "react-icons/bs";
import { RiDeleteBin6Fill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
const ManageUsers=()=>{
const axiosSecure=useAxiosSecure()
const {data:allusers=[],refetch}=useQuery({
    queryKey:['users'],
    queryFn:async()=>{
     const res=await axiosSecure.get('/users')
     return res.data
    }
})
const handleAdmin=(item)=>{
axiosSecure.patch(`/users/admin/${item._id}?role=admin`)
.then(res=>{
  if(res.data.modifiedCount > 0){
    toast.success(`${item.userName} is an admin now`)
  }
  refetch()
})

}
const handleAgent=(item)=>{
   axiosSecure.patch(`/users/admin/${item._id}?role=agent`) 
   .then(res=>{
    if(res.data.modifiedCount >0){
        toast.success(`${item.userName} is an agent now`)
    }
    refetch()
   })
   
}
const handleFraud=()=>{
    
}
const handleDelete=(id)=>{
    axiosSecure.delete(`/users/${id}`)
    .then(res=>{
        if(res.data.deletedCount > 0){
 toast.success('user successfully deleted')
        }
        refetch()
    })
    
}
    return (
        <div>
                       <div className="overflow-x-auto">
                       <Toaster/>
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>User Name</th>
        <th>User Email</th>
        <th>Make Admin </th>
        <th>Make Agent </th>
        <th> Mark As Fraud </th>
        <th>DeleteUser </th>
       
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        allusers.map((item,index)=><tr key={item._id} className="ml-4">
        <th>{index+1}</th>
        <td>{item.userName}</td>
        <td>{item.userEmail}</td>
        <td>{item?.role?.role==='admin' ? <span className="text-blue-500 font-semibold">Admin</span>: <><button onClick={()=>handleAdmin(item)} className="btn text-blue-500"><MdOutlineAdminPanelSettings /></button></>}</td>
        <td>{item?.role?.role==='agent' ?   <span className="text-orange-500 font-semibold">Agent</span>:<button onClick={()=>handleAgent(item)} className="btn text-orange-500"> <MdSupportAgent /></button>}</td>
        <td><button onClick={handleFraud} className='btn text-red-400'><BsPersonXFill /></button></td>
        <td><button onClick={()=>handleDelete(item._id)} className='text-red-600  btn'><RiDeleteBin6Fill /></button></td>
      </tr> )
      }
      
     
    </tbody>
  </table>
</div>
        </div>

    )
}
export default ManageUsers;