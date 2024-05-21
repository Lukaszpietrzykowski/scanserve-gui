import React, {useEffect, useState} from 'react';
import "./Orders.css"
import {Button, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check.js";

function Orders() {

    const [isLoading, setIsLoading] = useState(true)
    const [orders, setOrders] = useState([])


    useEffect(() => {
        getOrders();
    }, []);

    function getOrders() {
        try {
            setIsLoading(true);
            axios.get("/orders")
                .then(response => {
                    setOrders(response.data)
                    setIsLoading(false)
                })
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    function buttonText(orderStatus) {
        if (orderStatus === "NEW") {
            return "START PREPARING"
        } else if (orderStatus === "IN_PREPARATION") {
            return "FINISHED"
        }
    }

    function updateOrderStatus(order) {
        const orderUpdate = {
            orderStatus: order.status === "NEW" ? "IN_PREPARATION" : "COMPLETED",
            orderId: order.orderId
        }
        axios.put("/orders", orderUpdate)
            .then(getOrders)
    }


    return !isLoading ? (
        <div className={"orders-container"}>
            <h2>Orders</h2>
            <Divider/>
            <div className={"orders-table-container"}>
                <TableContainer>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center">Order Number</TableCell>
                                <TableCell align={"center"}>Table No.</TableCell>
                                <TableCell align="center">Total Price</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell sx={{width: 250}} align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order, index) => (
                                <TableRow
                                    key={order.orderId}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">{order.orderId}</TableCell>
                                    <TableCell align="center">{order.tableId}</TableCell>
                                    <TableCell align="center">{order.totalPrice}</TableCell>
                                    <TableCell align="center">{order.status}</TableCell>

                                    <TableCell align="center" sx={{width: 250}}>
                                        <Button sx={{marginLeft: '10px', width: "140px", fontSize: "10px"}}
                                                variant="contained"
                                                color={"success"}
                                                onClick={() => updateOrderStatus(order)}
                                                disableElevation>{buttonText(order.status)}</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    ) : null;
}

export default Orders;
