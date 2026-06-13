import React, { useContext } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../Authentication/AuthProvider';
import { GoCodeReview } from "react-icons/go";
import { BsBookmarkStarFill } from "react-icons/bs";

const PropertiesDetails = () => {
    const axiosSecure = useAxiosSecure();
    const data = useLoaderData();
    const { user } = useContext(AuthContext);

    const handlewishlist = async () => {
        const wishListinfo = {
            title: data.title,
            location: data.location,
            image: data.image,
            agentName: data.agentName,
            agentImg: data.agentImg,
            priceRange: data.priceRange,
            userEmail: user.email
        };
        const res = await axiosSecure.post('/wishlist', wishListinfo);
        if (res.data.insertedId) {
            toast.success('Your data has been added!');
        }
    };

    return (
        <div className='px-4 py-8 max-w-5xl mx-auto'>
            <Toaster />
            <div className="card lg:card-side bg-base-100 shadow-md border border-base-200">
                <figure className='w-full lg:w-1/2 max-h-72 lg:max-h-full'>
                    <img
                        className='w-full h-full object-cover'
                        src={data.image}
                        alt={data.title}
                    />
                </figure>
                <div className="card-body gap-4">
                    <h2 className="card-title text-xl sm:text-2xl">{data.title}</h2>

                    <div className='flex items-center gap-2'>
                        <img className='w-8 h-8 rounded-full object-cover' src={data.agentImg} alt={data.agentName} />
                        <p className='font-medium'>{data.agentName}</p>
                    </div>

                    <p className='text-base-content/70'>{data.location}</p>
                    <p className='font-semibold text-green-500'>
                        Price: ${data.priceRange.min} - ${data.priceRange.max}
                    </p>

                    <div className="card-actions flex-wrap gap-3 justify-start mt-2">
                        <Link to={`/addReview/${data._id}`}>
                            <button className="btn btn-sm sm:btn-md gap-2">
                                <GoCodeReview /> Add Review
                            </button>
                        </Link>
                        <button onClick={handlewishlist} className="btn btn-sm sm:btn-md gap-2">
                            <BsBookmarkStarFill /> Wishlist
                        </button>
                        <Link to={`/review/${data.title}`}>
                            <button className="btn btn-sm sm:btn-md bg-green-500 text-black border-0">
                                Reviews
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertiesDetails;