
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import useAuth from '../../customHooks/useAuth';

const SignOut = ({ open }) => {
    const { signOutUser } = useAuth();
    const handleGoogleSignIn = () => {
        //console.log("Google Sign In");
        signOutUser();
    }
    return (
        <button className={`mt-5 group flex items-center text-sm gap-3.5 hover:bg-gray-800 rounded-md over cursor-pointer`} onClick={ handleGoogleSignIn }>
            <div className={`${!open && "hidden md:block"} p-1.5`}><FaArrowRightFromBracket size={20} /></div>

            <h2 className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`} >
                Sign Out
            </h2>
            <h2 className={`${open && "hidden"} absolute left-48 bg-gray-300 font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`} >
                Sign Out
            </h2>
        </button>
    );
};

export default SignOut;