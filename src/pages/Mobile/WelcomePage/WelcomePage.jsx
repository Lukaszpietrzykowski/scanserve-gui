import React, {useEffect, useState} from 'react';
import "./WelcomePage.css";
import axios from "axios";

function WelcomePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [tableData, setTableData] = useState({});

    useEffect(() => {
        getTableById();
    }, []);

    async function getTableById() {
        try {
            setIsLoading(true);
            await axios.get("http://localhost:8080/tables/1")
                .then(response => {
                    setTableData(response.data)
                    setIsLoading(false);
                })
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }

    return (
        <div className={"welcome-page-main-container"}>
            <div className={"mobile-categories-container"}>
                <h3>Categories</h3>
                <div className={"mobile-category-items"}>
                    <div className={"mobile-category-item"}></div>
                    <div className={"mobile-category-item"}></div>
                    <div className={"mobile-category-item"}></div>
                    <div className={"mobile-category-item"}></div>
                    <div className={"mobile-category-item"}></div>
                    <div className={"mobile-category-item"}></div>
                    <div className={"mobile-category-item"}></div>
                    <div className={"mobile-category-item"}></div>
                    <div className={"mobile-category-item"}></div>
                    <div className={"mobile-category-item"}></div>
                    <div className={"mobile-category-item"}></div>
                    <div className={"mobile-category-item"}></div>
                    <div className={"mobile-category-item"}></div>
                    <div className={"mobile-category-item"}></div>
                </div>
            </div>
            <div className={"mobile-menu-container"}>
                <div className={"mobile-menu-items-container"}>
                    <div className={"mobile-menu-item"}>

                    </div>
                    <div className={"mobile-menu-item"}>

                    </div>

                    <div className={"mobile-menu-item"}>

                    </div>
                    <div className={"mobile-menu-item"}></div>
                    <div className={"mobile-menu-item"}></div>
                    <div className={"mobile-menu-item"}></div>
                    <div className={"mobile-menu-item"}></div>
                    <div className={"mobile-menu-item"}></div>
                    <div className={"mobile-menu-item"}></div>
                    <div className={"mobile-menu-item"}></div>
                    <div className={"mobile-menu-item"}></div>
                    <div className={"mobile-menu-item"}></div>
                    <div className={"mobile-menu-item"}></div>
                    <div className={"mobile-menu-item"}></div>
                    <div className={"mobile-menu-item"}></div>
                    <div className={"mobile-menu-item"}></div>
                    <div className={"mobile-menu-item"}></div>
                </div>
            </div>
        </div>
    );
}

export default WelcomePage;