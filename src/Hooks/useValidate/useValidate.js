import { useEffect, useState } from "react";

export const useValidate = (value, validators) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);

  useEffect(() => {
    for (const validation in validators) {
      switch (validation) {
        case "minLength":
          value.length < validators[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case "isEmpty":
          value ? setIsEmpty(false) : setIsEmpty(true);
          break;
        default:
          break;
      }
    }
  }, [value]);

  return {
    isEmpty,
    minLengthError,
  };
};
