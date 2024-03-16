import './main.css'
import {Route, Routes} from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import MenuManagement from "./pages/MenuManagement/MenuManagement.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

function App() {

    return (
        <Routes>
            <Route path={"/"} element={<Layout/>}>
            <Route path={"/"} element={<Dashboard/>}/>
            <Route path={"/menu-management"} element={<MenuManagement/>}/>
            </Route>
        </Routes>
    )
}

export default App
