import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './slider.css';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Publisher = () => {
  // Fetch publishers dynamically
  const { data: publishers = [], isLoading } = useQuery({
    queryKey: ['publishers'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/publishers`);
      return res.data;
    }
  });

  if (isLoading) {
    return <p className="text-center py-10">Loading publishers...</p>;
  }

  return (
    <div className="my-10">
      <h1 className="text-2xl font-bold mb-5 text-center">Our Publishers</h1>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        freeMode={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="mySwiper"
      >
        {publishers.map((pub) => (
          <SwiperSlide key={pub._id}>
            <div className="card shadow-sm w-full border rounded-lg">
              <figure className="h-48 flex items-center justify-center">
                <img
                  src={pub.logo}
                  alt={pub.name}
                  className="h-full object-contain"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title justify-center">{pub.name}</h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Publisher;
