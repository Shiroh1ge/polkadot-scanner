import { Box } from '@mui/material';
import { GridColumns } from '@mui/x-data-grid/models/colDef/gridColDef';
import * as React from 'react';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { RenderCellExpand } from './RenderCellExpand';

export interface BlockEvent {
  id: number;
  blockNumber: number;
  eventName: string;
  eventArguments: string;
  timestamp: string;
}

const columns: GridColumns<BlockEvent> = [
  { field: 'blockNumber', headerName: 'Block #', width: 120 },
  { field: 'eventName', headerName: 'Event Name', width: 250 },
  /**
   * NOTE: The RenderCellExpand is needed to show the full event arguments in the cell, as they can be too long.
   */
  { field: 'eventArguments', headerName: 'Event Arguments', width: 350, renderCell: RenderCellExpand },
  { field: 'timestamp', headerName: 'Timestamp', width: 250 },
];

const QuickSearchToolbar = () => {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter />
    </Box>
  );
};

const EventsTable = ({ data }: { data: BlockEvent[] }) => {
  return (
    <div className="w-full h-full">
      <DataGrid
        className="w-full h-full"
        initialState={{
          sorting: {
            sortModel: [{ field: 'blockNumber', sort: 'desc' }],
          },
        }}
        components={{ Toolbar: QuickSearchToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        rows={data}
        columns={columns}
        pageSize={10}
        rowHeight={50}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
        disableSelectionOnClick={true}
        autoHeight={true}
      />
    </div>
  );
};

export default EventsTable;
