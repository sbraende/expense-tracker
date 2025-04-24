import styles from "./InputModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const InputModal = ({ setOpenAddModal }) => {
  const [isIncome, setIsIncome] = useState(false);

  const submitTransaction = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("isIncome", isIncome);
    for (const p of formData.entries()) {
      console.log(p);
    }
  };

  const closeAddModal = () => setOpenAddModal(false);

  return (
    <div className={styles.inputModalContainer}>
      <form className={styles.form} onSubmit={submitTransaction}>
        <h2 className={styles.formTitle}>Add Transaction</h2>
        <div className={styles.formGroup}>
          <label className={styles.label}>Type</label>
          <div className={styles.incomeExpensesButtonsContainer}>
            <button
              className={`${styles.incomeExpensesButtons} ${
                isIncome ? styles.incomeExpensesButtonActive : ""
              }`}
              onClick={() => setIsIncome(!isIncome)}
            >
              Income
            </button>
            <button
              className={`${styles.incomeExpensesButtons} ${
                isIncome ? "" : styles.incomeExpensesButtonActive
              }`}
              onClick={() => setIsIncome(!isIncome)}
            >
              Expenses
            </button>
          </div>
        </div>
        {/* Expenses */}
        <fieldset className={styles.fieldset}>
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
            />
          </div>

          {/* Category */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="category">
              Category
            </label>
            {isIncome ? (
              <select className={styles.select} name="category" id="category">
                <option value="None">None</option>
                <option value="salary">Salary</option>
                <option value="investment">Investment</option>
                <option value="benefits">Benefits</option>
                <option value="bonus">Bonus</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <select className={styles.select} name="category" id="category">
                <option value="None">None</option>
                <option value="housing">Housing</option>
                <option value="utilities">Utilities</option>
                <option value="grocery">Groceries</option>
                <option value="transportation">Transportation</option>
                <option value="clothing">Clothing</option>
                <option value="entertainment">Entertainment</option>
                <option value="other">Other</option>
              </select>
            )}
          </div>
          {/* Note */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="note">
              Note
            </label>
            <textarea className={styles.textInput} name="note" id="note"></textarea>
            {/* <input className={styles.textInput} type="text" name="note" id="note" /> */}
          </div>

          {/* Date */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="date">
              Date
            </label>
            <input className={styles.date} type="date" name="date" id="date" />
          </div>
        </fieldset>
        <div className={styles.submitCancelButtonsContainer}>
          <button className={`${styles.submitButton} ${styles.button}`} type="submit">
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
