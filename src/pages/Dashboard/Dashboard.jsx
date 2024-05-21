import React, {useEffect, useState} from 'react';
import './Dashboard.css'
import axios from "axios";
import {Divider} from "@mui/material";
import {Bar, BarChart, CartesianGrid, Legend, Rectangle, Tooltip, XAxis, YAxis} from "recharts";

function Dashboard() {

    const [isLoading, setIsLoading] = useState(true);
    const [dashBoardInfo, setDashBoardInfo] = useState({})
    const [orderPerDayData, setOrderPerDayData] = useState([])
    const [revenuePerDayData, setrevenuePerDayData] = useState([])

    useEffect(() => {
        getDashboardData();
    }, []);
    const data = [
        {
            name: '20123-213-11',
            orders: 6,
        },
    ];

    function getDashboardData() {
        setIsLoading(true)
        axios.get("/dashboard")
            .then(resp => {
                setDashBoardInfo(resp.data);
                setOrderPerDayData(resp.data.ordersPerDay.map((order) => ({
                    orders: order.ordersAmount,
                    name: order.date
                })));
                setrevenuePerDayData(resp.data.revenuePerDay.map((order) => ({
                    revenue: order.revenue,
                    name: order.date
                })));
                setIsLoading(false);
            })
    }

    // const orderPerDayData = ordersPerDay.map((order) => ({orders: order.ordersAmount, date: order.date}))

    return !isLoading ? (
        <div className={"dashboard-main-container"}>
            <div className={"top-container"}>
                <h2>Dashboard</h2>
            </div>
            <Divider/>

            <div className={"charts-main-container"}>
                <div className={"revenue-main-container"}>
                    <div className={"revenue-values-container"}>
                        <div className={"revenue-total-container"}>
                            <span><b>Total revenue</b></span>
                            <span><b>{dashBoardInfo.revenueTotal} zł</b></span>
                        </div>
                        <div className={"revenue-today-container"}>
                            <span><b>Today's revenue</b></span>
                            <span><b>{dashBoardInfo.revenueToday === null ? 0 : dashBoardInfo.revenueToday} zł</b></span>
                        </div>
                    </div>
                    <div className={"revenue-per-day-chart"}>
                        <div className={"revenue-per-day-chart-info"}>
                            <span><b>Revenue Per Day</b></span>
                        </div>
                        <Divider/>
                        <div className={"revenue-per-day-container"}>
                            <BarChart
                                width={500}
                                height={300}
                                data={revenuePerDayData}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey="revenue" fill="#8884d8"
                                     activeBar={<Rectangle fill="pink" stroke="blue"/>}/>
                            </BarChart>
                        </div>
                    </div>
                </div>
                <div className={"dash-orders-main-container"}>
                    <div className={"order-values-container"}>
                        <div className={"orders-today-container"}>
                            <span><b>Total orders</b></span>
                            <span><b>{dashBoardInfo.ordersTotal}</b></span>
                        </div>
                        <div className={"orders-total-container"}>
                            <span><b>Today's orders</b></span>
                            <span><b>{dashBoardInfo.ordersToday}</b></span>
                        </div>
                    </div>
                    <div className={"order-per-day-chart"}>
                        <div className={"order-per-day-chart-info"}>
                            <span><b>Orders Per Day</b></span>
                        </div>
                        <Divider/>
                        <div className={"orders-per-day-container"}>
                            <BarChart
                                width={500}
                                height={300}
                                data={orderPerDayData}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey="orders" fill="#82ca9d"
                                     activeBar={<Rectangle fill="gold" stroke="purple"/>}/>
                            </BarChart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}

export default Dashboard;