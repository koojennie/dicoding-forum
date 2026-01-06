import { useState } from 'react';

export default function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  function onValueChange({ target }) {
    setValue(target.value);
  }

  return [value, onValueChange, setValue];
}