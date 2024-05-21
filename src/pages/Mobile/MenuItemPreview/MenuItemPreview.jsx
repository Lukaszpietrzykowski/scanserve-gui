import React, {useContext, useEffect, useState} from 'react';
import "./MenuItemPreview.css";
import {Button, Divider, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {Link, useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {BasketContext} from "../../../context/Basket/BasketContext.jsx";

function MenuItemPreview() {

    let {menuItemId} = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [menuItemInfo, setMenuItemInfo] = useState({})
    const [amount, setAmount] = React.useState('');
    const {addItemToBasket, basketItems} = useContext(BasketContext);
    const navigate = useNavigate()

    const handleChange = (event) => {
        setAmount(event.target.value);
    };

    async function getMenuItem() {
        try {
            await axios.get("/menu-items/" + menuItemId)
                .then((response) => {
                    setMenuItemInfo(response.data)
                    setIsLoading(false)
                })
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        setIsLoading(true);
        getMenuItem();
    }, []);

    return !isLoading ? (
        <div className={"menu-item-preview-container"}>
            <div className={"item-preview-top-bar"}>
                <Link to={"/mobile/menu"}>
                    <ArrowBackIosIcon style={{fontSize: 30, marginLeft: 13, position: "absolute", left: 0, top: 0}}/>
                </Link>
                <span className={"details-span"}><b>Details</b></span>
            </div>
            <div className={"menu-item-info-section"}>
                <img src={"data:image/png;base64," + menuItemInfo.image} alt={"image"}/>
                <Divider/>
                <div className={"menu-item-name-container"}>
                    <div className={"menu-item-name-text-container"}>
                        <p className={"menu-item-name"}>
                            <b>
                                {menuItemInfo.name}
                            </b>
                        </p>
                    </div>

                    <FormControl size="small">
                        <InputLabel id="amount-select">Amount</InputLabel>
                        <Select
                            style={{textDecorationColor: "black", width: 100}}
                            labelId="amount-select"
                            id="simple-amount-select"
                            value={amount}
                            label="Amount"
                            onChange={handleChange}
                        >
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className={"description-container"}>
                    <p className={"menu-item-description-p"}><b>Description</b></p>
                    <p className={"menu-item-description-details"}>
                        {menuItemInfo.description}
                    </p>
                </div>
            </div>
            <div className={"price-container"}>
                <p className={"price-tag"}><b>{menuItemInfo.price} zł</b></p>
                <Button sx={{width: 300, height: 40, margin: 1, fontSize: 14}} variant="contained"
                        disableElevation
                        onClick={() => {
                            addItemToBasket({menuItemInfo, amount: amount})
                            navigate("/mobile/menu")
                        }}>Add</Button>
            </div>
        </div>
    ) : null;
}

export default MenuItemPreview;