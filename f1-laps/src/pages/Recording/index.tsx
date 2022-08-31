import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";

import LapGrid from "../../Components/LapGrid/LapGrid";
import { useRecording } from "./hooks";
import { recordingColumns } from "../../Components/LapGrid/constants";

function Recording() {
  const { isRecording, toggleRecording, rows, isStateLoading, isLapsLoading } =
    useRecording();

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
      <LapGrid rows={rows} loading={isLapsLoading} columns={recordingColumns} />
    </Container>
  );
}

export default Recording;
