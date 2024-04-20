import React, {useState} from 'react';
import "./TableManagement.css"
import {Button, Chip, Divider} from "@mui/material";
import {Add} from "@mui/icons-material";
import tableIco from "../../assets/dining-table.svg";
import AddTablePopup from "./AddTablePopup/AddTablePopup.jsx";

function TableManagement() {

    const [isPopupOpen, setPopupOpen] = useState(false);

    const togglePopup = () => {
        setPopupOpen(!isPopupOpen);
    };

    const handleSubmitForm = (formData) => {
        console.log(formData);
        setPopupOpen(false);
    };

    return (
        <div className={"table-management-container"}>
            <div className={"top-container"}>
                <h2>Table Management</h2>
                <Button sx={{height: "40px"}} variant="contained" size="large" disableElevation onClick={togglePopup}
                        startIcon={<Add/>}> Add
                    new table </Button>
                <AddTablePopup isOpen={isPopupOpen} onClose={togglePopup} onSubmit={handleSubmitForm}/>
            </div>
            <Divider/>
            <div className={"table-items-container"}>
                <div className={"table-item-container"}>
                    <div className={"table-item-info"}>
                        <Chip sx={{height: 30, width: 80, fontSize: 14}} size="medium" label="Table 1 "
                              variant="outlined"/>
                        <img style={{width: 60}} src={tableIco} alt={"table-ico"}/>
                    </div>
                    <div className={"table-details"}>
                        <p><b>Seating capacity:</b> 5 </p>
                        <p><b>Assigned menu:</b> Spring Menu</p>
                    </div>
                    <div className={"table-item-buttons"}>
                        <Button sx={{width: 80}} variant="contained" size="medium" disableElevation>Edit</Button>
                        <Button sx={{width: 80}} variant="contained" size="medium" disableElevation>Remove</Button>
                    </div>
                </div>
                <div className={"table-item-container"}>

                </div>
                <div className={"table-item-container"}>

                </div>
                <div className={"table-item-container"}>

                </div>
                <div className={"table-item-container"}>

                </div>
            </div>
        </div>
    );
}

export default TableManagement;