import './Sidebar.css';
import {List, ListItem, ListItemText} from "@mui/material";
import {Link} from "react-router-dom";
import fullLogo from "../../assets/logo_z_tekstem.png"
import TableRestaurantOutlinedIcon from '@mui/icons-material/TableRestaurantOutlined';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

function Sidebar({isSidebarOpen}) {

    return (
        <div className={`sidebar  ${isSidebarOpen ? 'open' : 'closed'}`}>
            <div className="logo">
                <img src={fullLogo} alt={"logo"}/>
                {/*<img src={logo} width={100} height={100} alt="logo"/>*/}
            </div>
            <div className={"sidebar-content"}>
                <List>
                    <Link to={"/mobile/menu"}>
                        <div className={"list-item-wrapper"}>
                            <ListItem>
                                <PhoneIphoneIcon sx={{marginRight: "10px"}}/>
                                <ListItemText>Mobile Preview</ListItemText>
                            </ListItem>
                        </div>
                    </Link>
                    <Link to={"/"}>
                        <div className={"list-item-wrapper"}>

                            <ListItem>
                                <i className="bi bi-house icon"></i>
                                <ListItemText>Dashboard</ListItemText>
                            </ListItem>
                        </div>
                    </Link>
                    <Link to={"/menu-management"}>
                        <div className={"list-item-wrapper"}>
                            <ListItem>
                                <i className="bi bi-book icon"></i>
                                <ListItemText>Menu Management</ListItemText>
                            </ListItem>
                        </div>
                    </Link>
                    {/*<Link to={"/menu"}>*/}
                    {/*    <div className={"list-item-wrapper"}>*/}
                    {/*        <ListItem>*/}
                    {/*            <i className="bi bi-book icon"></i>*/}
                    {/*            <ListItemText>Menu Preview</ListItemText>*/}
                    {/*        </ListItem>*/}
                    {/*    </div>*/}
                    {/*</Link>*/}
                    <Link to={"/menu-item-management"}>
                        <div className={"list-item-wrapper"}>
                            <ListItem>
                                <i className="bi bi-book icon"></i>
                                <ListItemText>Menu Item Management</ListItemText>
                            </ListItem>
                        </div>
                    </Link>
                    <Link to={"/category-management"}>
                        <div className={"list-item-wrapper"}>

                            <ListItem>
                                <i className="bi bi-book icon"></i>
                                <ListItemText>Category Management</ListItemText>
                            </ListItem>

                        </div>
                    </Link>
                    <Link to={"/table-management"}>
                        <div className={"list-item-wrapper"}>
                            <ListItem>
                                <TableRestaurantOutlinedIcon sx={{marginRight: "10px"}}/>
                                {/*<i className="bi bi-book icon"></i>*/}
                                <ListItemText>Table Management</ListItemText>
                            </ListItem>
                        </div>
                    </Link>
                    <Link to={"/qr-codes"}>
                        <div className={"list-item-wrapper"}>

                            <ListItem>
                                <i className="bi bi-qr-code icon"></i>
                                <ListItemText>QR Codes</ListItemText>
                            </ListItem>
                        </div>
                    </Link>
                    <Link to={"/orders"}>
                        <div className={"list-item-wrapper"}>
                            <ListItem>
                                <i className="bi bi-bag icon"></i>
                                <ListItemText>Orders</ListItemText>
                            </ListItem>
                        </div>
                    </Link>
                </List>
            </div>
        </div>
    );
}

export default Sidebar;
