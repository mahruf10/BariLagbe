import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "./AuthProvider";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

 const Login=() =>{
  const location=useLocation()
  
  const from=location?.state?.pathname || '/'
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm();
const {signIn}=useContext(AuthContext)
  const onSubmit = (data) => {
    signIn(data.email,data.password)
    .then(res=>{
        
        Swal.fire({
          title: "login successfully done!",
          icon: "success",
          draggable: true
        })
        navigate(from)
    })
    .catch(error=>{
        toast.error(`${error.message}`);
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
        <Toaster/>
      <div className="w-full max-w-md border border-2 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
               
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
            
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("remember")} />
              Remember me
            </label>
            <a href="#" className="text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
        
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 disabled:opacity-50"
          >
           Login
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
export default Login;