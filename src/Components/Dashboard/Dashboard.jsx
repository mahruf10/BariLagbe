import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useAgent from '../Hooks/useAgent';
import useAdmin from '../Hooks/useAdmin';
import { ImProfile } from "react-icons/im";
import { HiMiniClipboardDocumentList } from "react-icons/hi2";
import { AiOutlinePropertySafety } from "react-icons/ai";
import { FaComment, FaBars, FaTimes } from "react-icons/fa";
import { IoBagAddSharp } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi";

const Dashboard = () => {
    const [isAgent] = useAgent();
    const [isAdmin, isLoading] = useAdmin();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (isLoading) return <p>please wait..</p>;

    const close = () => setSidebarOpen(false);
    const navClass = 'flex items-center gap-2 hover:text-white/70 transition-colors';

    return (
        <div className='flex'>

            {/* Mobile top bar */}
            <div className='md:hidden fixed top-0 left-0 right-0 z-50 bg-cyan-700 flex items-center px-4 py-3 text-white'>
                <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                    {sidebarOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                </button>
                <span className='ml-4 font-bold uppercase tracking-wide'>Dashboard</span>
            </div>

            {/* Overlay */}
            {sidebarOpen && (
                <div className='md:hidden fixed inset-0 bg-black/50 z-40' onClick={close} />
            )}

            {/* Sidebar */}
            <div className={`
                fixed md:static z-50 top-0 left-0 min-h-screen w-64 bg-cyan-700 p-8 flex flex-col gap-4 text-white
                transition-transform duration-300
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0
            `}>
                {!isAgent && !isAdmin && <>
                    <NavLink onClick={close} className={navClass} to='/dashboard/myprofile'><ImProfile /> MY PROFILE</NavLink>
                    <NavLink onClick={close} className={navClass} to='/dashboard/wishlist'><HiMiniClipboardDocumentList /> WISHLIST</NavLink>
                    <NavLink onClick={close} className={navClass} to='/dashboard/propertybought'><AiOutlinePropertySafety /> PROPERTY BOUGHT</NavLink>
                    <NavLink onClick={close} className={navClass} to='/dashboard/myreview'><FaComment /> MY REVIEWS</NavLink>
                </>}

                {isAgent && <>
                    <NavLink onClick={close} className={navClass} to='/dashboard/agentProfile'><ImProfile /> MY PROFILE</NavLink>
                    <NavLink onClick={close} className={navClass} to='/dashboard/addProperties'><IoBagAddSharp /> ADD PROPERTY</NavLink>
                    <NavLink onClick={close} className={navClass} to='/dashboard/myAddedProperties'>MY ADDED PROPERTIES</NavLink>
                    <NavLink onClick={close} className={navClass} to='/dashboard/mySoldProperties'>MY SOLD PROPERTIES</NavLink>
                    <NavLink onClick={close} className={navClass} to='/dashboard/requestedProperties'>REQUESTED PROPERTIES</NavLink>
                </>}

                {isAdmin && <>
                    <NavLink onClick={close} className={navClass} to='/dashboard/addminProfile'><ImProfile /> MY PROFILE</NavLink>
                    <NavLink onClick={close} className={navClass} to='/dashboard/manageProperties'>MANAGE PROPERTIES</NavLink>
                    <NavLink onClick={close} className={navClass} to='/dashboard/manageUsers'><HiOutlineUsers /> MANAGE USERS</NavLink>
                    <NavLink onClick={close} className={navClass} to='/dashboard/manageReviews'>MANAGE REVIEWS</NavLink>
                </>}
            </div>

            {/* Main content */}
            <div className='flex-1 p-4 mt-12 md:mt-0'>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;