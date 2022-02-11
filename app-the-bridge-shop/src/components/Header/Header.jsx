import React from 'react';
import './Header.css';
import logo from '../../img/thebridgelogo.png';

const Header = ({ children, description}) => {

    return (
        <header className="headerMain">
            <div className="divTitleAndLogo">
                <div className="divImg"><img src={logo}/></div>
                <h1>{children}</h1>
            </div>
            { description ?  <h2>{description}</h2> : null}
        </header>
    );
};

export default Header;