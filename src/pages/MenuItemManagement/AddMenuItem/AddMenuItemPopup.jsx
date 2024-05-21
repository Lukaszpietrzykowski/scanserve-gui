import React, {useEffect, useState} from "react";
import {Autocomplete, Button, Card, CardMedia, Divider, TextField} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisuallyHiddenInput from "../../../components/common/VisualyHiddenInput.jsx";
import "./AddMenuItemPopup.css";
import axios from "axios";

function AddMenuItemPopup({isOpen, onClose, onSubmit, isEditMode, menuItem}) {
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState()
    const [formData, setFormData] = useState({
        itemName: "",
        price: "",
        description: "",
        category: "",
        image: "",
    });

    useEffect(() => {
        getCategories()
        if (isEditMode && isOpen) {
            setFormData({
                id: menuItem.id,
                itemName: menuItem.name,
                price: menuItem.price,
                description: menuItem.description,
                category: menuItem.categoryId,
                image: convertToImage(menuItem.image)
            })
            console.log(formData.image)
            setImagePreview("data:image/png;base64," + menuItem.image)
            setSelectedCategory(categories.find(category => category.id === formData.category))
        }
    }, [isOpen, isEditMode, categories.length]);

    const [imagePreview, setImagePreview] = useState();

    function convertToImage(base64Image) {
        base64Image = "data:image/png;base64," + base64Image;
        const byteCharacters = atob(base64Image.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], {type: 'image/jpeg'});
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.name === "image" ? e.target.files[0] : e.target.value
        });
        if (e.target.name === "image") {
            setImagePreview(URL.createObjectURL(e.target.files[0]))
        }
    };

    function getCategories() {
        axios.get("/categories")
            .then(resp => {
                const mappedCategory = resp.data.map(category => ({
                    id: category.id,
                    label: category.categoryName,
                }))
                setCategories(mappedCategory)
            })
    }

    function createNewMenuItem() {
        const menuItem = JSON.stringify({
            name: formData.itemName,
            description: formData.description,
            price: formData.price,
            categoryId: selectedCategory.id,
        })

        const blob = new Blob([menuItem], {
            type: 'application/json'
        });

        axios.post("/menu-items", {
                menuItem: blob,
                image: formData.image
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(onSubmit)
    }

    function updateMenuItem() {
        const menuItem = JSON.stringify({
            id: formData.id,
            name: formData.itemName,
            description: formData.description,
            price: formData.price,
            categoryId: selectedCategory.id,
        })

        const blob = new Blob([menuItem], {
            type: 'application/json'
        });

        axios.put("/menu-items", {
                menuItem: blob,
                image: formData.image
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(onSubmit)
    }

    function clearForms() {
        setFormData({
            itemName: "",
            price: undefined,
            description: "",
            category: null,
            image: null
        });
        setImagePreview(null);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditMode) {
            updateMenuItem();
        } else {
            createNewMenuItem()
        }
        clearForms()
    };

    return isOpen && categories.length > 0 ? (
        <div className="popup-container">
            <div className="popup-background" onClick={onClose}></div>
            <div className="popup-content">
                <h2>{isEditMode ? "Edit" : "Add new"} menu item</h2>
                <Divider/>
                <div className={"form-container"}>
                    <form onSubmit={handleSubmit} className={"popup-form"}>
                        <div className={"form-container-wide"}>
                            <div className={"form-inputs"}>
                                <TextField id="outlined-basic" label="Item Name" variant="outlined"
                                           onChange={handleChange} name={"itemName"} value={formData.itemName}
                                           margin="dense"/>
                                <TextField id="outlined-basic" label="Price" type={"number"} variant="outlined"
                                           onChange={handleChange} name={"price"} margin="dense"
                                           value={formData.price}/>
                                <Autocomplete
                                    value={selectedCategory || null}
                                    onChange={(event, value) => {
                                        setSelectedCategory(value)
                                    }}
                                    disablePortal
                                    id="cateogry-select"
                                    options={categories}
                                    renderInput={(params) => <TextField {...params} label="Category"/>}
                                />
                                <TextField id="outlined-basic" multiline maxRows={8} label="Description"
                                           variant="outlined"
                                           onChange={handleChange} name={"description"} margin="dense"
                                           value={formData.description}/>

                            </div>
                            <Divider orientation="vertical" variant="middle" flexItem/>
                            <div className={"form-image-container"}>
                                <Card sx={{maxWidth: 345}}>
                                    <CardMedia
                                        component="img"
                                        sx={{height: 160, objectFit: "contain"}}
                                        src={imagePreview}
                                    />
                                </Card>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    sx={{width: "50%"}}
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon/>}
                                >
                                    Upload item image
                                    <VisuallyHiddenInput name={"image"} onChange={handleChange} type="file"/>
                                </Button>
                            </div>
                        </div>
                        <div className={"form-buttons"}>
                            <Button sx={{marginLeft: '20px', width: "80px"}} variant="contained" disableElevation
                                    color={"error"}
                                    onClick={onClose}>Close</Button>
                            <Button sx={{marginLeft: '20px', width: "80px"}} variant="contained" disableElevation
                                    color={"success"}
                                    type="submit">{isEditMode ? "Save" : "Add"}</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    ) : null;
}

export default AddMenuItemPopup;