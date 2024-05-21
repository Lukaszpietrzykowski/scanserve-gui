import React, {useEffect, useState} from 'react';
import "./AddCategoryPopup.css"
import {Button, Divider, FormControlLabel, Switch, TextField} from "@mui/material";
import axios from "axios";

function AddCategoryPopup({isOpen, onClose, onSubmit, isEditMode, categoryId}) {
    const [formData, setFormData] = useState({
        categoryName: "",
        displayName: "",
        active: false,
    });

    useEffect(() => {
        if (isEditMode && isOpen) {
            axios.get(`/categories/${categoryId}`)
                .then(response => {
                    const categoryData = response.data;
                    setFormData({
                        id: categoryData.id,
                        categoryName: categoryData.categoryName,
                        displayName: categoryData.displayName,
                        active: categoryData.active,
                    });
                })
                .catch(error => {
                    console.error("Error fetching category details:", error);
                });
        }
    }, [isOpen, isEditMode, categoryId]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: name === "active" ? !formData.active : value,
        });
    };

    function clearFormData() {
        setFormData({
            categoryName: "",
            displayName: "",
            active: false,
        });
        onClose();
    }

    function createCategory() {
        axios.post("/categories", formData)
            .then(onSubmit)
    }

    function editCategory() {
        axios.put(`/categories`, formData)
            .then(onSubmit)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditMode) {
            editCategory()
        } else {
            createCategory();
        }
        clearFormData()
    };

    return isOpen ? (
        <div className="popup-container">
            <div className="popup-background" onClick={onClose}></div>
            <div className="popup-content">
                <h2>{isEditMode ? "Edit" : "Add"} new category</h2>
                <Divider/>
                <div className={"form-container"}>
                    <form onSubmit={handleSubmit} className={"popup-form"}>
                        <div className={"form-inputs"}>
                            <TextField id="outlined-basic" name={"categoryName"} label="Category Name"
                                       variant="outlined"
                                       onChange={handleChange} value={formData.categoryName}/>
                            <TextField id="outlined-basic" name={"displayName"} label="Display Name" variant="outlined"
                                       onChange={handleChange} value={formData.displayName}/>
                            <FormControlLabel
                                name={"active"}
                                sx={{display: "flex", justifyContent: "flex-end", margin: 0, paddingLeft: "8px"}}
                                checked={formData.active}
                                onChange={handleChange}
                                control={<Switch color="primary"/>}
                                label="Active"
                                labelPlacement="start"
                            />
                        </div>
                        <div className={"form-buttons"}>
                            <Button sx={{marginLeft: '20px', width: "80px"}} color={"error"}  variant="contained" disableElevation
                                    onClick={clearFormData}>Close</Button>
                            <Button sx={{marginLeft: '20px', width: "80px"}}  color={"success"} variant="contained" disableElevation
                                    type="submit">{isEditMode ? "Save" : "Add"}</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    ) : null;
}

export default AddCategoryPopup;