'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import Image1 from '../Assets/Image1.svg';
import Image2 from '../Assets/Image2.svg';
import Image3 from '../Assets/Image3.svg';

const images = [Image1, Image2, Image3];

const Slideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            currentImageIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ zIndex: currentImageIndex === index ? 10 : 1 }}
        />
      ))}
    </div>
  );
};

export default Slideshow;
