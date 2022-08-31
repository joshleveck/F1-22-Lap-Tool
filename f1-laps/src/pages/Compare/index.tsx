import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";

import CompareForm from "./CompareForm/CompareForm";
import { useCompare } from "./hooks";
import Display from "./Display";

function Compare() {
  const {
    formValues,
    setFormValues,
    onSubmit,
    isCompareForm,
    usePrevious,
    compareOthers,
  } = useCompare();
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
      {isCompareForm ? (
        <CompareForm
          formValues={formValues}
          setFormValues={setFormValues}
          onSubmit={onSubmit}
        />
      ) : null}
      {!isCompareForm ? (
        <Display formValues={formValues} compareOthers={compareOthers} />
      ) : null}
      {/* <Button variant="contained" color="primary" onClick={usePrevious}>
        Use Previous
      </Button> */}
    </Container>
  );
}

export default Compare;
