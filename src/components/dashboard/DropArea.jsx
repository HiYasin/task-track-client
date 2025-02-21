import React, { useState } from 'react';

const DropArea = () => {
    const [showDrop, setShowDrop] = useState(false);
    return (
        <div
            className={`${showDrop && 'opacity-100 h-32'} transition-all duration-300 w-full my-3 opacity-0 h-5 bg-gray-200 rounded-lg border-2 border-dashed border-gray-700 flex justify-center items-center`}
            onDragEnter={() => { setShowDrop(true); }}
            onDragLeave={() => { setShowDrop(false); }}
        >
            <div>
                Drop here
            </div>
        </div>
    );
};

export default DropArea;