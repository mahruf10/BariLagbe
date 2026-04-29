import React from 'react';
import Slider from './Slider';
import SectionTitle from '../Shared/SectionTitle';
import LatestItem from './LatestItem';
import Reviews from './Reviews';

const Home = () => {
    return (
        <div >
           <Slider></Slider>
           <SectionTitle heading='latest item' subheading='buy our latest item'></SectionTitle>
           <LatestItem></LatestItem>
           <SectionTitle heading='reviews' subheading='put your review'></SectionTitle>
          <Reviews></Reviews>
       
        </div>
    );
};

export default Home;