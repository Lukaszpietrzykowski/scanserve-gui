import './Sidebar.css';
import {List, ListItem, ListItemContent} from "@mui/joy";
import {Link} from "react-router-dom"; // Import the CSS file for styling
import fullLogo from "../../assets/logo_z_tekstem.png"

function Sidebar() {

    return (
        <div className="sidebar">
            <div className="logo">
                <img src={fullLogo} alt={"logo"}/>
                {/*<img src={logo} width={100} height={100} alt="logo"/>*/}
            </div>
            <div className={"sidebar-content"}>
                <List>
                    <div className={"list-item-wrapper"}>
                        <Link to={"/"}>
                            <ListItem>
                                <i className="bi bi-house"></i>
                                <ListItemContent>Dashboard</ListItemContent>
                            </ListItem>
                        </Link>
                    </div>
                    <div className={"list-item-wrapper"}>
                        <ListItem>
                            <i className="bi bi-qr-code"></i>
                            <ListItemContent>QR Codes</ListItemContent>
                        </ListItem>
                    </div>
                    <div className={"list-item-wrapper"}>
                        <Link to={"/menu-management"}>
                            <ListItem>
                                <i className="bi bi-book"></i>
                                <ListItemContent>Menu Management</ListItemContent>
                            </ListItem>
                        </Link>
                    </div>
                    <div className={"list-item-wrapper"}>
                        <ListItem>
                            <i className="bi bi-book"></i>
                            <ListItemContent>Table Management</ListItemContent>
                        </ListItem>
                    </div>
                    <div className={"list-item-wrapper"}>
                        <ListItem>
                            <i className="bi bi-bag"></i>
                            <ListItemContent>Orders</ListItemContent>
                        </ListItem>
                    </div>
                    <div className={"list-item-wrapper"}>
                        <ListItem>
                            <i className="bi bi-person"></i>
                            <ListItemContent>Staff</ListItemContent>
                        </ListItem>
                    </div>
                </List>
            </div>
        </div>
    );
}

export default Sidebar;
