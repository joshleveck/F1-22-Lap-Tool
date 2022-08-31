import React, { ChangeEventHandler } from "react";
import { MenuItem, TextField, Grid } from "@mui/material";

import { driverOptions, circuitOptions } from "./constants";
import { lapSelectValues } from "../../../Types/types";

function DriverSelection({
  values,
  handleInput,
}: {
  values: lapSelectValues;
  handleInput: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}) {
  return (
    <>
      <Grid item xs={12}>
        <TextField
          id="circuit"
          select
          name="circuit"
          label="Select Circuit"
          helperText="Please select the circuit"
          sx={{ ml: 2, mr: 2 }}
          value={values.circuit}
          onChange={handleInput}
        >
          {circuitOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="driver"
          select
          name="driver"
          label="Select Driver"
          helperText="Please select the driver"
          value={values.driver}
          onChange={handleInput}
        >
          {driverOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </>
  );
}
export default DriverSelection;
