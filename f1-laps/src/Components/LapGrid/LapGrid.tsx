import React from "react";
import { Container } from "@mui/material";
import {
  DataGrid,
  GridSelectionModel,
  GridCallbackDetails,
} from "@mui/x-data-grid";

import { columns } from "./constants";

import { row } from "../../Types/types";

function LapGrid({
  rows,
  Header,
  onSelect,
  loading,
}: {
  rows: row[] | [];
  Header?: () => JSX.Element;
  onSelect?: (
    selectionModel: GridSelectionModel,
    details: GridCallbackDetails<any>
  ) => void;
  loading?: boolean;
}) {
  return (
    <Container maxWidth="lg" sx={{ height: 400 }}>
      {Header ? <Header /> : null}
      <DataGrid
        rows={rows}
        columns={columns}
        onSelectionModelChange={onSelect ? onSelect : () => {}}
        loading={loading ? loading : false}
      />
    </Container>
  );
}

export default LapGrid;
