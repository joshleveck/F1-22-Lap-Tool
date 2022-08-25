import { GridColDef } from "@mui/x-data-grid";
import { SaveButton, DeleteButton } from "../Buttons";

export const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "track",
    headerName: "Track",
    width: 200,
  },
  {
    field: "startDistance",
    headerName: "Start Distance",
    type: "number",
    width: 150,
  },
  {
    field: "finalDistance",
    headerName: "Final Distance",
    type: "number",
    width: 150,
  },
  {
    field: "delta",
    headerName: "Delta Time",
    type: "number",
    width: 150,
  },
  {
    field: "but1",
    headerName: "",
    width: 150,
    renderCell: DeleteButton,
  },
  {
    field: "but2",
    headerName: "",
    width: 150,
    renderCell: SaveButton,
  },
];
