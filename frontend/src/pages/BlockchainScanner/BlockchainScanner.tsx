import { Table, TextField } from '@mui/material';
import React from 'react';
import EventsTable from '../../components/Table/EventsTable';

const BlockchainScanner = (): JSX.Element => {
    return (
        <div className="App">
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <TextField id="standard-basic" label="Standard" variant="standard" />
            <EventsTable></EventsTable>
        </div>
    );
};

export default BlockchainScanner;
