import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./Balance.module.css";

const Balance = ({ total, income, expense }) => {
  return (
    <section className={styles.cardSection}>
      <div className={styles.card}>
        <div className={styles.totalBalanceContainer}>
          <h3 className={styles.totalBalanceTitle}>Total Balance</h3>
          <p className={styles.totalBalanceValue}>{`$ ${total.toFixed(2)}`}</p>
        </div>
        <div className={styles.incomeExpensesContainer}>
          <div className={styles.balanceContainer}>
            <div className={styles.iconContainer}>
              <FontAwesomeIcon icon={faArrowUp} className={styles.arrowUp} />
            </div>
            <div className={styles.balanceTextContainer}>
              <h4 className={styles.balanceTextTitle}>Income</h4>
              <p className={styles.balanceTextValue}>{`${income.toFixed(2)}`}</p>
            </div>
          </div>
          <div className={styles.balanceContainer}>
            <div className={styles.iconContainer}>
              <FontAwesomeIcon icon={faArrowDown} className={styles.arrowDown} />
            </div>
            <div className={styles.balanceTextContainer}>
              <h4 className={styles.balanceTextTitle}>Expenses</h4>
              <p className={styles.balanceTextValue}>{`${expense.toFixed(2)}`}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Balance;
