import React from "react";
import { Button, Box } from "@mui/material";

import { lapSelectValues } from "../../../Types/types";
import CompareSelection from "./CompareSelection";
import { useCompareForm } from "./hooks";

function CompareForm({
  setFormValues,
  formValues,
  onSubmit,
}: {
  setFormValues: React.Dispatch<React.SetStateAction<lapSelectValues[]>>;
  formValues: lapSelectValues[];
  onSubmit: (e: any) => void;
}) {
  const { handleGridInputChange, handleEventGridInputChange, submitEnabled } =
    useCompareForm({
      setFormValues,
      formValues,
    });
  return (
    <form onSubmit={onSubmit}>
      <Box sx={{ p: 3 }}>
        {[0, 1].map((value: number) => (
          <CompareSelection
            key={value}
            values={formValues[value]}
            id={value}
            handleInput={handleGridInputChange(value)}
            handleEventInput={handleEventGridInputChange(value)}
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
