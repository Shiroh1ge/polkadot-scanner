import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import Header from '../../components/Header/Header';
import BlockchainScanner from '../BlockchainScanner/BlockchainScanner';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const App = (): JSX.Element => {
    return (
        <div className="bg-slate-800 w-screen h-screen">
            <Header></Header>
            <div className="px-44">
                <ThemeProvider theme={darkTheme}>
                    <BlockchainScanner />
                </ThemeProvider>
            </div>
        </div>
    );
};

export default App;
