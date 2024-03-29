import './CategoryManagement.css'
import {Button, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Add} from "@mui/icons-material";
import {useState} from "react";
import AddCategoryPopup from "./AddCategoryPopup.jsx";

function CategoryManagement() {

    const [isPopupOpen, setPopupOpen] = useState(false);

    const togglePopup = () => {
        setPopupOpen(!isPopupOpen);
    };

    const handleSubmitForm = (formData) => {
        console.log(formData);
        setPopupOpen(false);
    };


    function createData(name, calories, fat, carbs, protein) {
        return {name, calories, fat, carbs, protein};
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];


    return (
        <div className={"category-management-container"}>
            <h2>Category Management</h2>
            <Divider/>
            <div className={"button-container"}>
                <Button variant="contained" disableElevation startIcon={<Add/>} onClick={togglePopup}> Add new
                    category</Button>
                <AddCategoryPopup isOpen={isPopupOpen} onClose={togglePopup} onSubmit={handleSubmitForm}/>
            </div>
            <div className={"table-container"}>
                <TableContainer>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center">Category Name</TableCell>
                                <TableCell align="center">Items In Category</TableCell>
                                <TableCell sx={{width: 250}} align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        1
                                    </TableCell>
                                    <TableCell align="center">{row.calories}</TableCell>
                                    <TableCell align="center">{row.fat}</TableCell>

                                    <TableCell align="center" sx={{width: 250}}>
                                        <Button sx={{marginLeft: '10px', width: "80px"}} variant="contained" disableElevation>Edit</Button>
                                        <Button sx={{marginLeft: '10px', width: "80px"}} variant="contained" disableElevation>Remove</Button>
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

export default CategoryManagement;