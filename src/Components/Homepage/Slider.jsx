import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'styles.css';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
const Slider = () => {
const properties = [
  {
    id: 1,
    title: "Luxury 3BHK Apartment",
    location: "Gulshan 2, Dhaka",
    price: "1,20,00,000",
    priceType: "sale",
    badge: "For Sale",
    category: "Apartment",
    beds: 3,
    baths: 2,
    sqft: 1850,
    floor: "12th Floor",
    extras: ["Parking", "Lift"],
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
  },
  {
    id: 2,
    title: "Modern 4BHK Villa",
    location: "Baridhara, Dhaka",
    price: "85,000",
    priceType: "rent",
    badge: "For Rent",
    category: "Villa",
    beds: 4,
    baths: 3,
    sqft: 3200,
    floor: "Ground",
    extras: ["Garden", "Garage"],
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  },
  {
    id: 3,
    title: "Premium 2BHK Flat",
    location: "Banani, Dhaka",
    price: "65,00,000",
    priceType: "sale",
    badge: "New Listing",
    category: "Apartment",
    beds: 2,
    baths: 2,
    sqft: 1200,
    floor: "5th Floor",
    extras: ["Parking", "Security"],
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
  },
  {
    id: 4,
    title: "Office Space — 5th Floor",
    location: "Motijheel, Dhaka",
    price: "45,0000",
    priceType: "rent",
    badge: "For Rent",
    category: "Commercial",
    beds: 0,
    baths: 2,
    sqft: 2100,
    floor: "5th Floor",
    extras: ["Generator", "Lift"],
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
  },
];

    return (
        <div>
         <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
       {
        properties.map((item)=>(
          <SwiperSlide key={item.id}>
  <div className="w-3/4 mx-auto">

    {/* Image wrapper */}
    <div className="relative w-full h-64 overflow-hidden rounded-t-xl bg-gray-500">
       
      {/* Full image */}
      <img
        src={item.image}
        className="relative w-full h-full object-contain z-10"
      />

      {/* Badge */}
      <span className="absolute top-3 left-3 z-20 px-3 py-1 text-xs font-medium rounded-md bg-blue-100 text-blue-800">
        {item.badge}
      </span>

      {/* Category */}
      <span className="absolute top-3 right-3 z-20 px-3 py-1 text-xs font-medium rounded-md bg-gray-500 text-white border border-gray-600">
        {item.category}
      </span>
    </div>

    {/* Info section */}
    <div className="p-4 border border-t-0 rounded-b-xl  bg-black">
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-white font-semibold">{item.title}</h3>
        <span className="text-blue-700 font-semibold text-sm ml-3 whitespace-nowrap">
          ৳ {item.price} {item.priceType === "rent" ? "/ month" : ""}
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-3">Location: {item.location}</p>
      <div className="flex gap-3 text-sm text-gray-500 flex-wrap">
        {item.beds > 0 && <span> {item.beds} Beds</span>}
        <span>{item.baths} Baths</span>
        <span> {item.sqft} sqft</span>
      </div>
    </div>

  </div>
</SwiperSlide>
        ))
       }
       
      </Swiper>

      </div>
    );
};

export default Slider;