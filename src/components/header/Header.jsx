import './Header.css'

function Header({toggleSidebar}) {
    return (
        <div className="header">
            <div className={"icon-background"} onClick={toggleSidebar}>
                <i className="bi bi-list burger-icon"/>
            </div>
        </div>
    );
}

export default Header;