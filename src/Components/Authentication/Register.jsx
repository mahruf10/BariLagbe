import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AuthContext } from "./AuthProvider";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
const img_hosting_key=import.meta.env.VITE_IMG_UPLOAD_API
const img_hosting_api=`https://api.imgbb.com/1/upload?key=${img_hosting_key}`
const  Register=()=>{
    const axiosPublic=useAxiosPublic()
    const{signUp,updateUserProfile}=useContext(AuthContext)
    
    
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors},
  } = useForm();



  const onSubmit = async(data) => {

   const imgFile={image:data.image[0]}
   const res=await axiosPublic.post(img_hosting_api,imgFile,{
    headers:{
        'content-type':'multipart/form-data'
    }
   })
   
    const imgUrl=res.data.data.display_url
   

   signUp(data.email,data.password)
   .then(res=>{
   
    const userInfo={
        userName:data.name,
        image:imgUrl,
        userEmail:data.email,
        role:'user',
        terms:data.terms
    }
    axiosPublic.post('/users',userInfo)
        .then(res=>{
     if(res.data.insertedId){
   Swal.fire({
  title: "SignUp successfully done!",
  icon: "success",
  draggable: true
})
    }
    })
    .catch(error=>{
    
    })
    updateUserProfile(data.name,imgUrl)
    .then(()=>{
      reset()
    })
    
    .catch(error=>{
        toast.error(`${error.message}`);
    })
   
   })
   .catch(error=>{
    toast.error(`${error.message}`);
   })
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Toaster/>
      <div className="w-full max-w-md border border-2 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
                pattern: {
                  value:/^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                 message:"Must include at least one uppercase letter and one special character",
                },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* image */}
           <label className="flex flex-col items-center gap-1 border-2 border-dashed border-gray-200 rounded-xl p-6 cursor-pointer">
          <span className="text-sm text-gray-500"> upload Your  images</span>
          <input
           {...register("image")}
            type="file" accept="image/*"
          />
        </label>
   
          {/* Terms */}
          <div className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              {...register("terms", {
                required: "You must accept the terms",
              })}
            />
            <span>I agree to the terms and conditions</span>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm">{errors.terms.message}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
           
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 disabled:opacity-50"
          >
            SignUp
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
export default Register;