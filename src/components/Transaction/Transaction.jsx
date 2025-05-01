import styles from "./Transaction.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShirt,
  faClapperboard,
  faPalette,
  faBurger,
  faHouse,
  faBus,
  faTag,
  faSuitcase,
  faMoneyCheckDollar,
  faMoneyBillTrendUp,
  faHandHoldingDollar,
} from "@fortawesome/free-solid-svg-icons";
import { ISODateToNormalizedDate } from "../../utilities/dateAndTime";

const Transaction = ({
  transactionData,
  isOpenAddModal,
  setEditMode,
  setIsOpenAddModal,
}) => {
  const categoryIcons = {
    salery: faSuitcase,
    investment: faMoneyBillTrendUp,
    benefits: faHandHoldingDollar,
    housing: faHouse,
    utilities: faTag,
    food: faBurger,
    transportation: faBus,
    clothing: faShirt,
    entertainment: faClapperboard,
    hobby: faPalette,
  };

  const icon = categoryIcons[transactionData.category] || faMoneyCheckDollar;

  const handleOpenModal = (id) => {
    // Open Input Modal
    setIsOpenAddModal(true);
    setEditMode(id);
  };

  return (
    <button
      onClick={() => {
        handleOpenModal(transactionData.id);
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
    </button>
  );
};

export default Transaction;
