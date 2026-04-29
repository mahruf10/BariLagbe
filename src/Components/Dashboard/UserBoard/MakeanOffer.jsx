import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { AuthContext } from '../../Authentication/AuthProvider';
import  { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
const MakeanOffer = () => {
    const data=useLoaderData()
    const axiosPublic=useAxiosPublic()
    const {user}=useContext(AuthContext)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors},
      } = useForm();

      const onSubmit=async(formData)=>{
        const offerdData={
            ...formData,
            offer:parseFloat(formData.offer),
            status:'pending',
            propertyId:data._id,
            image:data.image
        }
        
     const res=await axiosPublic.post('/offerdlist',offerdData)
    
     if(res.data.insertedId){
        toast.success("your request successfully saved");
        reset()
     }


      }
    return (
        <div className="flex justify-center items-center min-h-screen">
             <Toaster/>
            <div className="card bg-base-100 w-full max-w-2xl shadow-2xl">
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label className="label"> Title</label>
                            <input {...register("title")} value={data.title} readOnly type="text" className="input input-bordered w-full" placeholder="Email" />
                        </div>

                        <div>
                            <label className="label"> Location</label>
                            <input {...register("location")} value={data.location} readOnly type="text" className="input input-bordered w-full" placeholder="locaion" />
                        </div>

                        <div>
                            <label className="label">Agent</label>
                            <input {...register("agentName")} value={data.agentName} readOnly type="text" className="input input-bordered w-full" placeholder="Password" />
                        </div>

                        <div>
                            <label className="label">Offer</label>
                            <input {...register("offer",{
                                required:"price is required",
                            min:{
                                value:data.priceRange.min,
                                message:'you have to type between max to min amount'
                            },
                         max:{
                            value:data.priceRange.max,
                             message:'you have to type between max to min amount'
                         }

                            })} type="number" className="input input-bordered w-full" placeholder="Enter your offered amount" />
                       {errors.offer && <p className='text-red-500'>{errors.offer.message}</p>}
                        </div>
                             
                        <div>
                            <label className="label">Your Email</label>
                            <input {...register("userEmail")} value={data.userEmail} readOnly type="text" className="input input-bordered w-full" placeholder="Readonly" />
                        </div>

                        <div>
                            <label className="label">Your Name</label>
                            <input {...register("userName")} value={user?.displayName} readOnly type="text" className="input input-bordered w-full" placeholder="Password" />
                        </div>

                        <div>
                            <label className="label">Buying Date</label>
                            <input {...register("date")}  type="text" className="input input-bordered w-full" placeholder="Type the actual buying date" />
                        </div>

                        <div className="md:col-span-2">
                            <button className="btn btn-neutral w-full mt-4">Offer</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default MakeanOffer;