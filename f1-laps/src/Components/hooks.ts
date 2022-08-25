import { GridRowId } from "@mui/x-data-grid";
import { useCallback, useState } from "react";
import { useRecordingQuery } from "../Query";

export const useSaveButton = () => {
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

export const useDeleteButton = () => {
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
