"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Array of images
const images = [
  "https://images.unsplash.com/photo-1735480222193-3fe22ffd70b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
  "https://plus.unsplash.com/premium_photo-1686593681087-774c9c55fed2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1741298856762-1ff2f1204bc8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzOXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1739188366834-1281a22a1ac5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNjl8fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1740471230620-0dc54e43fa4c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNzh8fHxlbnwwfHx8fHw%3D",
];

export default function ImageSlider() {
  return (
    <div className="flex justify-center items-start mt-10 relative"> {/* Adjusted position */}
      <Swiper
        slidesPerView={3} // Show 3 cards at a time
        loop={true} // Circular motion
        autoplay={{ delay: 1000, disableOnInteraction: false }} // Auto shift every 1 sec
        navigation={{ 
          nextEl: ".swiper-button-next", 
          prevEl: ".swiper-button-prev" 
        }} // Custom navigation buttons
        pagination={{ clickable: true, el: ".swiper-pagination" }} // Move dots below
        modules={[Autoplay, Navigation, Pagination]}
        className="w-[50%] lg:w-[50%] pb-10" // Added padding at the bottom for dots
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <div className="w-60 h-80 rounded-lg overflow-hidden shadow-lg"> {/* Adjusted card size */}
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination Dots (Below Cards) */}
      <div className="swiper-pagination mt-4"></div>
    </div>
  );
}
    