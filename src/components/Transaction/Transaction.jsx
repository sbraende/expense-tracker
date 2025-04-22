import styles from "./Transaction.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger } from "@fortawesome/free-solid-svg-icons";

const Transaction = () => {
  return (
    <li className={styles.transactionItem}>
      <div className={styles.iconDescriptionContainer}>
        <div className={styles.iconContainer}>
          <FontAwesomeIcon icon={faBurger} size="lg" className={styles.icon} transform="grow-4" />
        </div>
        <h3>McDonalds</h3>
      </div>
      <div className={styles.priceDateContainer}>
        <p className={styles.priceText}>-$45.00</p>
        <p className={styles.dateText}>22.04.2025</p>
      </div>
    </li>
  );
};

export default Transaction;
