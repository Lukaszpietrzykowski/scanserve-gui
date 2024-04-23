import './MenuItemManagement.css'
import {Button, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Add} from "@mui/icons-material";
import {useEffect, useState} from "react";
import AddMenuItemPopup from "./AddMenuItem/AddMenuItemPopup.jsx";
import axios from "axios";

function MenuItemManagement() {

    const [isEditMode, setIsEditMode] = useState(false);
    const [menuItemToEdit, setMenuItemToEdit] = useState();
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([{
        id: undefined,
        name: "",
        price: undefined,
        description: "",
        categoryId: undefined,
        categoryName: "",
        image: undefined
    }])

    useEffect(() => {
        getMenuItems()
    }, []);

    const togglePopup = (isEditMode, menuItem) => {
        setMenuItemToEdit(menuItem)
        setIsEditMode(isEditMode)
        setPopupOpen(!isPopupOpen);
    };

    const handleSubmitForm = (formData) => {
        console.log(formData);
        setPopupOpen(false);
    };

    function getMenuItems() {
        axios.get("http://localhost:8080/menu-items")
            .then((resp) => {
                setMenuItems(resp.data)
            })
    }

    function removeMenuItem(menuItemId) {
        axios.delete(`http://localhost:8080/menu-items/${menuItemId}`)
            .then(getMenuItems)
    }

    return (
        <div className={"menu-management-container"}>
            <h2>Menu Item Management</h2>
            <Divider/>
            <div className={"button-container"}>
                <Button variant="contained" size="large" disableElevation startIcon={<Add/>}
                        onClick={() => togglePopup(false, null)}> Add
                    new
                    item</Button>
                {
                    isPopupOpen ?
                        <AddMenuItemPopup isOpen={isPopupOpen} onClose={togglePopup} onSubmit={handleSubmitForm}
                                          isEditMode={isEditMode} menuItem={menuItemToEdit}/>
                        : null
                }
            </div>
            <div className={"table-container"}>
                <TableContainer>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="center">Category</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell sx={{width: 250}} align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {menuItems.map((menuItem) => (
                                <TableRow
                                    key={menuItem.id + menuItem.name}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {menuItem.name}
                                    </TableCell>
                                    <TableCell align="center">{menuItem.categoryName}</TableCell>
                                    <TableCell align="center">{menuItem.price} zł</TableCell>
                                    <TableCell align="center">
                                        <Button sx={{marginLeft: '10px', width: "80px"}} variant="contained"
                                                color={"success"}
                                                onClick={() => togglePopup(true, menuItem)}
                                                disableElevation>Edit</Button>
                                        <Button sx={{marginLeft: '10px', width: "80px"}} variant="contained"
                                                color={"error"}
                                                onClick={() => removeMenuItem(menuItem.id)}
                                                disableElevation>Remove</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default MenuItemManagement;