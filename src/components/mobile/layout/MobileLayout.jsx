import React from 'react';
import "./MobileLayout.css"
import BottomMenu from "../bottom_menu/BottomMenu.jsx";
import {Outlet} from "react-router-dom";
import MobileHeader from "../header/MobileHeader.jsx";
import {BasketProvider} from "../../../context/Basket/BasketContext.jsx";

function MobileLayout() {

    return (
        <BasketProvider>
            <div className={"mobile-main-container"}>
                <MobileHeader/>
                <Outlet/>
                <BottomMenu/>
            </div>
        </BasketProvider>
    );
}

export default MobileLayout;