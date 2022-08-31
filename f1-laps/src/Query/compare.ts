import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { apiGet, apiPost } from "./index";

const useCompareQuery = () => {
  const queryClient = useQueryClient();
  const fetchCompare = async () => {
    const res = await apiGet("/compare");
    return res.data;
  };

  const useCompareData = () => {
    return useQuery(["compare"], fetchCompare);
  };

  const setResetCompare = useMutation(() => apiGet("/compare/reset"), {
    onSettled: () => {
      queryClient.invalidateQueries(["compare"]);
    },
  });

  const setPersonalLap = useMutation(
    (id: number) => apiPost("/compare/personal", { id }),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["compare"]);
      },
    }
  );

  const setDriverLap = useMutation(
    (data: { driver: string; circuit: string }) =>
      apiPost("/compare/driver", data),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["compare"]);
      },
    }
  );

  const loadCompare = () => {
    queryClient.invalidateQueries(["compare"]);
  };

  return {
    useCompareData,
    setPersonalLap,
    setDriverLap,
    setResetCompare,
    loadCompare,
  };
};
export default useCompareQuery;
