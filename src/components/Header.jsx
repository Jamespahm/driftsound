
function Header() {
    return (
        <header className="main-header">
            <a href="#" className="logo">DriftSound</a>

            <div className="slogan">
                <p>
                    Enjoy your space with <strong>Ambient sounds</strong>
                </p>
            </div>

            <div className="header-right">
                {/* <button className="upgrade-btn">Upgrade</button> */}
                <div className="header-icons">
                    <img className="icon-header-hide" src="/icons/volume.svg" alt="Volume" />
                    <img src="/icons/list.svg" alt="Menu" />
                    {/* <img src="/icons/user.svg" alt="User" /> */}
                </div>
            </div>
        </header>
    )
}

export default Header

