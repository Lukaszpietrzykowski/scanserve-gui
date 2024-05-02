import React, {useEffect, useState} from 'react';
import {
    Autocomplete,
    Button,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import {Add} from "@mui/icons-material";
import axios from "axios";
import "./MenuManagement.css"
import Popup from "../../components/popup/Popup.jsx";

function MenuManagement() {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [menus, setMenus] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([])
    const [formData, setFormData] = useState({})
    const [isEditMode, setIsEditMode] = useState(false);

    function handleOpenPopup(isEditMode, menu) {
        setIsEditMode(isEditMode)
        if (isEditMode) {
            setFormData(menu)
            setSelectedCategories(categories.filter(category => menu.categoryIds.includes(category.id)))
        }
        setIsPopupOpen(true);
    }

    function handleClosePopup() {
        setIsPopupOpen(false);
        clearFormFields()
    }

    function handleChange(e) {
        const {name, value} = e.target
        setFormData({
                ...formData,
                [name]: value,
            }
        )
    }

    function clearFormFields() {
        setFormData({});
        setSelectedCategories([]);
        setIsEditMode(false);
        setIsPopupOpen(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (isEditMode) {
            updateMenu()
        } else {
            createMenu();
        }
        getMenus();
        clearFormFields();
    }

    useEffect(() => {
        getCategories()
        getMenus()
    }, []);

    function createMenu() {
        const data = {
            ...formData,
            ["categoryIds"]: selectedCategories.map(value => value.id)
        }
        console.log(data)
        axios.post("http://localhost:8080/menus", data)
            .then(() => console.log("added"))
    }

    function removeMenu(menuId) {
        axios.delete(`http://localhost:8080/menus/${menuId}`)
            .then(() => {
                console.log("removed")
                getMenus();
            })
    }

    function updateMenu() {
        const data = {
            ...formData,
            ["categoryIds"]: selectedCategories.map(value => value.id)
        }
        axios.put("http://localhost:8080/menus", data)
            .then(() => {
                console.log("updated")
                getMenus();
            })
    }

    async function getMenus() {
        setIsLoading(true)
        try {
            const resopnse = await axios.get("http://localhost:8080/menus");
            const result = await resopnse.data;
            setMenus(result);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    async function getCategories() {
        try {
            const response = await axios.get("http://localhost:8080/categories");
            const result = await response.data;
            const mappedCategories = await result.map(category => ({
                id: category.id,
                label: category.categoryName,
            }))
            setCategories(mappedCategories);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }


    return isLoading === false ? (
        <div className={"menu-management-container"}>
            <h2>Menu Management</h2>
            <Divider/>
            <div className={"button-container"}>
                <Button variant="contained" size="large" disableElevation startIcon={<Add/>}
                        onClick={() => handleOpenPopup(false)}> Add new menu</Button>
            </div>
            <div className={"table-container"}>
                <TableContainer>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center">Menu Name</TableCell>
                                <TableCell align={"center"}>Display Name</TableCell>
                                <TableCell align="center">Categories</TableCell>
                                <TableCell sx={{width: 250}} align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {menus.map((menu, index) => (
                                <TableRow
                                    key={menu.id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">{menu.name}</TableCell>
                                    <TableCell align="center">{menu.displayName}</TableCell>
                                    <TableCell align="center">{menu.categoryIds.length}</TableCell>
                                    {/*<TableCell align="center">*/}
                                    {/*    {category.active*/}
                                    {/*        ? <CheckIcon fontSize={"large"} color={"success"}/>*/}
                                    {/*        : <CloseIcon fontSize={"large"} color={"error"}/>}*/}
                                    {/*</TableCell>*/}

                                    <TableCell align="center" sx={{width: 250}}>
                                        <Button sx={{marginLeft: '10px', width: "80px"}} variant="contained"
                                                color={"success"}
                                                onClick={() => handleOpenPopup(true, menu)}
                                                disableElevation>Edit</Button>
                                        <Button sx={{marginLeft: '10px', width: "80px"}} color={"error"}
                                                variant="contained" onClick={() => removeMenu(menu.id)}
                                                disableElevation>Remove</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Popup isOpen={isPopupOpen}>
                <h2>{isEditMode ? "Edit" : "Add new"} menu</h2>
                <Divider/>
                <div className={"form-container"}>
                    <form onSubmit={handleSubmit} className={"popup-form"}>
                        <div className={"menu-management-form-inputs"}>
                            <TextField id="outlined-basic" name={"name"} label="Menu Name"
                                       variant="outlined"
                                       onChange={handleChange} value={formData.name}/>
                            <TextField id="outlined-basic" name={"displayName"} label="Display Name"
                                       variant="outlined"
                                       onChange={handleChange} value={formData.displayName}/>
                            <Autocomplete
                                value={selectedCategories || null}
                                onChange={(event, value) => {
                                    setSelectedCategories(value)
                                }}
                                multiple
                                disablePortal
                                id="cateogry-select"
                                options={categories}
                                renderInput={(params) => <TextField {...params} label="Categories"/>}
                            />
                            {/*<FormControlLabel*/}
                            {/*    name={"active"}*/}
                            {/*    sx={{display: "flex", justifyContent: "flex-end", margin: 0, paddingLeft: "8px"}}*/}
                            {/*    checked={formData.active}*/}
                            {/*    onChange={handleChange}*/}
                            {/*    control={<Switch color="primary"/>}*/}
                            {/*    label="Active"*/}
                            {/*    labelPlacement="start"*/}
                            {/*/>*/}
                        </div>
                        <div className={"form-buttons"}>
                            <Button sx={{marginLeft: '20px', width: "80px"}} color={"error"} variant="contained"
                                    disableElevation
                                    onClick={() => handleClosePopup()}>Close</Button>
                            <Button sx={{marginLeft: '20px', width: "80px"}} color={"success"} variant="contained"
                                    disableElevation
                                    type="submit">{isEditMode ? "Save" : "Add"}</Button>
                        </div>
                    </form>
                </div>
            </Popup>
        </div>
    ) : null;
}

export default MenuManagement;
