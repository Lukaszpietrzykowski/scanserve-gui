import './main.css'
import {Route, Routes} from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import MenuItemManagement from "./pages/MenuItemManagement/MenuItemManagement.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import {createTheme, ThemeProvider} from "@mui/material";
import AddMenuItemPopup from "./pages/MenuItemManagement/AddMenuItem/AddMenuItemPopup.jsx";

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
                    <Route path={"/menu-management"} element={<MenuItemManagement/>}/>
                    <Route path={"/menu-management/add-menu-item"} element={<AddMenuItemPopup/>}/>
                </Route>
            </Routes>
        </ThemeProvider>
    )
}

export default App
