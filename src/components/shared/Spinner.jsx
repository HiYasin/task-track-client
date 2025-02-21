const Spinner = () => {
    return (
        <div className='flex justify-center items-center h-screen w-screen'>
            <div className="spinner">
                <style jsx>{`
                    .spinner {
                        border: 7px solid #f3f3f3;
                        border-top: 7px solid black;
                        border-radius: 50%;
                        width: 60px;
                        height: 60px;
                        animation: spin 2s linear infinite;
                    }

                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default Spinner;