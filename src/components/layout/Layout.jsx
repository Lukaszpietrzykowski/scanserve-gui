import Header from "../header/Header.jsx";
import Sidebar from "../sidebar/Sidebar.jsx";
import "./Layout.css"
import {Outlet} from "react-router-dom";
import {useState} from "react";

function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="main">
            <div className={`sidebar-container ${isSidebarOpen ? 'open' : 'closed'}`}>
                <Sidebar/>
            </div>
            <div className="main-container">
                <div className="navbar-container">
                    <Header toggleSidebar={toggleSidebar}/>
                </div>
                <div className="content-container">
                    <div className={"content"}>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout
