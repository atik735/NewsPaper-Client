import React from 'react';
import bannerImg from '../../../assets/bannerImg.jpg'

const Banner = () => {
    return (
        <div className='relative h-[300px] sm:h-[400px] md:h-[450px] lg:h-[600px] rounded-lg overflow-hidden'>
            <img className='h-full w-full object-cover' src={bannerImg} alt="Banner" />
            <div className='absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white px-4 text-center space-y-3'>
                {/* Title */}
                <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug'>
                    Empower Your Digital Presence
                </h1>

                {/* Paragraph */}
                <p className='font-medium sm:font-semibold text-sm sm:text-base md:text-lg lg:text-xl max-w-lg md:max-w-2xl'>
                    Discover the power of content, creativity, and connection with our premium platform
                </p>

                {/* Button */}
                <button className='btn btn-sm sm:btn-md bg-[#00001A] border-0 text-white mt-2'>
                    Connect With Us Now
                </button>
            </div>
        </div>
    );
};

export default Banner;
