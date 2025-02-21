import React from 'react';
import { Helmet } from 'react-helmet-async';

const DashboardHome = () => {
    return (
        <div className='h-screen'>
            <Helmet>
                <title>Task Track | Dashboard</title>
            </Helmet>
            <h1 className='text-4xl font-semibold text-center'>Welcome to Dashboard</h1>
        </div>
    );
};

export default DashboardHome;