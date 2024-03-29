import React, {useState} from 'react';
import "./AddCategoryPopup.css"
import {Button, Divider, TextField} from "@mui/material";

function AddCategoryPopup({isOpen, onClose, onSubmit}) {
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
                <h2>Add new category</h2>
                <Divider/>
                <div className={"form-container"}>
                    <form onSubmit={handleSubmit} className={"popup-form"}>
                        <div className={"form-inputs"}>
                            <TextField id="outlined-basic" label="Category Name" variant="outlined"
                                       onChange={handleChange}/>
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

export default AddCategoryPopup;