import React from "react";
import { Typography, Box, Modal, Button } from "@mui/material";

import LapGrid from "../../Components/LapGrid/LapGrid";

function LapSelectModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: any;
}) {
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
        {/* <LapGrid
          rows={[
            {
              id: 0,
              track: "Australia",
              startDistance: 0,
              finalDistance: 5000,
              delta: 1600,
            },
            {
              id: 1,
              track: "Australia",
              startDistance: 0,
              finalDistance: 5000,
              delta: 1600,
            },
          ]}
          Header={() => <></>}
          onSelect={() => console.log("damn thats crazy")}
        /> */}
        <Box
          component="span"
          mt={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <div></div>
          <Button variant="contained">Select</Button>
        </Box>
      </Box>
    </Modal>
  );
}
export default LapSelectModal;
