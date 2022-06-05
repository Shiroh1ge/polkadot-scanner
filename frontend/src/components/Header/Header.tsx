import React from 'react';

const Header = (): JSX.Element => {
    return (
        <div className="bg-blue-900 w-full h-16">
            <div className="flex items-center center px-44 h-full">
                <img src="../../logo.svg" className="w-12 h-12" alt="logo"/>
                <h1 className="text-blue-50">Blockchain Scanner</h1>
            </div>
        </div>
    );
};

export default Header;
