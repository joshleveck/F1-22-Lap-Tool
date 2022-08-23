import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";

import LapGrid from "../../Components/LapGrid/LapGrid";
import { useRecording } from "./hooks";

function Recording() {
  const {
    isRecording,
    toggleRecording,
    rows,
    isStateLoading,
    isLapsLoading,
    onSelect,
    onDelete,
    noneSelected,
  } = useRecording();

  const GridHeader = () => (
    <Box
      component="span"
      mb={1}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <div>
        <Button variant="outlined">Save Selected</Button>
      </div>
      <Button
        variant="outlined"
        onClick={onDelete}
        disabled={isLapsLoading || noneSelected}
      >
        Delete Selected
      </Button>
    </Box>
  );

  return (
    <Container sx={{ p: 3, color: "#fff" }}>
      <Box
        component="span"
        mb={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h3">
          <strong>Record Your Laps</strong>
        </Typography>
        <Button
          variant={isRecording ? "contained" : "outlined"}
          color="error"
          size="large"
          onClick={() => toggleRecording()}
          disabled={isStateLoading}
        >
          {isRecording ? "Recording" : "Start Recording"}
        </Button>
      </Box>
      <LapGrid
        rows={rows}
        Header={GridHeader}
        onSelect={onSelect}
        loading={isLapsLoading}
      />
    </Container>
  );
}

export default Recording;
