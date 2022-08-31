import { useCallback, useState } from "react";

import { defaultValues } from "./constants";
import { useCompareQuery } from "../../Query";
import { lapSelectValues } from "../../Types/types";

export const useCompare = () => {
  const [formValues, setFormValues] =
    useState<lapSelectValues[]>(defaultValues);

  const [isCompareForm, setCompareForm] = useState<Boolean>(true);
  const usePrevious = () => {
    setCompareForm(false);
  };

  const compareOthers = () => {
    setCompareForm(true);
    setFormValues(defaultValues);
  };

  const { setPersonalLap, setDriverLap } = useCompareQuery();

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      setCompareForm(false);
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
    },
    [setCompareForm, formValues, setPersonalLap, setDriverLap]
  );

  return {
    formValues,
    setFormValues,
    onSubmit,
    isCompareForm,
    usePrevious,
    compareOthers,
  };
};
