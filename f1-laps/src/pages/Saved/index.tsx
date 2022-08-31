import React from "react";
import { Box, Container, Typography } from "@mui/material";

import LapGrid from "../../Components/LapGrid/LapGrid";
import { useSaved } from "./hooks";
import { saveColumns } from "../../Components/LapGrid/constants";

function Saved() {
  const { rows, isLapsLoading } = useSaved();
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
          <strong>Saved Laps</strong>
        </Typography>
      </Box>
      <LapGrid rows={rows} columns={saveColumns} loading={isLapsLoading} />
    </Container>
  );
}

export default Saved;
