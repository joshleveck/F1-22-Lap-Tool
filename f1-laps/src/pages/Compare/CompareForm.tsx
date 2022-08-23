import React from "react";
import { Button, Box } from "@mui/material";
import CompareSelection from "./CompareSelection";
import { useCompareForm } from "./hooks";

function CompareForm() {
  const { formValues, onSubmit, handleInputChange, submitEnabled } =
    useCompareForm();
  return (
    <form onSubmit={onSubmit}>
      <Box sx={{ p: 3 }}>
        {[0, 1].map((value: number) => (
          <CompareSelection
            values={formValues[value]}
            id={value}
            handleInput={handleInputChange(value)}
          />
        ))}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!submitEnabled}
        >
          Compare
        </Button>
      </Box>
    </form>
  );
}
export default CompareForm;
