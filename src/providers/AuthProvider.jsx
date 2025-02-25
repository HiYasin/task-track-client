import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import useAxios from '../customHooks/useAxios';
import axios from 'axios';
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    //console.log(user);

    //google login/registration
    const provider = new GoogleAuthProvider();
    const googleSign = () => {
        return signInWithPopup(auth, provider);
    }


    //for logout
    const signOutUser = () => {
        setLoading(true);
        Swal.fire({
            title: "Success",
            text: "Logout Success!",
            icon: "success",
            iconColor: "#0e0e0e",
            confirmButtonColor: "#0e0e0e" // Set the button color to black
        });
        return signOut(auth);
    };

    const axiosPublic = useAxios();
    //observe login
    useEffect(() => {
        const unsubscriber = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            // console.log(currentUser)
            if (currentUser) {
                const userAuth = {
                    email: currentUser.email,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                    tasks: [],
                }
                const fetchUserInfo = async () => {
                    const res = await axios.post(`https://task-track-server-plum.vercel.app/users`, userAuth);
                    //
                    // console.log(res.data);
                };
                fetchUserInfo();
            }

            setLoading(false);
            //console.log(currentUser);
        });
        return () => unsubscriber;
    }, []);

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        googleSign,
        signOutUser,
    }
    //console.log(user.displayName, user.email, user.photoURL);
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;