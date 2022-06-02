import { useState } from "react";
import { useValidate } from "../useValidate/useValidate";

export const useInput = (initialValue, validators) => {
  const [value, setValue] = useState(initialValue);
  const [isValueDirty, setIsValueDirty] = useState(false);
  const [isValueError, setIsValueError] = useState("Field cannot be empty.");
  const valid = useValidate(value, validators);

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onBlur = (e) => {
    setIsValueDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isValueDirty,
    ...valid,
  };
};
