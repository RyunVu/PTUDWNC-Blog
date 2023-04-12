import { Outlet } from 'react-router-dom';
import Navbar from '../../Components/blog/Navbar';
import Sidebar from '../../Components/blog/Sidebar';
import Footer from '../../Components/blog/Footer';

const Layout = () => {
    return (
        <>
            <Navbar />
            <div className="container-fluid py-3">
                <div className="row">
                    <div className="col-9">
                        <Outlet />
                    </div>
                    <div className="col-3 border-start">
                        <Sidebar />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Layout;
