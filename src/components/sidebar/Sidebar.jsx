import './Sidebar.css';
import {List, ListItem, ListItemText} from "@mui/material";
import {Link} from "react-router-dom";
import fullLogo from "../../assets/logo_z_tekstem.png"
import TableRestaurantOutlinedIcon from '@mui/icons-material/TableRestaurantOutlined';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import QrCodeOutlinedIcon from '@mui/icons-material/QrCodeOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

function Sidebar({isSidebarOpen}) {

    return (
        <div className={`sidebar  ${isSidebarOpen ? 'open' : 'closed'}`}>
            <div className="logo">
                <img src={fullLogo} alt={"logo"}/>
            </div>
            <div className={"sidebar-content"}>
                <List>
                    {/*<Link to={"/mobile/menu"}>*/}
                    {/*    <div className={"list-item-wrapper"}>*/}
                    {/*        <ListItem>*/}
                    {/*            <PhoneIphoneIcon sx={{marginRight: "10px", fontSize: 26}}/>*/}
                    {/*            <ListItemText>Mobile Preview</ListItemText>*/}
                    {/*        </ListItem>*/}
                    {/*    </div>*/}
                    {/*</Link>*/}
                    <Link to={"/"}>
                        <div className={"list-item-wrapper"}>

                            <ListItem>
                                <SpaceDashboardOutlinedIcon sx={{marginRight: "10px", fontSize: 26}}/>
                                <ListItemText>Dashboard</ListItemText>
                            </ListItem>
                        </div>
                    </Link>
                    <Link to={"/menu-management"}>
                        <div className={"list-item-wrapper"}>
                            <ListItem>
                                <MenuBookOutlinedIcon sx={{marginRight: "10px", fontSize: 26}}/>
                                <ListItemText>Menu Management</ListItemText>
                            </ListItem>
                        </div>
                    </Link>
                    <Link to={"/menu-item-management"}>
                        <div className={"list-item-wrapper"}>
                            <ListItem>
                                <FastfoodOutlinedIcon sx={{marginRight: "10px", fontSize: 26}}/>
                                <ListItemText>Menu Item Management</ListItemText>
                            </ListItem>
                        </div>
                    </Link>
                    <Link to={"/category-management"}>
                        <div className={"list-item-wrapper"}>

                            <ListItem>
                                <CategoryOutlinedIcon sx={{marginRight: "10px", fontSize: 26}}/>
                                <ListItemText>Category Management</ListItemText>
                            </ListItem>

                        </div>
                    </Link>
                    <Link to={"/table-management"}>
                        <div className={"list-item-wrapper"}>
                            <ListItem>
                                <TableRestaurantOutlinedIcon sx={{marginRight: "10px", fontSize: 26}}/>
                                <ListItemText>Table Management</ListItemText>
                            </ListItem>
                        </div>
                    </Link>
                    <Link to={"/qr-codes"}>
                        <div className={"list-item-wrapper"}>

                            <ListItem>
                                <QrCodeOutlinedIcon sx={{marginRight: "10px", fontSize: 26}}/>
                                <ListItemText>QR Codes</ListItemText>
                            </ListItem>
                        </div>
                    </Link>
                    <Link to={"/orders"}>
                        <div className={"list-item-wrapper"}>
                            <ListItem>
                                <ShoppingBagOutlinedIcon sx={{marginRight: "10px", fontSize: 26}}/>
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
