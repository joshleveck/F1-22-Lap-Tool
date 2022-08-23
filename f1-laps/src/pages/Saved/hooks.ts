import { useState } from "react";

import { row } from "../../Types/types";

export const useRecording = () => {
  const [isRecording, setRecording] = useState<Boolean>(false);
  const toggleRecording = () =>
    isRecording ? setRecording(false) : setRecording(true);

  const rows: row[] = [
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
  ];

  return { isRecording, toggleRecording, rows };
};
