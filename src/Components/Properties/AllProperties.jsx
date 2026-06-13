import React from 'react';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const AllProperties = () => {
    const axiosPublic = useAxiosPublic();
    const { data: property = [], isLoading } = useQuery({
        queryKey: ['property'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/property?verified=${true}`);
            return res.data;
        }
    });

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 py-8 max-w-7xl mx-auto'>
            {property.map(item =>
                <div key={item._id} className="card bg-base-100 w-full shadow-sm border border-base-200">
                    <figure className="h-48 overflow-hidden">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title text-base sm:text-lg">{item.title}</h2>
                        <p className='text-base-content/70 text-sm'>{item.location}</p>
                        <span className='text-sm font-medium'>
                            ${item.priceRange.min} - ${item.priceRange.max}
                        </span>
                        <small className='flex items-center gap-2'>
                            <img className='w-7 h-7 rounded-full object-cover' src={item.agentImg} alt={item.agentName} />
                            {item.agentName}
                            {item.verified && <RiVerifiedBadgeFill className='text-blue-500' />}
                        </small>
                        <div className="card-actions justify-end mt-2">
                            <Link to={`/details/${item._id}`}>
                                <button className="btn btn-primary btn-sm sm:btn-md">Details</button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllProperties;