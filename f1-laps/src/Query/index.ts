import { GridRowId } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const urlPrefix = "http://127.0.0.1:5000";

type recState = "start" | "stop";

const post = (url: string, data: any) => {
  return axios.post(urlPrefix + url, data);
};

const get = (url: string) => {
  return axios.get(urlPrefix + url);
};

export const useRecordingQuery = () => {
  const queryClient = useQueryClient();

  const fetchState = async (): Promise<recState> => {
    const res = await get("/recording");
    return res.data.trim();
  };

  const fetchLaps = async () => {
    const res = await get("/recording/buffer");
    return res.data;
  };

  const useRecordingState = () => {
    return useQuery(["recording"], fetchState);
  };

  const useRecordingBuffer = () => {
    return useQuery(["recording laps"], fetchLaps, { refetchInterval: 100000 });
  };

  const setRecordingMutation = useMutation(
    (state: recState) => post("/recording/set", { action: state }),
    {
      // When mutate is called:
      onMutate: async (state: recState) => {
        await queryClient.cancelQueries(["recording"]);

        return { state };
      },

      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(["recording"]);
      },
    }
  );

  const deleteRecordingMutation = useMutation(
    (selected: GridRowId[]) => post("/recording/delete", { selected }),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["recording"]);
      },
    }
  );

  return {
    useRecordingState,
    setRecordingMutation,
    useRecordingBuffer,
    deleteRecordingMutation,
  };
};
