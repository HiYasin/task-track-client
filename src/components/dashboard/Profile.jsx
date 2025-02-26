import React from 'react';
import { Helmet } from 'react-helmet-async';
import useData from '../../customHooks/useData';

const Profile = () => {
    const { userdata } = useData();
    const { email, displayName, photoURL, tasks } = userdata;

    let todoCount = 0;
    let inProgressCount = 0;
    let doneCount = 0;

    if (userdata && Object.keys(userdata).length > 0) {
        tasks.forEach((task) => {
            if (task.category === 'To-Do') todoCount++;
            else if (task.category === 'In-Progress') inProgressCount++;
            else doneCount++;
        });
    }

    return (
        <div className='h-screen p-4'>
            <Helmet>
                <title>Task Track | Profile</title>
            </Helmet>
            <h1 className='text-4xl font-semibold text-center my-8'>Profile</h1>
            <div className='flex flex-col items-center'>
                <div className='flex flex-col items-center mb-8 md:mb-0'>
                    <div className='w-auto h-auto mb-4 p-0.5 md:p-1 lg:p-1.5 border rounded-full'>
                        <img src={userdata?.photoURL} alt='Profile' className='w-32 md:w-52 h-32 md:h-52 rounded-full border' />
                    </div>
                    <h2 className='text-2xl md:text-3xl lg:text-5xl font-semibold'>{displayName}</h2>
                    <p className='text-white bg-[#0e0e0e] rounded-full px-5 mt-2 md:mt-3'>{email}</p>
                </div>
                <div className='flex flex-col items-center mt-16'>
                    <div className='flex flex-col items-center mb-4'>
                        <h3 className='text-xl md:text-2xl lg:text-4xl font-semibold mb-4'>Tasks Status Count</h3>
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 justify-center'>
                            <div className='text-center border px-10 py-5 rounded-2xl'>
                                <p className='text-2xl font-bold'>{todoCount}</p>
                                <p className='text-gray-600'>To Do</p>
                            </div>
                            <div className='text-center border px-10 py-5 rounded-2xl'>
                                <p className='text-2xl font-bold'>{inProgressCount}</p>
                                <p className='text-gray-600'>In Progress</p>
                            </div>
                            <div className='text-center border px-10 py-5 rounded-2xl'>
                                <p className='text-2xl font-bold'>{doneCount}</p>
                                <p className='text-gray-600'>Done</p>
                            </div>
                            <div className='text-center border px-10 py-5 rounded-2xl'>
                                <p className='text-2xl font-bold'>{doneCount+inProgressCount+todoCount}</p>
                                <p className='text-gray-600'>Total</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;