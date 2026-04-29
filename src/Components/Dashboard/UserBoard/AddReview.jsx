
import { useLoaderData } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import toast, { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../../Authentication/AuthProvider';

const AddReview = () => {
    const data=useLoaderData()
    const axiosPublic=useAxiosPublic()
    const {user}=useContext(AuthContext)
    const handlesubmit=(e)=>{
         e.preventDefault()
         const form=e.target
      const review=form.review.value
      const reviewInfo={
        title:data.title,
        name:user?.displayName,
        image:user?.photoURL,
        description:review,
        agentName:data.agentName,
        date:new Date()

      }
    
      axiosPublic.post('/review',reviewInfo)
      .then(res=>{
      
        if(res.data.insertedId){
           toast.success('Your data has been added!')
            form.reset()
        }
        else{
            toast.error("somethings went wrong.try again")
        }
      })
    }
    
    return (
        <div>
             <Toaster/>
    <div className="card bg-base-100 w-96 shadow-sm w-11/12 mx-auto p-5">
  <figure>
    <img
      src={data.image}
      alt="property" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{data.title}</h2>
  <form onSubmit={handlesubmit} className="fieldset">
  <legend className="fieldset-legend">Your Review</legend>
  <textarea name='review' className="textarea h-24" placeholder="Drop your review here"></textarea>
   <div className="card-actions justify-center">
      <button className="btn btn-primary">Review</button>
    </div>
</form>
   
  </div>
</div>
           
            
        </div>
    );
};

export default AddReview;