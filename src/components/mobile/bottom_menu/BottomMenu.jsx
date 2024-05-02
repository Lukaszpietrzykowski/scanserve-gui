import React from 'react';
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
            <BottomNavigationAction label="Menu" icon={<RestoreIcon />}/>
            <BottomNavigationAction label="Cart" icon={<FavoriteIcon/>}/>
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon/>}/>
        </BottomNavigation>
    );
}

export default BottomMenu;