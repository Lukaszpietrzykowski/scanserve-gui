import React from 'react';
import "./ScanServeMenu.css"
import {Divider} from "@mui/material";
import burgir from "../../assets/burgir.png"

function ScanServeMenu() {
    return (
        <div className={"menu-container"}>
            <div className={"menu-top-container"}>
                <h2>Menu</h2>
            </div>
            <Divider/>
            <div className={"menu-categories-container"}>
                <span><b>Category:</b></span>
                <div className={"menu-category-item"}>
                    <span>Napoje</span>
                </div>
                <div className={"menu-category-item"}>
                    <span>Pizza</span>
                </div>
                <div className={"menu-category-item"}>

                </div>
                <div className={"menu-category-item"}>

                </div>
            </div>
            <div className={"preview-menu-items-container"}>
                <div className={"preview-menu-item"}>
                    <img className={"menu-food-image"} src={burgir} alt={"burgir"}/>
                    <div className={"menu-item-info"}>
                        <span><b>Burgir</b></span>
                        <span>35 zł</span>
                    </div>
                </div>
                <div className={"preview-menu-item"}>

                </div>
                <div className={"preview-menu-item"}>

                </div>
                <div className={"preview-menu-item"}>

                </div>
            </div>
        </div>
    );
}

export default ScanServeMenu;