import { GridColumns } from '@mui/x-data-grid/models/colDef/gridColDef';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { RenderCellExpand } from './RenderCellExpand';


export interface BlockEvent {
  id: number;
  blockNumber: number;
  eventName: string;
  eventArguments: string;
}

const columns: GridColumns<BlockEvent> = [
  { field: 'blockNumber', headerName: 'Block #', width: 120 },
  { field: 'eventName', headerName: 'Event Name', width: 250 },
  /**
   * NOTE: The RenderCellExpand is needed to show the full event arguments in the cell, as they can be too long.
   */
  { field: 'eventArguments', headerName: 'Event Arguments', width: 250, renderCell: RenderCellExpand }
];


const EventsTable = ({ data }: { data: BlockEvent[] }) => {

  return (
    <div className="w-full h-full">
      <DataGrid
        className="w-full h-full"
        rows={data}
        columns={columns}
        pageSize={10}
        rowHeight={60}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
        disableSelectionOnClick={true}
        autoHeight={true}
      />
    </div>
  );
};

export default EventsTable;
