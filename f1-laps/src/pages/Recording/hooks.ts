import { useCallback } from "react";
import { useRecordingQuery } from "../../Query/index";

import { row } from "../../Types/types";

const millisToMinutesAndSeconds = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = (millis % 60000) / 1000;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const useRecording = () => {
  const { useRecordingState, setRecordingMutation, useRecordingBuffer } =
    useRecordingQuery();

  const { data: lapData, isLoading: isLapsLoading } = useRecordingBuffer();

  const { isLoading: isStateLoading, data: recState } = useRecordingState();

  const toggleRecording = useCallback(() => {
    if (recState !== "stop") {
      setRecordingMutation.mutate("stop");
    } else {
      setRecordingMutation.mutate("start");
    }
  }, [recState, setRecordingMutation]);

  const rows: row[] | [] = lapData
    ? lapData.map((lap: any) => ({
        id: lap.id,
        delta: millisToMinutesAndSeconds(lap.delta),
        startDistance: lap.start_distance,
        finalDistance: lap.final_distance,
        track: lap.track,
      }))
    : [];

  return {
    isRecording: recState !== "stop",
    toggleRecording,
    rows,
    isStateLoading,
    isLapsLoading,
  };
};
