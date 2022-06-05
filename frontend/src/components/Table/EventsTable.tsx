import { GridColumns } from '@mui/x-data-grid/models/colDef/gridColDef';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';


interface Data {
    id: number;
    blockNumber: number;
    eventName: string;
    eventArguments: string;
}

const rows: Data[] = [
    {
        id: 0,
        blockNumber: 1,
        eventName: 'test_1',
        eventArguments: 'test, test'
    },
    {
        id: 1,
        blockNumber: 2,
        eventName: 'test_2',
        eventArguments: 'test_2, test_2'
    },
    {
        id: 2,
        blockNumber: 1,
        eventName: 'test_1',
        eventArguments: 'test, test'
    },
    {
        id: 3,
        blockNumber: 2,
        eventName: 'test_2',
        eventArguments: 'test_2, test_2'
    },
    {
        id: 4,
        blockNumber: 1,
        eventName: 'test_1',
        eventArguments: 'test, test'
    },
    {
        id: 5,
        blockNumber: 2,
        eventName: 'test_2',
        eventArguments: 'test_2, test_2'
    },
    {
        id: 6,
        blockNumber: 1,
        eventName: 'test_1',
        eventArguments: 'test, test'
    },
    {
        id: 7,
        blockNumber: 2,
        eventName: 'test_2',
        eventArguments: 'test_2, test_2'
    }
];

const columns: GridColumns<Data> = [
    { field: 'blockNumber', headerName: 'Block #',  width: 120},
    { field: 'eventName', headerName: 'Event Name', width: 250 },
    { field: 'eventArguments', headerName: 'Event Arguments', width: 250  },
];


const EventsTable = () => {

    return (
        <div className="w-full h-full">
            <DataGrid
                className="w-full h-full"
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                checkboxSelection={false}
                disableSelectionOnClick={true}
                autoHeight={true}
            />
        </div>
    );
};

export default EventsTable;
