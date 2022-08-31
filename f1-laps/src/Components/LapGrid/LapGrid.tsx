import React from "react";
import { Container } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { recordedRow, savedRow } from "../../Types/types";

function LapGrid({
  rows,
  loading,
  columns,
}: {
  rows: recordedRow[] | savedRow[] | [];
  loading?: boolean;
  columns: GridColDef[];
}) {
  return (
    <Container maxWidth="lg" sx={{ height: 400 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading ? loading : false}
      />
    </Container>
  );
}

export default LapGrid;
