'use client'
import Image from 'next/image';
import React from 'react';
import bidImgOne from '@/app/Assets/AuctionImages/bidImgOne.png';
import bidImgTwo from '@/app/Assets/AuctionImages/bidImgTwo.png';
import bidImgThree from '@/app/Assets/AuctionImages/bidImgThree.png';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BarTimer from './BarTimer';

function Carousel() {
  const settings = [{
    breakpoint: 768, 
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1,
      speed: 500,
      infinite: true,
      dots: true
    }
  }]
  return (
    <div className="slider-container">
      <Slider dots={true} infinite={true} speed={500} slidesToShow={3} slidesToScroll={1} responsive={settings}>
        <div className="w-[400px] relative">
          <Image alt='Product Image' width={400} height={300} src={bidImgOne} />
          <BarTimer initialTime={300000} />
        </div> 
        <div className="w-[400px] relative">
          <Image alt='Product Image' width={400} height={300} src={bidImgTwo} />
          <BarTimer initialTime={200000} />
        </div> 
        <div className="w-[400px] relative">
          <Image alt='Product Image' width={400} height={300} src={bidImgThree} />
          <BarTimer initialTime={35000} />
        </div> 
        <div className="w-[400px] relative">
          <Image alt='Product Image' width={400} height={300} src={bidImgOne} />
          <BarTimer initialTime={350000} />
        </div> 
        <div className="w-[400px] relative">
          <Image alt='Product Image' width={400} height={300} src={bidImgTwo} />
          <BarTimer initialTime={10000} />
        </div> 
        <div className="w-[400px] relative">
          <Image alt='Product Image' width={400} height={300} src={bidImgThree} />
          <BarTimer initialTime={30000} />
        </div> 
      </Slider>
    </div>
  );
}
export default Carousel;