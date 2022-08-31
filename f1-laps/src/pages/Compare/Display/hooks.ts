import { useCallback, useMemo } from "react";

import { lapSelectValues } from "../../../Types/types";
import { useCompareQuery } from "../../../Query";

export const useDisplay = (formValues: lapSelectValues[]) => {
  const {
    useCompareData,
    setPersonalLap,
    setDriverLap,
    setResetCompare,
    loadCompare,
  } = useCompareQuery();
  const { data: rawData, isLoading: isLapsLoading } = useCompareData();

  const lapData = useMemo(
    () =>
      rawData
        ? rawData.map((d: any, i: number) => ({
            ...d,
            person: formValues[i]
              ? formValues[i].lapType === "personalLap"
                ? formValues[i].id
                : formValues[i].driver
              : "",
            color: "#" + Math.floor(Math.random() * 16777215).toString(16),
          }))
        : [],
    [rawData, formValues]
  );
  console.log(lapData);

  const loadData = useCallback(() => {
    formValues.map((lap) => {
      if (lap.lapType === "personalLap") {
        setPersonalLap.mutate(lap.personalLap.id);
      } else {
        setDriverLap.mutate({
          driver: lap.driver,
          circuit: lap.circuit,
        });
      }
      return {};
    });
  }, [formValues, setDriverLap, setPersonalLap]);

  return {
    loadData,
    lapData,
    isLapsLoading,
    resetCompare: () => setResetCompare.mutate(),
    loadCompare,
  };
};
