import React from 'react';
import './MenuManagement.css'
import {Button, Table} from "@mui/joy";
import {Add} from "@mui/icons-material";

function MenuManagement() {

    return (
        <div className={"menu-management-container"}>
            <h2>Menu Management</h2>
            <div className={"button-container"}>
                <Button startDecorator={<Add/>}> Add new item</Button>
            </div>
            <Table>
                <thead>
                <tr>
                    <th style={{width: '40%'}}>Dessert (100g serving)</th>
                    <th>Calories</th>
                    <th>Fat&nbsp;(g)</th>
                    <th>Carbs&nbsp;(g)</th>
                    <th>Protein&nbsp;(g)</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Frozen yoghurt</td>
                    <td>159</td>
                    <td>6</td>
                    <td>24</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td>Ice cream sandwich</td>
                    <td>237</td>
                    <td>9</td>
                    <td>37</td>
                    <td>4.3</td>
                </tr>
                <tr>
                    <td>Eclair</td>
                    <td>262</td>
                    <td>16</td>
                    <td>24</td>
                    <td>6</td>
                </tr>
                <tr>
                    <td>Cupcake</td>
                    <td>305</td>
                    <td>3.7</td>
                    <td>67</td>
                    <td>4.3</td>
                </tr>
                <tr>
                    <td>Gingerbread</td>
                    <td>356</td>
                    <td>16</td>
                    <td>49</td>
                    <td>3.9</td>
                </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default MenuManagement;