import React from 'react';
import "./MobileHeader.css";
import logoZTextem from "../../../assets/logo_z_tekstem.png";

function MobileHeader() {
    return (
        <div className={"mobile-header-main-container"}>
            <img src={logoZTextem} alt={"logo"}/>
        </div>
    );
}

export default MobileHeader;
