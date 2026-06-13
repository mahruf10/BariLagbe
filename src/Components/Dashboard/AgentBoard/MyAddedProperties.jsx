import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Authentication/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import toast, { Toaster } from 'react-hot-toast';

const MyAddedProperties = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: myProperties = [], isLoading, refetch } = useQuery({
        queryKey: ['properties', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/property?email=${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <p>Loading.....</p>;

    const handleDelete = (id) => {
        axiosSecure.delete(`/property/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    toast.success('Deleted property successfully..');
                    refetch();
                }
            });
    };

    if (!myProperties.length) return (
        <p className='text-2xl sm:text-3xl text-center mt-20'>No items added yet...</p>
    );

    return (
        <div className='px-4 py-6 max-w-6xl mx-auto'>
            <Toaster />
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {myProperties.map(item =>
                    <div key={item._id} className="card bg-base-100 w-full shadow-sm border border-base-200">
                        <figure className="h-48 overflow-hidden">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-base sm:text-lg">{item.title}</h2>
                            <p className='text-base-content/70 text-sm'>{item.location}</p>
                            <span className='text-sm font-medium '>
                                ${item.priceRange.min} - ${item.priceRange.max}
                            </span>
                            <div className="badge badge-outline badge-accent">
                                {item?.verified
                                    ? <span className='text-green-600'>Verified</span>
                                    : <span className='text-red-400'>Pending</span>
                                }
                            </div>
                            <div className="card-actions justify-between mt-2">
                                <Link to={`/editProperty/${item._id}`}>
                                    <button className="btn btn-sm sm:btn-md text-yellow-600">
                                        <MdOutlineModeEdit />
                                    </button>
                                </Link>
                                <button onClick={() => handleDelete(item._id)} className="btn btn-sm sm:btn-md text-red-500">
                                    <RiDeleteBin5Line />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyAddedProperties;