import { useState, ChangeEvent } from "react";

const useInput = <T,>(
  initialValue: T
): [T, (e: ChangeEvent<HTMLInputElement>) => void, () => void] => {
  const [inputValue, setInputValue] = useState<T>(initialValue);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as T;
    setInputValue(value);
  };

  const clearInput = () => setInputValue(initialValue);

  return [inputValue, handleInputChange, clearInput];
};

export default useInput;
