import React from 'react';
import SocialLogin from '../components/shared/SocialLogin';

const Home = () => {
    return (
        <div className='text-center h-screen flex flex-col justify-center items-center gap-3'>
            <h1 className='text-3xl md:text-5xl font-bold'>Welcome to Task Track!</h1>
            <div>
                <p>Please log in to access your tasks.</p>
                <p>If you don't have an account, click the button to create one.</p>
                <p>If you have an account, click the button to login.</p>
            </div>
            {/* <button className="flex border rounded-md justify-between items-center px-2 py-1.5 text-base cursor-pointer hover:bg-gray-300 transition duration-300 gap-2">Get Started</button> */}
            <SocialLogin />
        </div>
    );
};

export default Home;