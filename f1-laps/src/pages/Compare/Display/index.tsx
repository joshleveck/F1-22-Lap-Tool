import React from "react";
import { Box, Container, Button } from "@mui/material";

import { lapSelectValues } from "../../../Types/types";
import { useDisplay } from "./hooks";
import Chart from "./Chart";

const charts = [
  { title: "Speed", yAxis: "speed" },
  { title: "Throttle", yAxis: "throttle" },
  { title: "Gear", yAxis: "gear" },
  { title: "RPM", yAxis: "rpm" },
];

function Display({
  formValues,
  compareOthers,
}: {
  formValues: lapSelectValues[];
  compareOthers: any;
}) {
  const { loadData, lapData, isLapsLoading, resetCompare, loadCompare } =
    useDisplay(formValues);
  return (
    <Container sx={{ p: 3, color: "#fff" }}>
      <Box sx={{ p: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={loadCompare}
          sx={{ mr: 2 }}
        >
          Refresh
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={resetCompare}
          sx={{ mr: 2 }}
        >
          Reset Data
        </Button>
        <Button variant="contained" color="primary" onClick={loadData}>
          Load Data
        </Button>
        {!isLapsLoading && lapData
          ? charts.map(({ title, yAxis }) => (
              <Chart data={lapData} title={title} yAxis={yAxis} key={yAxis} />
            ))
          : null}
        <Button variant="contained" color="primary" onClick={compareOthers}>
          Compare others
        </Button>
      </Box>
    </Container>
  );
}

export default Display;
