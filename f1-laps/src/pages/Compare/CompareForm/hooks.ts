import { useState, ChangeEvent, useMemo, createContext, Context } from "react";
import * as _ from "lodash";

import { useSavedQuery } from "../../../Query";
import { lapSelectValues, savedRow } from "../../../Types/types";

import { millisToMinutesAndSeconds } from "../../../helper";
import { emptyLap } from "../constants";

export type GridInputChange = (e: {
  name: string;
  value: string | savedRow;
}) => void;

export const FormContext: Context<GridInputChange> =
  createContext<GridInputChange>((e) => {});

export const useCompareForm = ({
  setFormValues,
  formValues,
}: {
  setFormValues: React.Dispatch<React.SetStateAction<lapSelectValues[]>>;
  formValues: lapSelectValues[];
}) => {
  const handleEventGridInputChange = (id: number) => {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormValues(
        formValues.map((lapValue: lapSelectValues) => {
          if (lapValue.id === id) {
            return { ...lapValue, [name]: value };
          } else {
            return lapValue;
          }
        })
      );
    };
  };

  const handleGridInputChange = (id: number): GridInputChange => {
    return (e) => {
      const { name, value } = e;
      setFormValues(
        formValues.map((lapValue: lapSelectValues) => {
          if (lapValue.id === id) {
            return { ...lapValue, [name]: value };
          } else {
            return lapValue;
          }
        })
      );
    };
  };

  const submitEnabled = useMemo(
    () =>
      _.every(formValues, (lap: lapSelectValues) => {
        if (lap.lapType === "driverLap") {
          return lap.circuit !== "" && lap.driver !== "";
        } else if (lap.lapType === "personalLap") {
          return lap.personalLap !== emptyLap;
        }
        return false;
      }),
    [formValues]
  );

  return {
    handleEventGridInputChange,
    submitEnabled,
    handleGridInputChange,
  };
};

export const usePersonalSelection = (
  handleInput: GridInputChange,
  values: lapSelectValues
) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSelect: GridInputChange = (e) => {
    handleClose();
    handleInput(e);
  };
  return {
    isOpen,
    handleOpen,
    handleClose,
    handleSelect,
    value:
      values.personalLap === emptyLap
        ? "No Lap Selected"
        : values.personalLap.name +
          " | " +
          values.personalLap.track +
          " | " +
          Math.round(values.personalLap.startDistance) +
          "m - " +
          Math.round(values.personalLap.finalDistance) +
          "m | " +
          values.personalLap.delta,
  };
};

export const useLapSelectModal = () => {
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
