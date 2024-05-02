import './main.css'
import {Route, Routes} from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import MenuItemManagement from "./pages/MenuItemManagement/MenuItemManagement.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import {createTheme, ThemeProvider} from "@mui/material";
import CategoryManagement from "./pages/CategoryManagement/CategoryManagement.jsx";
import QRCodes from "./pages/QRCodes/QRCodes.jsx";
import TableManagement from "./pages/TableManagement/TableManagement.jsx";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ScanServeMenu from "./pages/Menu/ScanServeMenu.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import MenuManagement from "./pages/MenuManagement/MenuManagement.jsx";
import MobileLayout from "./components/mobile/layout/MobileLayout.jsx";
import WelcomePage from "./pages/Mobile/WelcomePage/WelcomePage.jsx";

function App() {

    const theme = createTheme({
        typography: {
            fontSize: 12,
        },
        palette: {
            primary: {
                main: '#FF7C00',
                contrastText: '#fff',
            },
            secondary: {
                main: '#0084ff',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path={"/"} element={<Layout/>}>
                    <Route path={"/"} element={<Dashboard/>}/>
                    <Route path={"/menu-item-management"} element={<MenuItemManagement/>}/>
                    <Route path={"/menu-management"} element={<MenuManagement/>}/>
                    <Route path={"/category-management"} element={<CategoryManagement/>}/>
                    <Route path={"/qr-codes"} element={<QRCodes/>}/>
                    <Route path={"/table-management"} element={<TableManagement/>}/>
                    <Route path={"/menu"} element={<ScanServeMenu/>}/>
                    <Route path={"/orders"} element={<Orders/>}/>
                </Route>
                <Route path={"/mobile"} element={<MobileLayout/>}>
                    <Route path={"/mobile/welcome"} element={<WelcomePage/>}/>
                </Route>
            </Routes>
        </ThemeProvider>
    )
}

export default App
