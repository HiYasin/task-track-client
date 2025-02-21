import { useState } from "react";
import SideBar from "../components/shared/SideBar";
import { FaBarsStaggered } from "react-icons/fa6";
import SocialLogin from "../components/shared/SocialLogin";
import SignOut from "../components/shared/SignOut";

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
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est deserunt perferendis, inventore sit voluptatum numquam obcaecati, qui cupiditate nesciunt ipsa dignissimos rem fugit itaque, asperiores exercitationem possimus. Quasi inventore velit, fuga et amet accusamus possimus? Sed dolorem totam ab, dolores omnis natus. Maxime rerum corrupti eos repellendus cupiditate quia perferendis quas amet ex ad. Ex quae quo earum deleniti rem nobis, quis maxime quas? Quidem natus aspernatur similique pariatur neque veritatis laboriosam, tenetur expedita iste at itaque ducimus vel? Ipsum, doloremque aliquid tempore obcaecati blanditiis libero deleniti repudiandae corporis rerum aut hic necessitatibus, possimus perferendis, excepturi delectus iure. Animi, beatae.
                </div>
            </div>
        </section>
    );
};

export default Dashboard;