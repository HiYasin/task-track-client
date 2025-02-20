import React from 'react';
import { Helmet } from 'react-helmet-async';

const App = () => {
  return (
      <div className='text-center'>
        <Helmet>
          <title>Task Track | Home</title>
        </Helmet>
        Hello world
      </div>
  );
};

export default App;