import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const LatestItem = () => {
  const axiosPublic = useAxiosPublic();
  const { data: properties = [] } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const res = await axiosPublic.get('/property');
      return res.data;
    }
  });

  const latestFour = properties
    .sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt))
    .slice(0, 4);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-5xl mx-auto px-4 py-8'>
      {latestFour.map(item =>
        <div key={item._id} className="card bg-base-100 image-full w-full shadow-sm">
          <figure>
            <img src={item.image} alt={item.location} className="w-full h-full object-cover" />
          </figure>
          <div className="card-body">
            <h2 className="card-title mt-5 text-lg sm:text-xl">{item.location}</h2>
            <p className='absolute top-3 right-3 badge badge-outline text-xs sm:text-sm'>
              ${item.priceRange.min}-{item.priceRange.max}
            </p>
            <p className='absolute bottom-3 left-3 badge badge-outline text-xs sm:text-sm'>
              {item.agentName}
            </p>
            <div className="absolute bottom-3 right-2 card-actions">
              <Link to={`/details/${item._id}`}>
                <button className="btn btn-secondary btn-sm sm:btn-md">Details</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestItem;