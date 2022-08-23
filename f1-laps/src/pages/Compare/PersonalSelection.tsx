import React, { ChangeEventHandler } from "react";
import { Grid, Typography, Button } from "@mui/material";

import { lapSelectValues } from "../../Types/types";
import LapSelectModal from "./LapSelectModal";
import { usePersonalSelection } from "./hooks";

function PersonalSelection({
  values,
  handleInput,
}: {
  values: lapSelectValues;
  handleInput: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}) {
  const { isOpen, handleOpen, handleClose } = usePersonalSelection();
  return (
    <Grid item xs={12}>
      <LapSelectModal open={isOpen} handleClose={handleClose} />
      <Typography variant="body1" sx={{ ml: 2, mr: 2, display: "inline" }}>
        {values.personalLap === ""
          ? "No Lap Selected"
          : values.personalLap.id +
            " | " +
            values.personalLap.track +
            " | " +
            values.personalLap.startDistance +
            "-" +
            values.personalLap.finalDistance +
            " | " +
            values.personalLap.delta}
      </Typography>
      <Button variant="outlined" onClick={handleOpen}>
        Select Lap
      </Button>
    </Grid>
  );
}
export default PersonalSelection;
