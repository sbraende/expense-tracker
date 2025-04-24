import Transaction from "../Transaction/Transaction";
import styles from "./Transactions.module.css";

const Transactions = ({ transactionsData }) => {
  return (
    <section className={styles.transactionsSection}>
      <header className={styles.transactionHeader}>
        <h1>Transactions</h1>
        <div className={styles.filterContainer}>
          <p className={styles.filterLabel}>Category</p>
          <select className={styles.filterSelect}>
            <option value="all">All</option>
            <option value="housing">Housing</option>
            <option value="utilities">Utilities</option>
            <option value="grocery">Groceries</option>
            <option value="transportation">Transportation</option>
            <option value="clothing">Clothing</option>
            <option value="entertainment">Entertainment</option>
            <option value="other">Other</option>
          </select>
        </div>
      </header>
      <ul className={styles.transactionsList}>
        {transactionsData.map((transactionData) => {
          return <Transaction key={transactionData.id} transactionData={transactionData} />;
        })}
      </ul>
    </section>
  );
};

export default Transactions;
