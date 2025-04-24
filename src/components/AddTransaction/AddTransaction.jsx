import styles from "./AddTransaction.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddTransaction = ({ setOpenAddModal }) => {
  const openAddModal = () => {
    setOpenAddModal(true);
  };

  return (
    <>
      <button className={styles.addContainer} onClick={openAddModal}>
        <FontAwesomeIcon icon={faPlus} size="3x" className={styles.icon} />
      </button>
    </>
  );
};

export default AddTransaction;
