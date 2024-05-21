import React from 'react';
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import {Link} from "react-router-dom";

function BottomMenu() {
    const [value, setValue] = React.useState(0);
    return (
        <BottomNavigation
            sx={{
                position: "fixed",
                bottom: 0,
                width: "100%",
                borderTopRightRadius: "24px",
                borderTopLeftRadius: "24px",
                marginTop: "8px",
                height: 70,
            }}
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        >
            <BottomNavigationAction component={Link} to={"/mobile/menu"} label={"Menu"} icon={<MenuBookIcon/>}/>
            <BottomNavigationAction component={Link} to={"/mobile/cart"} label="Cart" icon={<ShoppingCartIcon/>}/>
        </BottomNavigation>
    );
}

export default BottomMenu;