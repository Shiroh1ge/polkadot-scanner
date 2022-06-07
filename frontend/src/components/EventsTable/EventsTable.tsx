import { withStyles } from '@mui/styles';
import { GridColumns } from '@mui/x-data-grid/models/colDef/gridColDef';
import * as React from 'react';
import { DataGrid, GridRowHeightParams } from '@mui/x-data-grid';


export interface BlockEvent {
  id: number;
  blockNumber: number;
  eventName: string;
  eventArguments: string;
}

const rows: BlockEvent[] = [
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

const columns: GridColumns<BlockEvent> = [
  { field: 'blockNumber', headerName: 'Block #', width: 120 },
  { field: 'eventName', headerName: 'Event Name', width: 250 },
  { field: 'eventArguments', headerName: 'Event Arguments', width: 350 }
];

const StyledDataGrid = withStyles({
  root: {
    '& .MuiDataGrid-renderingZone': {
      maxHeight: 'none !important'
    },
    '& .MuiDataGrid-cellContent': {
      lineHeight: 'unset !important',
      maxHeight: 'none !important',
      whiteSpace: 'normal',
      'overflowWrap': 'break-word'

},
    '& .MuiDataGrid-row': {
      maxHeight: 'none !important'
    }
  }
})(DataGrid);


const EventsTable = ({ data }: { data: BlockEvent[] }) => {

  return (
    <div className="w-full h-full">
      <StyledDataGrid
        className="w-full h-full"
        rows={data}
        // @ts-ignore the styled data grid doesn't recognize the column generic type correctly
        columns={columns}
        pageSize={10}
        rowHeight={55}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
        disableSelectionOnClick={true}
        autoHeight={true}
      />
    </div>
  );
};

export default EventsTable;
