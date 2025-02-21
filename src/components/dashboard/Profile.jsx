import React from 'react';
import { Helmet } from 'react-helmet-async';

const Profile = () => {
    return (
        <div className='h-screen'>
            <Helmet>
                <title>Task Track | Profile</title>
            </Helmet>
            <h1 className='text-4xl font-semibold text-center'>Profile</h1>
        </div>
    );
};

export default Profile;