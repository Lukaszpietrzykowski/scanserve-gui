import './CategoryManagement.css'
import {Button, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Add} from "@mui/icons-material";
import {useEffect, useState} from "react";
import AddCategoryPopup from "./AddCategoryPopup/AddCategoryPopup.jsx";
import axios from "axios";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

function CategoryManagement() {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [categoryIdToEdit, setCategoryIdToEdit] = useState();

    useEffect(() => {
        getCategories()
    }, [])

    function getCategories() {
        axios.get("/categories")
            .then(response => {
                setCategories(response.data)
            })
    }

    function removeCategory(categoryId) {
        axios.delete(`/categories/${categoryId}`)
            .then(() => getCategories())
    }

    const togglePopup = (popupMode, categoryId) => {
        setCategoryIdToEdit(categoryId)
        setIsEditMode(popupMode)
        setPopupOpen(!isPopupOpen);
    };

    const handleSubmitForm = (formData) => {
        console.log(formData);
        setPopupOpen(false);
        getCategories()
    };

    return (
        <div className={"category-management-container"}>
            <h2>Category Management</h2>
            <Divider/>
            <div className={"button-container"}>
                <Button variant="contained" size="large" disableElevation startIcon={<Add/>}
                        onClick={() => togglePopup(false, null)}> Add
                    new
                    category</Button>
            </div>
            <div className={"table-container"}>
                <TableContainer>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center">Category Name</TableCell>
                                <TableCell align={"center"}>Display Name</TableCell>
                                <TableCell align="center">Items In Category</TableCell>
                                <TableCell align={"center"}>Active</TableCell>
                                <TableCell sx={{width: 250}} align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow
                                    key={category.id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        1
                                    </TableCell>
                                    <TableCell align="center">{category.categoryName}</TableCell>
                                    <TableCell align="center">{category.displayName}</TableCell>
                                    <TableCell align="center">100</TableCell>
                                    <TableCell align="center">
                                        {category.active
                                            ? <CheckIcon fontSize={"large"} color={"success"}/>
                                            : <CloseIcon fontSize={"large"} color={"error"}/>}
                                    </TableCell>

                                    <TableCell align="center" sx={{width: 250}}>
                                        <Button sx={{marginLeft: '10px', width: "80px"}} variant="contained"
                                                color={"success"}
                                                onClick={() => togglePopup(true, category.id)}
                                                disableElevation>Edit</Button>
                                        <Button sx={{marginLeft: '10px', width: "80px"}} color={"error"}
                                                variant="contained" onClick={() => removeCategory(category.id)}
                                                disableElevation>Remove</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <AddCategoryPopup isOpen={isPopupOpen} onClose={togglePopup} onSubmit={handleSubmitForm}
                              isEditMode={isEditMode} categoryId={categoryIdToEdit}/>
        </div>
    );
}

export default CategoryManagement;