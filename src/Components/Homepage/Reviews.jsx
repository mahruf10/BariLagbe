import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
const Reviews = () => {
    
    const reviews = [
        {
            reviewerName: "Arif Hossain",
            reviewerImage: "https://randomuser.me/api/portraits/men/11.jpg",
            description: "Gulshan এর এই apartment টা সত্যিই অসাধারণ। location, security সব কিছু top notch। agent খুব helpful ছিলেন।",
            propertyTitle: "Luxury 3BHK Apartment",
        },
        {
            reviewerName: "Nadia Rahman",
            reviewerImage: "https://randomuser.me/api/portraits/women/21.jpg",
            description: "Sea view apartment এ থাকার experience অন্যরকম। প্রতিদিন সকালে সমুদ্র দেখা যায়। দাম একটু বেশি কিন্তু worth it।",
            propertyTitle: "Sea View Apartment",
        },
        {
            reviewerName: "Mahbub Alam",
            reviewerImage: "https://randomuser.me/api/portraits/men/47.jpg",
            description: "Dhanmondi তে studio apartment টা আমার জন্য perfect ছিল। ছোট কিন্তু সুন্দরভাবে সাজানো। সব কিছু কাছে।",
            propertyTitle: "Cozy Studio Apartment",
        },
        {
            reviewerName: "Sharmin Akter",
            reviewerImage: "https://randomuser.me/api/portraits/women/36.jpg",
            description: "Uttara র duplex house টা family নিয়ে থাকার জন্য ideal। rooftop এ বসে সন্ধ্যা কাটানো অনেক enjoyable।",
            propertyTitle: "Duplex House with Rooftop",
        },
    ];
    return (
           
                    <div>
                        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                            {reviews.map(item =>
                                <div>
                                    <SwiperSlide>
                                        <div relative className='my-8 mx-24 flex flex-col items-center'>

                                              <p className='uppercase'>{item.propertyTitle}</p>
                                            <p className='py-8'> {item.description}</p>
                                            <img className='absolute bottom-3 left-15 w-7.5 rounded-full' src={item.reviewerImage} alt="" />
                                            <p className='absolute bottom-3 left-25 text-orange-400'>{item.reviewerName}</p>
                                        </div>

                                    </SwiperSlide>
                                </div>

                            )}
                        </Swiper>
                    </div>

       
    );
};

export default Reviews;