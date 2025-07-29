import React from 'react';
import extra from '../../../assets/extra1.jpg';

const Extra1 = () => {
  return (
    <div className="bg-gray-100 my-8 shadow-md flex flex-col-reverse md:flex-row items-center justify-evenly p-6 md:p-16 lg:p-20 gap-8">
      
      {/* Text Section */}
      <div className="text-center space-y-10 max-w-xl">
        <section className="space-y-4">
          <h1 className="font-bold text-3xl md:text-4xl text-gray-700">STAY WITH US</h1>
          <p className="text-sm md:text-base text-gray-600">
            Subscribe to our newsletters now and stay up-to-date with new collections,
            <br className="hidden md:block" />
            the latest lookbooks and exclusive offers.
          </p>
        </section>

        <form className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <input
            type="email"
            name="email"
            className="outline-none w-full sm:w-auto px-4 py-2 border-b border-gray-400 bg-transparent placeholder:text-gray-500"
            placeholder="Enter your e-mail"
          />
          <input
            type="submit"
            value="SUBSCRIBE"
            className="font-bold cursor-pointer px-6 py-2 border border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white transition"
          />
        </form>
      </div>

      {/* Image Section */}
      <div>
        <img
          src={extra}
          alt="NewsPaper"
          className="w-64 sm:w-80 md:w-96 rounded shadow-lg"
        />
      </div>
    </div>
  );
};

export default Extra1;
