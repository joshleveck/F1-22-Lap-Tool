import { GridColDef } from "@mui/x-data-grid";
import {
  RecordingSaveButton,
  RecordingDeleteButton,
  SaveDeleteButton,
  SelectButton,
} from "../Buttons";

export const recordingColumns: GridColDef[] = [
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
    renderCell: RecordingDeleteButton,
  },
  {
    field: "but2",
    headerName: "",
    width: 150,
    renderCell: RecordingSaveButton,
  },
];

export const saveColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
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
    renderCell: SaveDeleteButton,
  },
];

export const selectColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
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
    renderCell: SelectButton,
  },
];
