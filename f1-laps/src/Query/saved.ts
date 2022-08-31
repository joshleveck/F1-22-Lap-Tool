import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GridRowId } from "@mui/x-data-grid";

import { savedRow } from "../Types/types";
import { apiGet, apiDelete } from "./index";

const useSavedQuery = () => {
  const queryClient = useQueryClient();

  const fetchLaps = async () => {
    const res = await apiGet("/saved");
    return res.data;
  };

  const useSavedLaps = () => {
    return useQuery(["saved laps"], fetchLaps, { refetchInterval: 100000 });
  };

  const deleteSavedLap = useMutation(
    (selected: GridRowId[]) => apiDelete("/saved", { selected }),
    {
      // When mutate is called:
      onMutate: async (selected: GridRowId[]) => {
        await queryClient.cancelQueries(["saved laps"]);

        const prevLaps = queryClient.getQueryData(["saved laps"]);

        queryClient.setQueryData(
          ["saved laps"],
          (oldLaps: savedRow[] | undefined) =>
            oldLaps
              ? oldLaps.filter((lap: savedRow) => !selected.includes(lap.id))
              : []
        );

        return { prevLaps };
      },

      onSettled: () => {
        queryClient.invalidateQueries(["saved laps"]);
      },
    }
  );

  return {
    useSavedLaps,
    deleteSavedLap,
  };
};
export default useSavedQuery;
