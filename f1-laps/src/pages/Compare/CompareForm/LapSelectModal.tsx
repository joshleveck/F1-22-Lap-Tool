import React from "react";
import { Typography, Box, Modal } from "@mui/material";

import { useLapSelectModal } from "./hooks";
import LapGrid from "../../../Components/LapGrid/LapGrid";
import { selectColumns } from "../../../Components/LapGrid/constants";

function LapSelectModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: any;
}) {
  const { rows, isLapsLoading } = useLapSelectModal();
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          bgcolor: "#171717",
          color: "#FFF",
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Select Lap
        </Typography>
        <LapGrid rows={rows} columns={selectColumns} loading={isLapsLoading} />
      </Box>
    </Modal>
  );
}
export default LapSelectModal;
