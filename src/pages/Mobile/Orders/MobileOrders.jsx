import React, {useContext, useEffect, useState} from 'react';
import "./MobileOrders.css";
import {Button, Chip} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {BasketContext} from "../../../context/Basket/BasketContext.jsx";
import axios from "axios";

function MobileOrders() {

    const {basketItems, removeItemFromBasket, clearBasketContext} = useContext(BasketContext);
    const [total, setTotal] = useState(0.0)
    useEffect(() => {
        calculateTotal();
        console.log(basketItems)

    }, [basketItems]);

    function createOrder() {
        const basketOrder = {
            menuItems: basketItems.map(item => ({menuItemId: item.menuItemInfo.id, amount: item.amount})),
            tableId: 1
        }
        // console.log(basketOrder)
        axios.post("/orders", basketOrder)
            .then(() => {
                clearBasketContext();
            })
    }

    function calculateTotal() {
        setTotal(
            basketItems.reduce((sum, basketItem) => sum + basketItem.menuItemInfo.price * basketItem.amount, 0)
        )
    }

    return (
        <div className={"mobile-orders-main-container"}>
            <div className={"mobile-order-items"}>
                {basketItems.map((item, index) => (
                    <div key={'key' + item.menuItemInfo.id + index} className={"mobile-order-item"}>
                        <div className={"order-item-img"}>
                            <img src={"data:image/png;base64, " + item.menuItemInfo.image} alt={"image"}/>
                        </div>
                        <div className={"order-item-info"}>
                        <div className={"order-item-info-inner-container"}>
                                <span><b>Cheese Burger {item.menuItemInfo.name}</b></span>
                                <Button className={"order-cancel-icon"} sx={{height: "30px"}} variant="contained"
                                        onClick={() => removeItemFromBasket(item.menuItemInfo.id)}
                                        color={"error"}
                                        disableElevation>
                                    <DeleteOutlineIcon/>
                                </Button>
                            </div>
                            <div className={"order-item-info-inner-container"}>
                                <span><b>{item.menuItemInfo.price} zł</b></span>
                                <Chip sx={{fontSize: 12}} label={"Sztuk: " + item.amount}/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={"summary-section-container"}>
                <div className={"total-amount-container"}>
                    <span><b>Suma</b></span>
                    <span><b>{total} zł</b></span>
                </div>
                <Button sx={{marginTop: 2, fontSize: 18}} variant="contained" disableElevation
                        onClick={() => createOrder()}>
                    <b>Zamów</b>
                </Button>
            </div>
        </div>
    );
}

export default MobileOrders;