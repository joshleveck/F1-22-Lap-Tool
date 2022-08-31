import React from "react";

import { Paper, Typography } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

const Chart = ({
  title,
  data,
  yAxis,
}: {
  title: string;
  data: any;
  yAxis: string;
}) => {
  return (
    <Paper elevation={4} sx={{ p: 2, m: 2 }}>
      <Typography variant="h5" sx={{ m: 1 }}>
        {title}
      </Typography>
      <LineChart width={1000} height={200}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="distance"
          type="number"
          allowDuplicatedCategory={false}
        />
        <YAxis dataKey={yAxis} />
        <Legend />
        {data.map((s: any, i: number) => (
          <Line
            dataKey={yAxis}
            data={s.data}
            name={s.person}
            key={i}
            dot={false}
            stroke={s.color}
          />
        ))}
      </LineChart>
    </Paper>
  );
};

export default Chart;
