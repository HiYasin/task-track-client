import React from 'react';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import useAuth from '../../customHooks/useAuth';

const SignOut = () => {
    const { signOutUser } = useAuth();
    const handleGoogleSignIn = () => {
        //console.log("Google Sign In");
        signOutUser();
    }
    return (
        <div>
            <button className="flex border rounded-md justify-between items-center px-2 py-1.5 text-base cursor-pointer hover:bg-gray-300 transition duration-300 gap-2"
                onClick={handleGoogleSignIn}>
                <FaArrowRightFromBracket />
                Sign Out
            </button >
        </div>
    );
};

export default SignOut;