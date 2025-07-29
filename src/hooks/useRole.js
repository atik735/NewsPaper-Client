import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useRole = () => {
    const {user, loading} = useAuth()
    // const [role, setRole] =  useState(null)
    // const [isRoleLoading, setIsRoleLoading] =  useState(true)

    const {data: role, isLoading: isRoleLoading } = useQuery({
        queryKey:['role', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () =>{
                  const { data } = await axios(`${import.meta.env.VITE_API_URL}/user/role/${user.email}`)
                return data 
        }
    })
    console.log(role, isRoleLoading)



    // useEffect(() => {
    //     const fetchUserRole = async () => {
    //         if (!user) return setIsRoleLoading(false);
    //         try {
    //             const { data } = await axiosSecure(
    //                 `${import.meta.env.VITE_API_URL}/user/role/${user.email}`
    //             );
    //             setRole(data?.role);
    //         } catch (error) {
    //             console.log( error);
    //         } finally {
    //             setIsRoleLoading(false);
    //         }
    //     };

    //         fetchUserRole();
    // }, [user, axiosSecure]);

    return [role?.role, isRoleLoading]
};

export default useRole;