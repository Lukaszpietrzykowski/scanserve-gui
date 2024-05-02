import React from 'react';
import "./MobileLayout.css"
import BottomMenu from "../bottom_menu/BottomMenu.jsx";
import {Outlet} from "react-router-dom";
import MobileHeader from "../header/MobileHeader.jsx";

function MobileLayout() {

    return (
        <div className={"mobile-main-container"}>
            <MobileHeader/>
            <Outlet/>
            <BottomMenu/>
        </div>
    );
}

export default MobileLayout;