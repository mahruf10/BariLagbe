import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Authentication/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
const img_hosting_key=import.meta.env.VITE_IMG_UPLOAD_API
const img_hosting_api=`https://api.imgbb.com/1/upload?key=${img_hosting_key}`
const EditProperty = () => {
    const axiosSecure=useAxiosSecure()
    const axiosPublic=useAxiosPublic()
    const data=useLoaderData()
    const{user}=useContext(AuthContext)
    const inp = "w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-violet-400 transition-colors";
     const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
      } = useForm();
      const onSubmit=async(updateData)=>{
        const imgFile={image:updateData.image[0]}
    const res=await axiosPublic.post(img_hosting_api,imgFile,{
        headers:{
            'content-type':'multipart/form-data'

        }
    })
    if(res.data.success){
const image=res.data.data.display_url;
const updatedData={
     title:updateData.title,
         location:updateData.location,
      priceRange:{
        max:parseFloat(updateData.maxPrice),
        min:parseFloat(updateData.minPrice),
      },
      image:image,
      postAt:new Date(),
      agentName: user?.displayName,
      agentEmail: user?.email,
      agentImg:user?.photoURL,
      verified:data.verified
   
}
       axiosSecure.patch(`/updateProperty/${data._id}`,updatedData)
      .then(res=>{
        if(res.data.modifiedCount > 0){
          toast.success('modified data')
        }
        reset()
      })
      }
    }
    return (
        <div>
            <Toaster/>
             <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto p-6 rounded-2xl border border-gray-200 space-y-4"
      >
        <h2 className="text-base font-medium">Edit property</h2>

        {/* Title */}
        <div>
          <input
            {...register("title", {
              required: "Property title is required",
              minLength: { value: 3, message: "At least 3 characters" },
            })}
            className={inp}
            defaultValue={data.title}
            type="text"
            placeholder="Property title"
          />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
        </div>

        {/* Location */}
        <div>
          <input
            {...register("location", {
              required: "Location is required",
            })}
            className={inp}
            type="text"
            defaultValue={data.location}
            placeholder="Property location"
          />
          {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location.message}</p>}
        </div>

        {/* Image upload */}
        <label className="flex flex-col items-center gap-1 border-2 border-dashed border-gray-200 rounded-xl p-6 cursor-pointer">
          <span className="text-xl text-gray-500"> upload new or prev images</span>
          <input
           {...register("image")}
            type="file" accept="image/*"
            required
          />
        </label>

        {/* Agent info (readonly) */}
        <div className="grid grid-cols-2 gap-3">
          <input className={inp + " bg-gray-50 text-gray-400"} value={user?.displayName ?? "Agent name"} readOnly />
          <input className={inp + " bg-gray-50 text-gray-400"} value={user?.email ?? "Agent email"} readOnly />
        </div>

        {/* Price range */}
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <input
              {...register("minPrice", {
                required: "Min price is required",
                min: { value: 0, message: "Cannot be negative" },
              })}
              className={inp}
              type="number"
              placeholder="Min price (BDT)"
              defaultValue={data.priceRange.min}
            />
            {errors.minPrice && <p className="text-xs text-red-500 mt-1">{errors.minPrice.message}</p>}
          </div>
          <div>
            <input
              {...register("maxPrice", {
                required: "Max price is required",
                min: { value: 0, message: "Cannot be negative" },
               
              })}
              className={inp}
              type="number"
              placeholder="Max price (BDT)"
              defaultValue={data.priceRange.max}
            />
            {errors.maxPrice && <p className="text-xs text-red-500 mt-1">{errors.maxPrice.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors"
        >
          {isSubmitting ? "updating..." : "Update property"}
        </button>
      </form>
        </div>
    );
};

export default EditProperty;