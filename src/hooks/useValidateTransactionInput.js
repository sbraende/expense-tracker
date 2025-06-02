import { useState } from "react";

const useValidateTransactionInput = () => {
  const [errors, setErrors] = useState({});

  const validateTransactionInput = (values) => {
    let newErrors = {};

    if (!values.title.trim()) {
      newErrors.title = "Title required";
    }

    if (!values.amount) {
      newErrors.amount = "Amount required";
    } else if (values.amount <= 0) {
      newErrors.amount = "Amount larger than 0 required";
    }

    if (values.category === "none") {
      newErrors.category = "Category required";
    }

    if (!values.date) {
      newErrors.date = "Date required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validateTransactionInput };
};

export default useValidateTransactionInput;
