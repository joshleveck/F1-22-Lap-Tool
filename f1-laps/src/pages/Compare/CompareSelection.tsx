import React, { ChangeEventHandler } from "react";
import { MenuItem, TextField, Grid, Paper, Typography } from "@mui/material";

import DriverSelection from "./DriverSelection";
import { lapOptions } from "./constants";

import { lapSelectValues } from "../../Types/types";
import PersonalSelection from "./PersonalSelection";

function CompareSelection({
  values,
  id,
  handleInput,
}: {
  values: lapSelectValues;
  id: number;
  handleInput: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}) {
  return (
    <Paper sx={{ p: 3, mb: 2 }} elevation={4}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Lap Number {id + 1}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="lap-type"
            name="lapType"
            select
            label="Select Lap Type"
            helperText="Please select the lap type"
            value={values.lapType}
            onChange={handleInput}
          >
            {lapOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {values.lapType === "driver" ? (
          <DriverSelection values={values} handleInput={handleInput} />
        ) : null}
        {values.lapType === "personal" ? (
          <PersonalSelection values={values} handleInput={handleInput} />
        ) : null}
      </Grid>
    </Paper>
  );
}
export default CompareSelection;
