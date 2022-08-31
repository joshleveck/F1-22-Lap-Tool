import { useSavedQuery } from "../../Query";
import { millisToMinutesAndSeconds } from "../../helper";

import { savedRow } from "../../Types/types";

export const useSaved = () => {
  const { useSavedLaps } = useSavedQuery();
  const { data: lapData, isLoading: isLapsLoading } = useSavedLaps();

  const rows: savedRow[] | [] = lapData
    ? lapData.map((lap: any) => ({
        id: lap.id,
        name: lap.name,
        delta: millisToMinutesAndSeconds(lap.delta),
        startDistance: lap.start_distance,
        finalDistance: lap.final_distance,
        track: lap.track,
      }))
    : [];

  return { rows, isLapsLoading };
};
