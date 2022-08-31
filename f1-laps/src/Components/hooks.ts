import { useContext, useCallback, useState } from "react";
import { GridRowId } from "@mui/x-data-grid";

import { useRecordingQuery, useSavedQuery } from "../Query";
import {
  FormContext,
  GridInputChange,
} from "../pages/Compare/CompareForm/hooks";
import { savedRow } from "../Types/types";

export const useRecordingSaveButton = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [lapName, setLapName] = useState<string>("");
  const { saveRecordingMutation } = useRecordingQuery();
  const [id, setId] = useState<GridRowId>(-1);
  return {
    onClick: (id: GridRowId) => {
      setOpen(true);
      setId(id);
    },
    open,
    handleClose: () => {
      setLapName("");
      setOpen(false);
    },
    lapName,
    handleInput: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setLapName(e.target.value);
    },
    onSubmit: useCallback(() => {
      saveRecordingMutation.mutate({ selected: id, name: lapName });
      setOpen(false);
      setLapName("");
    }, [saveRecordingMutation, id, lapName]),
  };
};

export const useRecordingDeleteButton = () => {
  const { deleteRecordingMutation } = useRecordingQuery();
  return {
    onClick: useCallback(
      (id: GridRowId) => {
        deleteRecordingMutation.mutate([id]);
      },
      [deleteRecordingMutation]
    ),
  };
};

export const useSaveDeleteButton = () => {
  const { deleteSavedLap } = useSavedQuery();
  return {
    onClick: useCallback(
      (id: GridRowId) => {
        deleteSavedLap.mutate([id]);
      },
      [deleteSavedLap]
    ),
  };
};

export const useSelectButton = () => {
  const inputChange: GridInputChange = useContext(FormContext);
  return {
    onClick: useCallback(
      (row: savedRow) => {
        inputChange({ name: "personalLap", value: row });
      },
      [inputChange]
    ),
  };
};
