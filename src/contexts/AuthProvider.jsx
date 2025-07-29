import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { AuthContext } from './AuthContext';

const AuthProvider = ({children}) => {
        const [loading,setLoading] = useState(true)
        const [user,setUser] =useState(null)
        const provider =new GoogleAuthProvider();
     const createUser =(email,password)=>{
        setLoading(true)
         return createUserWithEmailAndPassword(auth,email,password)
    } 

    const signInUser = (email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

const googleSignIn = async () => { 
  setLoading(true);
  const result = await signInWithPopup(auth, provider);
  setUser(result.user); // সাথে সাথে context আপডেট করো
  return result;
};

    const signOutUser = () =>{
        setLoading(true);
        return signOut(auth)
    }

         const Updprofile = (profile)=>{
         return updateProfile(auth.currentUser,profile)
     }

    useEffect(() =>{
       const unSubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser)
        setLoading(false)
        // console.log("user in the Auth State change",currentUser)
       })
       return () =>{
        unSubscribe();
       }
    }, [])

    const userInfo ={
        loading,
        user,
        setUser,
        createUser,
        signInUser,
        Updprofile,
        googleSignIn,
        signOutUser
    }
    return (
        <div>
            <AuthContext value={userInfo}>
                {children}
            </AuthContext>
        </div>
    );
};

export default AuthProvider;