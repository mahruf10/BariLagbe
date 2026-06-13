import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from '../Authentication/AuthProvider';
const Navbar = () => {
  const{logOut,user}=useContext(AuthContext)
  const handleLogout=()=>{
   logOut()
   .then(()=>{
  toast.success('User Logged Out.');
   })
  }
  const links=[
    <>
   <li> <NavLink to={'/'}>Home</NavLink> </li> 
      <li>
        
       <NavLink to={'/allProperties'}> <summary>All Properties</summary> </NavLink>   
      </li>
    {user && <li> <NavLink to={'/dashboard'}>Dashoard</NavLink></li>}  
{
  user ? <li onClick={handleLogout}><a>Logout</a></li> :<li> <NavLink to={'/login'}>Login</NavLink></li>  
}
   
      
    </>
  
  ]
    return (
        <div>
          <Toaster/>
            <div className="navbar bg-base-100 shadow-sm relative z-[9999]">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[9999] mt-3 w-52 p-2 shadow">
       {
        links
       }
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">BariLagbe</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {
      links
     }
    </ul>
  </div>
</div>
        </div>
    );
};

export default Navbar;