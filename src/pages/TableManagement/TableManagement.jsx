import React, {useEffect, useState} from 'react';
import "./TableManagement.css"
import {Autocomplete, Button, Chip, Divider, TextField} from "@mui/material";
import {Add} from "@mui/icons-material";
import tableIco from "../../assets/dining-table.svg";
import axios from "axios";
import Popup from "../../components/popup/Popup.jsx";

function TableManagement() {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [tables, setTables] = useState([]);
    const [menus, setMenus] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getMenus();
        getTables();
    }, []);

    function getTables() {
        setIsLoading(true);
        try {
            axios.get("/tables")
                .then(response => {
                    setTables(response.data)
                })
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }

    function getMenus() {
        setIsLoading(true)
        try {
            axios.get("/menus")
                .then(response => {
                    const mappedMenus = response.data.map(menu => ({
                        id: menu.id,
                        label: menu.name,
                    }))
                    setMenus(mappedMenus);
                    setIsLoading(false)
                })
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    async function removeTable(tableId) {
        try {
            await axios.delete(`/tables/${tableId}`)
                .then(() => getTables());
        } catch (error) {
            console.log(error);
        }
    }

    async function createNewTable() {
        try {
            const data = {
                ...formData,
                ["menuId"]: selectedMenu.id,
            }
            await axios.post("/tables", data)
                .then(() => getTables())
        } catch (error) {
            console.log(error)
        }
    }

    async function editTable() {
        try {
            const data = {
                ...formData,
                ["menuId"]: selectedMenu.id,
            }
            await axios.put("/tables", data)
                .then(() => getTables())
        } catch (error) {
            console.log(error);
        }
    }

    function handleChange(e) {
        setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            }
        )
    }

    function handleClosePopup() {
        setIsPopupOpen(false);
        setFormData({});
        setSelectedMenu()

    }

    function togglePopup(isEditMode, table) {
        setIsEditMode(isEditMode)
        if (isEditMode) {
            setFormData(table)
            setSelectedMenu(menus.find(menu => table.menuId === menu.id))
        }
        setIsPopupOpen(!isPopupOpen);
    }

    function handleSubmitForm(e) {
        e.preventDefault();
        if (isEditMode) {
            editTable();
        } else {
            createNewTable();
        }
        setIsPopupOpen(false);
    }

    return !isLoading ? (
        <div className={"table-management-container"}>
            <div className={"top-container"}>
                <h2>Table Management</h2>
                <Button sx={{height: "40px"}} variant="contained" size="large" disableElevation
                        onClick={() => togglePopup(false, null)}
                        startIcon={<Add/>}> Add
                    new table </Button>
            </div>
            <Divider/>
            <div className={"table-items-container"}>
                {tables.map((table, index) => (
                    <div key={index + table.id} className={"table-item-container"}>
                        <div className={"table-item-info"}>
                            <Chip sx={{height: 30, maxWidth: 200, fontSize: 14}} size="medium" label={table.name}
                                  variant="outlined"/>
                            <img style={{width: 60}} src={tableIco} alt={"table-ico"}/>
                        </div>
                        <div className={"table-details"}>
                            <p><b>Seating capacity:</b> {table.seatingCapacity} </p>
                            <p><b>Assigned menu:</b> {table.menuName}</p>
                        </div>
                        <div className={"table-item-buttons"}>
                            <Button sx={{width: 80}} variant="contained" size="medium" disableElevation
                                    onClick={() => togglePopup(true, table)}
                                    color={"success"}>Edit</Button>
                            <Button sx={{width: 80}} variant="contained" size="medium" disableElevation
                                    onClick={() => removeTable(table.id)}
                                    color={"error"}>Remove</Button>
                        </div>
                    </div>
                ))}
            </div>
            <Popup isOpen={isPopupOpen}>
                <h2>{isEditMode ? "Edit" : "Add"} new table</h2>
                <Divider/>
                <div className={"form-container"}>
                    <form onSubmit={handleSubmitForm} className={"popup-form"}>
                        <div className={"popup-form-container"}>
                            <div className={"table-form-inputs"}>
                                <TextField id="outlined-basic" label="Table Name" variant="outlined"
                                           name={"name"}
                                           value={formData.name}
                                           onChange={handleChange}
                                           margin="dense"/>
                                <TextField id="outlined-basic" label="Seating capacity" variant="outlined"
                                           name={"seatingCapacity"}
                                           value={formData.seatingCapacity}
                                           type={"number"}
                                           onChange={handleChange}
                                           margin="dense"/>
                                <Autocomplete
                                    value={selectedMenu || null}
                                    onChange={(event, value) => {
                                        setSelectedMenu(value)
                                    }}
                                    disablePortal
                                    id="cateogry-select"
                                    options={menus}
                                    renderInput={(params) => <TextField {...params} label="Menu"/>}
                                />
                            </div>
                            {isEditMode ? (
                                <div className={"qr-code-container"}>
                                    <div className={"qr-code-box"}>
                                        <img src={"data:image/png;base64," + formData.qrCode}/>
                                    </div>
                                    <div className={"qr-code-button"}>

                                    </div>
                                </div>
                            ) : null}
                        </div>
                        <div className={"form-buttons"}>
                            {isEditMode ? (
                                <Button sx={{marginLeft: '20px', width: "120px"}} variant="contained" disableElevation
                                >Download QR</Button>
                            ) : null}
                            <Button sx={{marginLeft: '20px', width: "80px"}} variant="contained" disableElevation
                                    onClick={() => handleClosePopup()}
                                    color={"error"}>Close</Button>
                            <Button sx={{marginLeft: '20px', width: "80px"}} variant="contained" disableElevation
                                    type="submit" color={"success"}>{isEditMode ? "Save" : "Add"}</Button>
                        </div>
                    </form>
                </div>
            </Popup>
        </div>
    ) : null;
}

export default TableManagement;