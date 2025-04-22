import styles from "./InputModal.module.css";

const InputModal = () => {
  return (
    <div className={styles.inputModalContainer}>
      <form className={styles.form}>
        <h2>Add Income or Expense</h2>
        <div className={styles.formGroup}>
          <div className={styles.inputTypeContainer}>
            <div className={styles.inputType}>
              <label htmlFor="type">Income</label>
              <input type="radio" name="type" id="type" value="income" />
            </div>
            <div className={styles.inputType}>
              <label htmlFor="type">Expense</label>
              <input type="radio" name="type" id="type" value="expense" />
            </div>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="category">Category</label>
          <input type="text" name="category" id="category" />
        </div>
      </form>
    </div>
  );
};

export default InputModal;
