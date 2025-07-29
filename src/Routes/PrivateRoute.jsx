import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({children}) => {

    const {user,loading} =useContext(AuthContext)
    const location = useLocation()
    // console.log(location);
    

    if (loading) {
        return <div className='text-center'><span className="loading loading-spinner loading-xl"></span></div>
    }

    if (!user) {
        return <Navigate state={location?.pathname} to="/login"></Navigate>
    }

    return children
};

export default PrivateRoute;