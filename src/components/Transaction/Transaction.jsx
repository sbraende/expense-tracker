import styles from "./Transaction.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShirt,
  faClapperboard,
  faPersonRunning,
  faBurger,
  faHouse,
  faBus,
  faTag,
  faSuitcase,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";

const Transaction = ({ transactionData }) => {
  const categoryIcons = {
    clothing: faShirt,
    entertainment: faClapperboard,
    hobby: faPersonRunning,
    food: faBurger,
    housing: faHouse,
    transportation: faBus,
    utilities: faTag,
    income: faSuitcase,
  };

  const icon = categoryIcons[transactionData.category] || faMoneyCheckDollar;

  const ISODateToNormalizedDate = (timestamp) => {
    return new Date(timestamp).toISOString().split("T")[0];
  };

  const openModal = (transactionData) =>
    console.log("Should open up edit modal", transactionData);
  return (
    <li
      onClick={() => {
        openModal(transactionData);
      }}
      className={styles.transactionItem}
    >
      <div className={styles.iconDescriptionContainer}>
        <div
          className={`${styles.iconContainer} ${
            styles[transactionData.category]
          }`}
        >
          <FontAwesomeIcon
            icon={icon}
            size="lg"
            className={styles.icon}
            transform="grow-4"
          />
        </div>
        <div className={styles.detailsContainer}>
          <h3>{transactionData.title}</h3>
          <div className={styles.dateNoteContainer}>
            <span className={styles.dateText}>
              {ISODateToNormalizedDate(transactionData.date)}
            </span>
            {transactionData.note && (
              <span className={styles.noteText}>{transactionData.note}</span>
            )}
          </div>
        </div>
      </div>
      <div className={styles.priceContainer}>
        <span
          className={`${
            transactionData.isIncome
              ? styles.pricePositive
              : styles.priceNegative
          }`}
        >
          {`${transactionData.isIncome ? "" : "-"}$${transactionData.amount}`}
        </span>
      </div>
    </li>
  );
};

export default Transaction;
