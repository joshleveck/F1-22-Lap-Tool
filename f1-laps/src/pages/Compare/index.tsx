import React from "react";
import { Box, Container, Typography } from "@mui/material";

import CompareForm from "./CompareForm";

function Compare() {
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
          <strong>Compare Laps</strong>
        </Typography>
      </Box>
      <CompareForm />
    </Container>
  );
}

export default Compare;
