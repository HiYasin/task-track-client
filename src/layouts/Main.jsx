import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <>
            <header>

            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                
            </footer>
        </>
    );
};

export default Main;