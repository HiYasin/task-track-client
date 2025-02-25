import { FcGoogle } from "react-icons/fc";
import useAuth from "../../customHooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const SocialLogin = () => {
    const { googleSign } = useAuth();
    const location = useLocation();
    const redirectTo = location?.state?.from || '/dashboard';
    const navigate = useNavigate();
    const handleGoogleSignIn = () => {
        googleSign()
            .then((res) => {
                Swal.fire({
                    title: "Success",
                    text: "Register & Login Successfully!",
                    icon: "success",
                    iconColor: "#0e0e0e",
                    confirmButtonColor: "#0e0e0e" // Set the button color to black
                });
                navigate(redirectTo, { replace: true });
            })
            .catch((err) => {
                //console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "Try Again",
                    text: "Oops...Something went wrong!",
                });
            });
    }
    return (
        <button className="flex gap-2 border w-fit rounded-md justify-between items-center px-2 py-1.5 text-base cursor-pointer hover:bg-gray-300 transition duration-300"
            onClick={handleGoogleSignIn}>
            <FcGoogle size={20} />Continue with Google
        </button >

    );
};

export default SocialLogin;