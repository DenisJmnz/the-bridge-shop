import React from 'react';
import './Footer.css';

const Footer = ({license, addressInfo}) => {
    return (
        <footer className="classFooter">
            <ul>
                <li>{license}</li>
                <li>{addressInfo}</li>
            </ul>
        </footer>
    );
};

export default Footer;