import React, {useEffect, useState} from 'react';
import "./WelcomePage.css";
import axios from "axios";
import {Link} from "react-router-dom";

function WelcomePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [tableData, setTableData] = useState({});
    const [selectedCategory, setSelectedCategory] = useState({});

    useEffect(() => {
        getTableById();
    }, []);

    function changeSelectedCategory(categoryId) {
        setSelectedCategory(tableData.menu.categories.find(category => category.categoryId === categoryId))
    }

    async function getTableById() {
        try {
            setIsLoading(true);
            await axios.get("/tables/2")
                .then((response) => {
                    setTableData(response.data)
                    setSelectedCategory(response.data.menu.categories[0])
                    setIsLoading(false);
                })
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }

    return !isLoading ? (
        <div className={"welcome-page-main-container"}>
            <div className={"mobile-categories-container"}>
                <h3>Categories</h3>
                <div className={"mobile-category-items"}>
                    {tableData.menu.categories.map((category, index) => (
                        <div key={index + category.categoryId}
                             className={`mobile-category-item ${selectedCategory.categoryId === category.categoryId ? "selected" : ""}`}
                             onClick={() => changeSelectedCategory(category.categoryId)}
                        >
                            {category.categoryName}
                        </div>
                    ))}
                </div>
            </div>
            <div className={"mobile-menu-container"}>
                <div className={"mobile-menu-items-container"}>
                    {selectedCategory.menuItems.map((menuItem, index) => (
                        <Link key={menuItem.name + index}
                              to={{pathname: "/mobile/item-preview/" + menuItem.menuItemId}}>
                            <div className={"mobile-menu-item"}>
                                <img className={"mobile-menu-item-image"}
                                     src={"data:image/png;base64," + menuItem.image} alt={"image"}/>
                                <div className={"mobile-menu-item-info"}>
                                    <span><b>{menuItem.name}</b></span>
                                    <span><b>{menuItem.price} zł</b></span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    ) : null;
}

export default WelcomePage;