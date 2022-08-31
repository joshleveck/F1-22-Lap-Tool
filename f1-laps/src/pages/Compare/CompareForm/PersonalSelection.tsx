import React from "react";
import { Grid, Typography, Button } from "@mui/material";

import { lapSelectValues } from "../../../Types/types";
import LapSelectModal from "./LapSelectModal";
import { usePersonalSelection } from "./hooks";
import { FormContext, GridInputChange } from "./hooks";

function PersonalSelection({
  values,
  handleInput,
}: {
  values: lapSelectValues;
  handleInput: GridInputChange;
}) {
  const { isOpen, handleOpen, handleClose, handleSelect, value } =
    usePersonalSelection(handleInput, values);
  return (
    <FormContext.Provider value={handleSelect}>
      <Grid item xs={12}>
        <LapSelectModal open={isOpen} handleClose={handleClose} />
        <Typography variant="body1" sx={{ ml: 2, mr: 2, display: "inline" }}>
          {value}
        </Typography>
        <Button variant="outlined" onClick={handleOpen}>
          Select Lap
        </Button>
      </Grid>
    </FormContext.Provider>
  );
}
export default PersonalSelection;
