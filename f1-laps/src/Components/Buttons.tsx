import { Button, Modal, Box, Typography, TextField } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";

import {
  useRecordingDeleteButton,
  useRecordingSaveButton,
  useSaveDeleteButton,
  useSelectButton,
} from "./hooks";

export const RecordingSaveButton = (
  params: GridRenderCellParams<any, any, any>
) => {
  const { onClick, open, handleClose, lapName, handleInput, onSubmit } =
    useRecordingSaveButton();
  return (
    <>
      <Button
        variant="outlined"
        sx={{ ml: 3 }}
        onClick={() => onClick(params.id)}
      >
        Save
      </Button>
      <form onSubmit={onSubmit}>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              bgcolor: "#171717",
              color: "#FFF",
              p: 4,
            }}
          >
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Lap Name
            </Typography>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              value={lapName}
              onChange={handleInput}
            />
            <Box
              component="span"
              mb={1}
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={onSubmit}
              >
                Save
              </Button>
              <div></div>
            </Box>
          </Box>
        </Modal>
      </form>
    </>
  );
};

export const RecordingDeleteButton = (
  params: GridRenderCellParams<any, any, any>
) => {
  const { onClick } = useRecordingDeleteButton();
  return (
    <Button
      variant="outlined"
      sx={{ ml: 3 }}
      onClick={() => onClick(params.id)}
    >
      Delete
    </Button>
  );
};

export const SaveDeleteButton = (
  params: GridRenderCellParams<any, any, any>
) => {
  const { onClick } = useSaveDeleteButton();
  return (
    <Button
      variant="outlined"
      sx={{ ml: 3 }}
      onClick={() => onClick(params.id)}
    >
      Delete
    </Button>
  );
};

export const SelectButton = (params: GridRenderCellParams<any, any, any>) => {
  const { onClick } = useSelectButton();
  return (
    <Button
      variant="outlined"
      sx={{ ml: 3 }}
      onClick={() => onClick(params.row)}
    >
      Select
    </Button>
  );
};
