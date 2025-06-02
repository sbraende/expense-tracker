import styles from "./InputModal.module.css";
import { useEffect, useState } from "react";
import { expenseCategories, incomeCategories } from "../../data/categoriesData";
import { capitalizeLetter } from "../../utilities/naming";
import { v4 as uuidv4 } from "uuid";
import { ISODateToNormalizedDate } from "../../utilities/dateAndTime";
import useValidateTransactionInput from "../../hooks/useValidateTransactionInput";

const InputModal = ({
  setIsOpenAddModal,
  transactionsData,
  setTransactionsData,
  editMode,
  setEditMode,
}) => {
  // Set states
  const [transactionData, setTransactionData] = useState({
    isIncome: false,
    title: "",
    amount: "",
    category: "none",
    note: "",
    date: "",
  });

  const { errors, validateTransactionInput } = useValidateTransactionInput();

  // Handle income toggle
  const handleIncomeToggle = () => {
    setTransactionData((prev) => ({
      ...prev,
      isIncome: !prev.isIncome,
      category: "none",
      title: prev.title || "",
      amount: prev.amount || "",
      note: prev.note || "",
      date: prev.date || "",
    }));
  };

  // Handle input
  const handleInput = (e) => {
    const { name, value } = e.target;

    setTransactionData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // On submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate
    if (!validateTransactionInput(transactionData)) return;

    // Submit to local storage
    const transaction = {
      id: uuidv4(),
      isIncome: transactionData.isIncome,
      title: transactionData.title.trim(),
      amount: transactionData.amount,
      category: transactionData.category.trim(),
      note: transactionData.note.trim(),
      date: new Date(transactionData.date).toISOString(),
    };

    if (!editMode) {
      const updatedTransactions = [...transactionsData, transaction];
      localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
      setTransactionsData(updatedTransactions);
    } else {
      const updatedTransactions = [...transactionsData];

      const transactionIndex = transactionsData.findIndex(
        (t) => t.id === editMode
      );
      updatedTransactions[transactionIndex] = transaction;

      localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
      setTransactionsData(updatedTransactions);
    }

    setIsOpenAddModal(false);
    setEditMode(null);
  };

  const handleDelete = () => {
    const updatedTransactions = transactionsData.filter(
      (t) => t.id !== editMode
    );
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    setTransactionsData(updatedTransactions);
    setIsOpenAddModal(false);
    setEditMode(null);
  };

  // Handle close inputModal
  const handleCloseAddModal = () => {
    setIsOpenAddModal(false);
    setEditMode(null);
  };

  // Edit mode
  useEffect(() => {
    if (editMode) {
      // editMode stores the id for current transaction
      const transactionEdited = transactionsData.find(
        (transaction) => transaction.id === editMode
      );

      setTransactionData({
        isIncome: transactionEdited.isIncome,
        title: transactionEdited.title,
        amount: transactionEdited.amount,
        category: transactionEdited.category,
        note: transactionEdited.note,
        date: ISODateToNormalizedDate(transactionEdited.date),
      });
    }
  }, [editMode]);

  return (
    <div className={styles.inputModalContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>
          {editMode ? "Edit Transaction" : "Add Transaction"}
        </h2>

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
            maxLength={50}
          />
          {errors && <p className={styles.error}>{errors.title}</p>}
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
          {errors && <p className={styles.error}>{errors.amount}</p>}
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
          {errors && <p className={styles.error}>{errors.category}</p>}
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
            maxLength={200}
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
            placeholder="dd/mm/yyyy"
          />
          {errors && <p className={styles.error}>{errors.date}</p>}
        </div>

        {/* Submit and Cancel buttons */}
        <div className={styles.submitCancelButtonsContainer}>
          <button
            className={`${styles.submitButton} ${styles.button}`}
            type="submit"
          >
            {editMode ? "SAVE EDIT" : "SAVE"}
          </button>
          {editMode && (
            <button
              className={`${styles.deleteButton} ${styles.button}`}
              type="button"
              onClick={handleDelete}
            >
              DELETE TRANSACTION
            </button>
          )}
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
