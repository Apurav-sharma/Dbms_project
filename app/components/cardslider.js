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
  "https://img.freepik.com/free-vector/paying-bills-concept-illustration_114360-19357.jpg?t=st=1742220979~exp=1742224579~hmac=376c52e49a227b4238e9e7ea49fa0e1257e8945727b003acbd32acc6a09265f0&w=826",
  "https://img.freepik.com/free-vector/credit-card-payment-landing-page-concept_52683-24893.jpg?semt=ais_hybrid",
  "https://images.unsplash.com/photo-1565373676943-403a8e5c2900?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJhbmtpbmclMjBwYXltZW50c3xlbnwwfHwwfHx8MA%3D%3D",
  "https://img.freepik.com/free-vector/hands-holding-credit-card-mobile-phone-with-banking-app-person-paying-with-bank-card-transferring-money-shopping-online-flat-vector-illustration-payment-finance-concept_74855-24760.jpg?t=st=1742221151~exp=1742224751~hmac=10db3b11e1aa1663ce0d6a0278e298691eb3aa0cc5348fe11a33b0ed8b8b087a&w=740",
  "https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress&cs=tinysrgb&w=600"
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
    