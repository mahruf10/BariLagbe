import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const LatestItem = () => {
  const axiosPublic=useAxiosPublic()
  const {data:properties=[]}=useQuery({
    queryKey:['properties'],
    queryFn:async()=>{
      const res=await axiosPublic.get('/property')
      return res.data
    }
  })
//   
//   {
//     title: "Luxury 3BHK Apartment",
//     location: "Gulshan 2, Dhaka",
//     price: "1,20,00,000",
//     priceType: "sale",
//     image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
//     postedAt: "2025-04-01",
//     agent: {
//       name: "Rahim Uddin",
//       image: "https://randomuser.me/api/portraits/men/32.jpg",
//       verified: true,
//     },
//   },
//   {
//     title: "Modern 4BHK Villa",
//     location: "Baridhara, Dhaka",
//     price: "85,000",
//     priceType: "rent",
//     image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
//     postedAt: "2025-04-02",
//     agent: {
//       name: "Sumaiya Akter",
//       image: "https://randomuser.me/api/portraits/women/44.jpg",
//       verified: true,
//     },
//   },
//   {
//     title: "Premium 2BHK Flat",
//     location: "Banani, Dhaka",
//     price: "65,00,000",
//     priceType: "sale",
//     image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
//     postedAt: "2025-04-03",
//     agent: {
//       name: "Karim Hossain",
//       image: "https://randomuser.me/api/portraits/men/55.jpg",
//       verified: false,
//     },
//   },
//   {
//     title: "Commercial Office Space",
//     location: "Motijheel, Dhaka",
//     price: "45,000",
//     priceType: "rent",
//     image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
//     postedAt: "2025-04-03",
//     agent: {
//       name: "Nasrin Begum",
//       image: "https://randomuser.me/api/portraits/women/68.jpg",
//       verified: true,
//     },
//   },
//   {
//     title: "Cozy Studio Apartment",
//     location: "Dhanmondi, Dhaka",
//     price: "18,000",
//     priceType: "rent",
//     image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
//     postedAt: "2025-04-04",
//     agent: {
//       name: "Tanvir Ahmed",
//       image: "https://randomuser.me/api/portraits/men/76.jpg",
//       verified: false,
//     },
//   },
//   {
//     title: "Duplex House with Rooftop",
//     location: "Uttara, Dhaka",
//     price: "95,00,000",
//     priceType: "sale",
//     image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
//     postedAt: "2025-04-05",
//     agent: {
//       name: "Farhana Islam",
//       image: "https://randomuser.me/api/portraits/women/12.jpg",
//       verified: true,
//     },
//   },
//   {
//     title: "3BHK Ready Flat",
//     location: "Mirpur 10, Dhaka",
//     price: "48,00,000",
//     priceType: "sale",
//     image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
//     postedAt: "2025-04-06",
//     agent: {
//       name: "Jahangir Alam",
//       image: "https://randomuser.me/api/portraits/men/23.jpg",
//       verified: true,
//     },
//   },
//   {
//     title: "Sea View Apartment",
//     location: "Patenga, Chattogram",
//     price: "55,000",
//     priceType: "rent",
//     image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80",
//     postedAt: "2025-04-07",
//     agent: {
//       name: "Meherun Nessa",
//       image: "https://randomuser.me/api/portraits/women/29.jpg",
//       verified: true,
//     },
//   },
//   {
//     title: "Commercial Shop Space",
//     location: "Agrabad, Chattogram",
//     price: "30,000",
//     priceType: "rent",
//     image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
//     postedAt: "2025-04-08",
//     agent: {
//       name: "Sabbir Rahman",
//       image: "https://randomuser.me/api/portraits/men/41.jpg",
//       verified: false,
//     },
//   },
//   {
//     title: "Hill View Bungalow",
//     location: "Nasirabad, Chattogram",
//     price: "1,50,00,000",
//     priceType: "sale",
//     image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80",
//     postedAt: "2025-04-09",
//     agent: {
//       name: "Roksana Parvin",
//       image: "https://randomuser.me/api/portraits/women/53.jpg",
//       verified: true,
//     },
//   },
// ];
const latestFour=properties.sort((a,b)=>new Date(b.postedAt) - new Date(a.postedAt)).slice(0,4)

    return (
        <div className='relative grid md:grid-cols-2 w-3/4 mx-auto space-y-4'>
            {
                latestFour.map(item=>
                    <div key={item._id} className="card bg-base-100 image-full w-96 shadow-sm">
  <figure>
    <img
      src={item.image}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title mt-5">{item.location}</h2>
 <p className='absolute top-3 right-3 badge badge-outline '>Price: ${item.priceRange.min}-{item.priceRange.max}</p>
 <p className='absolute bottom-3 left-3 badge badge-outline '> {item.agentName}</p>
    <div className="absolute bottom-3 right-2 card-actions justify-end">
   <Link to={`/details/${item._id}`}> <button className="btn btn-secondary">Details</button> </Link>   
    </div>
  </div>
</div>
                )
            }
        </div>
    );
};

export default LatestItem;