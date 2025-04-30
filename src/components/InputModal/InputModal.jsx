import styles from "./InputModal.module.css";
import { use, useState } from "react";
import { expenseCategories, incomeCategories } from "../../data/categoriesData";
import { capitalizeLetter } from "../../utilities/naming";

const InputModal = ({ setOpenAddModal }) => {
  const [isIncome, setIsIncome] = useState(false); // might be able to remove
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [transactionData, setTransactionData] = useState({
    isIncome: false,
    title: "",
    amount: 0,
    category: "none",
    note: "",
    date: "",
  });

  const resetForm = () => {
    setTransactionData({
      isIncome: false,
      title: "",
      amount: 0,
      category: "none",
      note: "",
      date: "",
    });
    setIsValid(false);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setTransactionData((prev) => {
      const updatedData = { ...prev, [name]: value };
      validateField(name, value, updatedData);
      return updatedData;
    });
  };

  const validateField = (name, value, updatedData) => {
    let errorMessage = "";

    if (name === "title" && value.length > 30) {
      errorMessage = "Title cannot be more than 30 characters long";
    } else if (name === "title" && value === "") {
      errorMessage = "Please add title to expense";
    } else if (name === "amount" && (value < 0 || value === "")) {
      errorMessage = "Please choose a positive number for the amount";
    } else if (name === "category" && value === "none") {
      errorMessage = "Please select a category";
    } else if (name === "note" && value.length > 50) {
      errorMessage = "Note cannot be more than 50 characters long";
    } else if (
      name === "date" &&
      new Date().getTime() < new Date(value).getTime()
    ) {
      errorMessage = "Date cannot be in the future";
    } else if (name === "date" && value === "") {
      errorMessage = "Please select a date";
    }

    setError((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));

    const isFormValid =
      updatedData.title &&
      updatedData.title.length <= 30 &&
      updatedData.amount > 0 &&
      updatedData.category !== "none" &&
      updatedData.note.length <= 50 &&
      updatedData.date &&
      new Date().getTime() >= new Date(updatedData.date).getTime();

    setIsValid(isFormValid);
  };

  const validateForm = () => {
    let isFormValid = true;
    const newErrors = {};

    Object.entries(transactionData).forEach(([name, value]) => {
      let errorMessage = "";

      if (name === "title" && value.length > 30) {
        errorMessage = "Title cannot be more than 30 characters long";
      } else if (name === "title" && value === "") {
        errorMessage = "Please add title to expense";
      } else if (name === "amount" && (value <= 0 || value === "")) {
        errorMessage = "Please choose a positive number for the amount";
      } else if (name === "category" && value === "none") {
        errorMessage = "Please select a category";
      } else if (name === "note" && value.length > 50) {
        errorMessage = "Note cannot be more than 50 characters long";
      } else if (
        name === "date" &&
        new Date().getTime() < new Date(value).getTime()
      ) {
        errorMessage = "Date cannot be in the future";
      } else if (name === "date" && value === "") {
        errorMessage = "Please select a date";
      }

      if (errorMessage) {
        isFormValid = false;
      }

      newErrors[name] = errorMessage;
    });

    setErrors(newErrors);
    setIsValid(isFormValid);

    return isFormValid;
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const isFormValid = validateForm();

    if (!isFormValid) {
      console.log("Could not submit form");
      return;
    }

    const transaction = {
      isIncome: isIncome,
      title: transactionData.title,
      amount: transactionData.amount,
      category: transactionData.category,
      note: transactionData.note,
      date: transactionData.date,
    };

    localStorage.setItem("transactions", JSON.stringify(transaction));
    console.log("Stored transaction in localStorage");

    resetForm();
  };

  const closeAddModal = () => setOpenAddModal(false);

  return (
    <div className={styles.inputModalContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>Add Transaction</h2>
        <div className={styles.formGroup}>
          <label className={styles.label}>Type</label>
          <div className={styles.incomeExpensesButtonsContainer}>
            <button
              className={`${styles.incomeExpensesButtons} ${
                isIncome ? styles.incomeExpensesButtonActive : ""
              }`}
              onClick={() => {
                setIsIncome(!isIncome);
                resetForm();
              }}
              type="button"
            >
              Income
            </button>
            <button
              className={`${styles.incomeExpensesButtons} ${
                isIncome ? "" : styles.incomeExpensesButtonActive
              }`}
              onClick={() => {
                setIsIncome(!isIncome);
                resetForm();
              }}
              type="button"
            >
              Expenses
            </button>
          </div>
        </div>
        {/* Expenses */}
        <fieldset className={styles.fieldset}>
          {/* Title */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="title">
              Title
            </label>
            <input
              className={styles.titleInput}
              type="text"
              name="title"
              id="title"
              placeholder=""
              onChange={(e) => handleInput(e)}
              value={transactionData.title}
            />
            <p className={styles.errorMessage}>{}</p>
          </div>

          {/* Amount */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="amount">
              Amount
            </label>
            <input
              className={styles.amountInput}
              type="number"
              name="amount"
              id="amount"
              placeholder="0"
              onChange={(e) => handleInput(e)}
              value={transactionData.amount}
            />
            <p className={styles.errorMessage}>{}</p>
          </div>

          {/* Category */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="category">
              Category
            </label>
            {isIncome ? (
              <select
                className={styles.select}
                name="category"
                id="category"
                onChange={(e) => handleInput(e)}
                value={transactionData.category}
              >
                <option value="none">None</option>
                {incomeCategories.map((category, i) => {
                  return (
                    <option key={i} value={category}>
                      {capitalizeLetter(category)}
                    </option>
                  );
                })}
              </select>
            ) : (
              <select
                className={styles.select}
                name="category"
                id="category"
                onChange={(e) => handleInput(e)}
                value={transactionData.category}
              >
                <option value="none">None</option>
                {expenseCategories.map((category, i) => {
                  return (
                    <option key={i} value={category}>
                      {capitalizeLetter(category)}
                    </option>
                  );
                })}
              </select>
            )}
          </div>
          {/* Note */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="note">
              Note
            </label>
            <textarea
              className={styles.textInput}
              name="note"
              id="note"
              onChange={(e) => handleInput(e)}
              value={transactionData.note}
            ></textarea>
          </div>

          {/* Date */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="date">
              Date
            </label>
            <input
              className={styles.date}
              type="date"
              name="date"
              id="date"
              onChange={(e) => handleInput(e)}
              value={transactionData.date}
            />
          </div>
        </fieldset>
        <div className={styles.errorContainer}>
          {error && <p className={styles.error}>{error}</p>}
        </div>
        <div className={styles.submitCancelButtonsContainer}>
          <button
            className={`${styles.submitButton} ${styles.button}`}
            type="submit"
          >
            SAVE
          </button>
          <button
            className={`${styles.cancelButton} ${styles.button}`}
            type="button"
            onClick={closeAddModal}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputModal;
