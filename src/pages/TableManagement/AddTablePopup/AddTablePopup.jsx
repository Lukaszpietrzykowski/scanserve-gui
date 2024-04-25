import React, {useState} from 'react';
import "./AddTablePopup.css"
import {Button, Divider, TextField} from "@mui/material";

function AddTablePopup({isOpen, onClose, onSubmit}) {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return isOpen ? (
        <div className="popup-container">
            <div className="popup-background" onClick={onClose}></div>
            <div className="popup-content">
                <h2>Add new table</h2>
                <Divider/>
                <div className={"form-container"}>
                    <form onSubmit={handleSubmit} className={"popup-form"}>
                        <div className={"popup-form-container"}>
                            <div className={"table-form-inputs"}>
                                <TextField id="outlined-basic" label="Table Name" variant="outlined"
                                           onChange={handleChange} margin="dense"/>
                                <TextField id="outlined-basic" label="Seating capacity" variant="outlined"
                                           onChange={handleChange} margin="dense"/>
                                <TextField id="outlined-basic" label="Menu" variant="outlined"
                                           onChange={handleChange} margin="dense"/>
                            </div>
                            <div className={"qr-code-container"}>
                                <div className={"qr-code-box"}>
                                    QR CODE
                                </div>
                                <div className={"qr-code-button"}>

                                </div>
                            </div>
                        </div>
                        <div className={"form-buttons"}>
                            <Button sx={{marginLeft: '20px', width: "120px"}} variant="contained" disableElevation
                            >Download QR</Button>
                            <Button sx={{marginLeft: '20px', width: "80px"}} variant="contained" disableElevation
                                    onClick={onClose} color={"error"}>Close</Button>
                            <Button sx={{marginLeft: '20px', width: "80px"}} variant="contained" disableElevation
                                    type="submit" color={"success"}>Add</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    ) : null;
}

export default AddTablePopup;