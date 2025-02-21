import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
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
            icon: "success",
            title: "Success",
            text: "Logout Success!",
        });
        return signOut(auth);
    };
    //observe login
    useEffect(() => {
        const unsubscriber = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
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
    console.log(user.displayName, user.email, user.photoURL);
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;