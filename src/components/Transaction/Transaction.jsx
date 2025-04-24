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
  const iconBasedOnCategory = (category) => {
    switch (category) {
      case "clothing":
        return faShirt;
      case "entertainment":
        return faClapperboard;
      case "hobby":
        return faPersonRunning;
      case "food":
        return faBurger;
      case "housing":
        return faHouse;
      case "transportation":
        return faBus;
      case "utilities":
        return faTag;
      case "income":
        return faSuitcase;
      default:
        return faMoneyCheckDollar;
    }
  };
  const icon = iconBasedOnCategory(transactionData.category);

  const ISODateToNormalizedDate = (timestamp) => {
    return new Date(timestamp).toISOString().split("T")[0];
  };

  const processAmount = (amount) => {
    const isPositive = amount >= 0;
    const text = `${isPositive ? "" : "-"}$${Math.abs(amount)}`;
    return { isPositive, text };
  };

  const amountObject = processAmount(transactionData.amount);

  const openModal = (transactionData) => console.log("Should open up edit modal", transactionData);
  return (
    <li
      onClick={() => {
        openModal(transactionData);
      }}
      className={styles.transactionItem}
    >
      <div className={styles.iconDescriptionContainer}>
        <div className={`${styles.iconContainer} ${styles[transactionData.category]}`}>
          <FontAwesomeIcon icon={icon} size="lg" className={styles.icon} transform="grow-4" />
        </div>
        <div className={styles.detailsContainer}>
          <h3>{transactionData.title}</h3>
          <div className={styles.dateNoteContainer}>
            <span className={styles.dateText}>{ISODateToNormalizedDate(transactionData.date)}</span>
            <span>-</span>
            <span className={styles.noteText}>{transactionData.note}</span>
          </div>
        </div>
      </div>
      <div className={styles.priceContainer}>
        <span
          className={`${amountObject.isPositive ? styles.pricePositive : styles.priceNegative}`}
        >
          {amountObject.text}
        </span>
      </div>
    </li>
  );
};

export default Transaction;
