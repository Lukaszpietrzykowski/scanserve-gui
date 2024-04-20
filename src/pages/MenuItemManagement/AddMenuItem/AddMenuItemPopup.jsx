import React, {useState} from "react";
import {Button, Divider, TextField} from "@mui/material";

function AddMenuItemPopup({isOpen, onClose, onSubmit}) {
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
                <h2>Add new menu item</h2>
                <Divider/>
                <div className={"form-container"}>
                    <form onSubmit={handleSubmit} className={"popup-form"}>
                        <div className={"form-inputs"}>
                            <TextField id="outlined-basic" label="Item Name" variant="outlined"
                                       onChange={handleChange} margin="dense"/>
                            <TextField id="outlined-basic" label="Price" variant="outlined"
                                       onChange={handleChange} margin="dense"/>
                            <TextField id="outlined-basic" label="Category" variant="outlined"
                                       onChange={handleChange} margin="dense"/>
                            <TextField id="outlined-basic" label="Image" variant="outlined"
                                       onChange={handleChange} margin="dense"/>
                            <TextField id="outlined-basic" label="Description" variant="outlined"
                                       onChange={handleChange} margin="dense"/>
                        </div>
                        <div className={"form-buttons"}>
                            <Button sx={{marginLeft: '20px', width: "80px"}} variant="contained" disableElevation
                                    onClick={onClose}>Close</Button>
                            <Button sx={{marginLeft: '20px', width: "80px"}} variant="contained" disableElevation
                                    type="submit">Add</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    ) : null;
}

export default AddMenuItemPopup;