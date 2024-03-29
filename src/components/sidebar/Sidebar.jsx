import './Sidebar.css';
import {List, ListItem, ListItemText} from "@mui/material";
import {Link} from "react-router-dom";
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
                                <i className="bi bi-house icon"></i>
                                <ListItemText>Dashboard</ListItemText>
                            </ListItem>
                        </Link>
                    </div>
                    <div className={"list-item-wrapper"}>
                        <ListItem>
                            <i className="bi bi-qr-code icon"></i>
                            <ListItemText>QR Codes</ListItemText>
                        </ListItem>
                    </div>
                    <div className={"list-item-wrapper"}>
                        <Link to={"/menu-management"}>
                            <ListItem>
                                <i className="bi bi-book icon"></i>
                                <ListItemText>Menu Management</ListItemText>
                            </ListItem>
                        </Link>
                    </div>
                    <div className={"list-item-wrapper"}>
                        <Link to={"/category-management"}>
                            <ListItem>
                                <i className="bi bi-book icon"></i>
                                <ListItemText>Category Management</ListItemText>
                            </ListItem>
                        </Link>
                    </div>
                    <div className={"list-item-wrapper"}>
                        <ListItem>
                            <i className="bi bi-book icon"></i>
                            <ListItemText>Table Management</ListItemText>
                        </ListItem>
                    </div>
                    <div className={"list-item-wrapper"}>
                        <ListItem>
                            <i className="bi bi-bag icon"></i>
                            <ListItemText>Orders</ListItemText>
                        </ListItem>
                    </div>
                    <div className={"list-item-wrapper"}>
                        <ListItem>
                            <i className="bi bi-person icon"></i>
                            <ListItemText>Staff</ListItemText>
                        </ListItem>
                    </div>
                </List>
            </div>
        </div>
    );
}

export default Sidebar;
