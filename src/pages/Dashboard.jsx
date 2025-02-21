import { useState } from "react";
import SideBar from "../components/shared/SideBar";
import { FaBarsStaggered } from "react-icons/fa6";
import SocialLogin from "../components/shared/SocialLogin";
import SignOut from "../components/shared/SignOut";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    const [open, setOpen] = useState(true);
    return (
        <section className="flex gap-6">
            <SideBar open={open} setOpen={setOpen} />
            <div className="m-3 text-xl text-gray-900 font-semibold md:pl-16 lg:pl-0">
                <div className="py-3 pl-3 flex justify-start md:hidden bg-[#0e0e0e] text-white fixed z-10 top-0 left-0 right-0">
                    <FaBarsStaggered size={30} className="cursor-pointer hover:bg-gray-800 rounded-md p-1.5" onClick={() => setOpen(!open)} />
                </div>
                <div className="pt-10 md:pt-0">
                    <Outlet />
                </div>
            </div>
        </section>
    );
};

export default Dashboard;