
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { FiFolder } from "react-icons/fi";
import { Link } from "react-router-dom";
import React from "react";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import SignOut from "./SignOut";

const SideBar = ({open, setOpen}) => {
    const menus = [
        { name: "Profile", link: "/dashboard/profile", icon: AiOutlineUser },
        { name: "Dashboard", link: "/dashboard", icon: MdOutlineDashboard },
    ];
    
    return (
        <div className={`bg-[#0e0e0e] min-h-screen ${open ? "min-w-72 px-4" : "w-0 md:min-w-16 md:px-4"} duration-500 text-gray-100 fixed lg:relative top-0 left-0 bottom-0 z-50`}>
            <div className="my-3 flex justify-end *:hover:bg-gray-800 *:rounded-md *:p-1.5">
                {
                    open?
                    <FaXmark size={30} className="cursor-pointer" onClick={() => setOpen(!open)}/>
                    :
                    <FaBarsStaggered size={30} className="cursor-pointer hidden md:block" onClick={() => setOpen(!open)} />
                }
            </div>
            <div className={`flex flex-col gap-2 ${open && "w-full"} duration-500`}>
                {menus?.map((menu, i) => (
                    <Link to={menu?.link} key={i} className={`${menu?.margin && "mt-5"} group flex items-center text-sm gap-3.5 font-medium hover:bg-gray-800 rounded-md over`}>
                        <div className={`${!open && "hidden md:block"} p-1.5`}>{React.createElement(menu?.icon, { size: "20" })}</div>

                        <h2 className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`} >
                            {menu?.name}
                        </h2>
                        <h2 className={`${open && "hidden"} bg-gray-300 absolute left-48 font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`} >
                            {menu?.name}
                        </h2>
                    </Link>
                ))}
                <div className="h-10"></div>
                <SignOut open={open}/>
            </div>
        </div>
    );
};

export default SideBar;
