import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";

import LapGrid from "../../Components/LapGrid/LapGrid";
import { useRecording } from "./hooks";

function GridHeader() {
  return (
    <Box
      component="span"
      mb={1}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Button variant="outlined">Compare Selected</Button>
      <Button variant="outlined">Delete Selected</Button>
    </Box>
  );
}

function Saved() {
  const { rows } = useRecording();
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
      {/* <LapGrid
        rows={rows}
        Header={GridHeader}
        onSelect={() => console.log("damn thats crazy")}
      /> */}
    </Container>
  );
}

export default Saved;
