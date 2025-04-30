import styles from "./InputModal.module.css";
import { use, useState } from "react";
import { expenseCategories, incomeCategories } from "../../data/categoriesData";
import { capitalizeLetter } from "../../utilities/naming";

const InputModal = ({ setIsOpenAddModal }) => {
  // Set states
  const [error, setError] = useState("");
  const [transactionData, setTransactionData] = useState({
    isIncome: false,
    title: "",
    amount: 0,
    category: "none",
    note: "",
    date: "",
  });

  // Handle income toggle
  const handleIncomeToggle = () => {
    // Toggle income and reset form
    setTransactionData({
      isIncome: !transactionData.isIncome,
      title: "",
      amount: 0,
      category: "none",
      note: "",
      date: "",
    });
  };

  // Validate current input field
  const validateField = (name, value) => {
    let errorMessage = "";

    if (name === "title" && value.length > 30) {
      errorMessage = "Title cannot be more than 30 characters long";
    } else if (name === "title" && value === "") {
      errorMessage = "Please add title to expense";
    } else if (name === "amount" && value <= 0) {
      errorMessage = "Please enter amount larger than 0";
    } else if (name === "category" && value === "none") {
      errorMessage = "Please select a category";
    } else if (name === "note" && value.length > 50) {
      errorMessage = "Note cannot be more than 50 characters long";
    } else if (name === "date" && value === "") {
      errorMessage = "Please select a date";
    }

    setError(errorMessage);
  };

  // Handle input
  const handleInput = (e) => {
    const { name, value } = e.target;

    setTransactionData((prev) => {
      const updatedData = { ...prev, [name]: value };
      validateField(name, value);
      return updatedData;
    });
  };

  // On submit
  const handleSubmit = (e) => {
    e.preventDefault();

    let errorMessage = "";
    let isValid = true;

    if (transactionData.title.length > 30) {
      errorMessage = "Title cannot be more than 30 characters long";
      isValid = false;
    } else if (transactionData.title === "") {
      errorMessage = "Please add title to expense";
      isValid = false;
    } else if (transactionData.amount <= 0) {
      errorMessage = "Please enter amount larger than 0";
      isValid = false;
    } else if (transactionData.category === "none") {
      errorMessage = "Please select a category";
      isValid = false;
    } else if (transactionData.note.length > 50) {
      errorMessage = "Note cannot be more than 50 characters long";
      isValid = false;
    } else if (transactionData.date === "") {
      errorMessage = "Please select a date";
      isValid = false;
    }

    setError(errorMessage);
    if (!isValid) {
      return;
    }

    // Submit to local storage
    // TODO: Remeber to get localStorage first
    // localStorage.setItem("transactions", );
  };

  // Handle close modal button
  const handleCloseAddModal = () => setIsOpenAddModal(false);

  return (
    <div className={styles.inputModalContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>Add Transaction</h2>

        {/* IncomeToggle */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Type</label>
          <div className={styles.incomeExpensesButtonsContainer}>
            <button
              className={`${styles.incomeExpensesButtons} ${
                transactionData.isIncome
                  ? styles.incomeExpensesButtonActive
                  : ""
              }`}
              onClick={handleIncomeToggle}
              type="button"
            >
              Income
            </button>
            <button
              className={`${styles.incomeExpensesButtons} ${
                transactionData.isIncome
                  ? ""
                  : styles.incomeExpensesButtonActive
              }`}
              onClick={handleIncomeToggle}
              type="button"
            >
              Expenses
            </button>
          </div>
        </div>

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
            onChange={handleInput}
            value={transactionData.title}
          />
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
            onChange={handleInput}
            value={transactionData.amount}
          />
        </div>

        {/* Category */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="category">
            Category
          </label>
          {transactionData.isIncome ? (
            <select
              className={styles.select}
              name="category"
              id="category"
              onChange={handleInput}
              value={transactionData.category}
            >
              <option value="none">None</option>
              {incomeCategories.map((category, index) => {
                return (
                  <option key={index} value={category}>
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
              onChange={handleInput}
              value={transactionData.category}
            >
              <option value="none">None</option>
              {expenseCategories.map((category, index) => {
                return (
                  <option key={index} value={category}>
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
            onChange={handleInput}
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
            onChange={handleInput}
            value={transactionData.date}
          />
        </div>

        {/* Error */}
        <div className={styles.errorContainer}>
          {error && <p className={styles.error}>{error}</p>}
        </div>

        {/* Submit and Cancel buttons */}
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
            onClick={handleCloseAddModal}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputModal;
