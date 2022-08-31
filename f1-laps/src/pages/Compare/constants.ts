import { lapSelectValues, savedRow } from "../../Types/types";

export const emptyLap: savedRow = {
  id: -1,
  name: "",
  track: "",
  startDistance: -1,
  finalDistance: -1,
  delta: 0,
};
export const defaultValues: lapSelectValues[] = [
  {
    id: 0,
    lapType: "",
    circuit: "",
    driver: "",
    personalLap: emptyLap,
  },
  {
    id: 1,
    lapType: "",
    circuit: "",
    driver: "",
    personalLap: emptyLap,
  },
];
