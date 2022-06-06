import React from 'react';
import logo from '../../assets/logo.svg'

const Header = (): JSX.Element => {
    return (
        <div className="bg-blue-900 w-full h-16">
            <div className="flex items-center center px-44 h-full">
                <img src={logo} className="w-12 h-12" alt="logo"/>
                <h2 className="text-blue-50 text m-0">Blockchain Scanner</h2>
            </div>
        </div>
    );
};

export default Header;
