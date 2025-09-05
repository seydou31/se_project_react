

import { useState } from "react";

export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  
 
  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
    
  };

   const handleReset = () => {
    setValues(defaultValues);
  };

  return { values, handleChange, handleReset };
}