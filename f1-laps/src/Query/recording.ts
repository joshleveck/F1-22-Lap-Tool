import { GridRowId } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { recordedRow } from "../Types/types";

import { apiGet, apiPost, apiDelete } from "./index";

type recState = "start" | "stop";

const useRecordingQuery = () => {
  const queryClient = useQueryClient();

  const fetchState = async (): Promise<recState> => {
    const res = await apiGet("/recording");
    return res.data.trim();
  };

  const fetchLaps = async () => {
    const res = await apiGet("/recording/buffer");
    return res.data;
  };

  const useRecordingState = () => {
    return useQuery(["recording"], fetchState);
  };

  const useRecordingBuffer = () => {
    return useQuery(["recording laps"], fetchLaps, { refetchInterval: 1000 });
  };

  const setRecordingMutation = useMutation(
    (state: recState) => apiPost("/recording/set", { action: state }),
    {
      // When mutate is called:
      onMutate: async (state: recState) => {
        await queryClient.cancelQueries(["recording"]);

        return { state };
      },

      onSettled: () => {
        queryClient.invalidateQueries(["recording"]);
      },
    }
  );

  const deleteRecordingMutation = useMutation(
    (selected: GridRowId[]) => apiDelete("/recording/delete", { selected }),
    {
      onMutate: async (selected: GridRowId[]) => {
        await queryClient.cancelQueries(["recording laps"]);

        const prevLaps = queryClient.getQueryData(["recording laps"]);

        queryClient.setQueryData(
          ["recording laps"],
          (oldLaps: recordedRow[] | undefined) =>
            oldLaps
              ? oldLaps.filter((lap: recordedRow) => !selected.includes(lap.id))
              : []
        );

        return { prevLaps };
      },

      onSettled: () => {
        queryClient.invalidateQueries(["recording laps"]);
      },
    }
  );

  const saveRecordingMutation = useMutation(
    ({ selected, name }: { selected: GridRowId; name: string }) =>
      apiPost("/recording/save", { selected, name }),
    {}
  );

  return {
    useRecordingState,
    setRecordingMutation,
    useRecordingBuffer,
    deleteRecordingMutation,
    saveRecordingMutation,
  };
};
export default useRecordingQuery;
