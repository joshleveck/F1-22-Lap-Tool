import { useState, ChangeEvent, useMemo } from "react";
import * as _ from "lodash";

import { lapSelectValues } from "../../Types/types";
import { defaultValues } from "./constants";

export const useCompareForm = () => {
  const [formValues, setFormValues] =
    useState<lapSelectValues[]>(defaultValues);

  const handleInputChange = (id: number) => {
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

  const submitEnabled = useMemo(
    () =>
      _.every(formValues, (lap: lapSelectValues) => {
        if (lap.lapType === "driver") {
          return lap.circuit !== "" && lap.driver !== "";
        } else if (lap.lapType === "personal") {
          return lap.personalLap !== "";
        }
        return false;
      }),
    [formValues]
  );

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(formValues);
  };

  return { formValues, onSubmit, handleInputChange, submitEnabled };
};

export const usePersonalSelection = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return { isOpen, handleOpen, handleClose };
};
