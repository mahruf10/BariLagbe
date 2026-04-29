import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useAgent from '../Hooks/useAgent';
import useAdmin from '../Hooks/useAdmin';
import { ImProfile } from "react-icons/im";
import { HiMiniClipboardDocumentList } from "react-icons/hi2";
import { AiOutlinePropertySafety } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { IoBagAddSharp } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi";
const Dashboard = () => {
    const [isAgent]=useAgent()
    const[isAdmin,isLoading]=useAdmin()
    if(isLoading){
        return <p>please wait..</p>
    }
    // const isAdmin=true
    // const isAgent=false
    return (
        <div className='flex'>
            <div className='w-64 bg-cyan-700 p-8 min-h-screen flex flex-col gap-4'>
                {
                    !isAgent && !isAdmin && <>
            <NavLink className={'flex items-center gap-2'} to='/dashboard/myprofile'><ImProfile />MY PROFILE</NavLink>
                <NavLink className={'flex items-center gap-2'} to='/dashboard/wishlist'><HiMiniClipboardDocumentList />WISHLIST</NavLink>
                <NavLink className={'flex items-center gap-2'} to='/dashboard/propertybought'><AiOutlinePropertySafety />PROPERTY BOUGHT</NavLink>
                <NavLink className={'flex items-center gap-2'} to='/dashboard/myreview'><FaComment />MY REVIEWS</NavLink>
                
                    </>
                }
                
                
                {
                    isAgent &&  <>
                    <NavLink className={'flex items-center gap-2'} to='/dashboard/agentProfile'><ImProfile />MY PROFILE</NavLink>
                <NavLink className={'flex items-center gap-2'} to='/dashboard/addProperties'><IoBagAddSharp />ADD PROPERTY</NavLink>
                <NavLink to='/dashboard/myAddedProperties'>MY ADDED PROPERTIES</NavLink>
                <NavLink to='/dashboard/mySoldProperties'>MY SOLD PROPERTIES</NavLink>
                <NavLink  to='/dashboard/requestedProperties'>REQUESTED PROPERTIES</NavLink>
                    </>
                }

                {
                    isAdmin && <>
                     <NavLink className={'flex items-center gap-2'} to='/dashboard/addminProfile'><ImProfile />MY PROFILE</NavLink>
                <NavLink to='/dashboard/manageProperties'>MANAGE PROPERTIES</NavLink>
                <NavLink className={'flex items-center gap-2'} to='/dashboard/manageUsers'><HiOutlineUsers />MANAGE USERS </NavLink>
                <NavLink to='/dashboard/manageReviews'>MANAGE REVIEWS</NavLink>
                    </>
                }
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;