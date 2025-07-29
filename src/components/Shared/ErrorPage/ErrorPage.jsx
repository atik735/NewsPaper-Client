import React from 'react';
import Notfound from '../../../assets/notfound.jpg'
import { Link} from 'react-router';

const ErrorPage = () => {
    return (
               <div className='text-center place-self-center space-y-4 mt-10 shadow-2xl p-10'>

        <img className='w-[450px]' src={Notfound} />

        <h1 className='text-5xl text-red-500'>404-Page Not Found</h1>
        <p>Oops!The page you're looking for doesn't exist </p>

              <Link to='/'>
                <button className="btn text-white bg-[#176AE5] rounded-full">Go Back Home</button>
              </Link>
        </div>
    );
};

export default ErrorPage;