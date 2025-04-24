import { useState } from "react";
import { allCategories } from "../../data/categoriesData";
import { capitalizeLetter } from "../../utilities/naming";
import Transaction from "../Transaction/Transaction";
import styles from "./Transactions.module.css";

const Transactions = ({ transactionsData }) => {
  const [filteredTransactions, setFilteredTransactions] = useState(transactionsData);

  const updateFilter = (e) => {
    if (e.target.value === "all") {
      setFilteredTransactions(transactionsData);
    } else {
      setFilteredTransactions(() =>
        transactionsData.filter((transaction) => transaction.category === e.target.value)
      );
    }
  };

  return (
    <section className={styles.transactionsSection}>
      <header className={styles.transactionHeader}>
        <h1>Transactions</h1>
        <div className={styles.filterContainer}>
          <p className={styles.filterLabel}>Category</p>
          <select className={styles.filterSelect} onChange={updateFilter}>
            <option value="all">All</option>
            {allCategories.map((category, i) => {
              return (
                <option key={i} value={category}>
                  {capitalizeLetter(category)}
                </option>
              );
            })}
          </select>
        </div>
      </header>
      <ul className={styles.transactionsList}>
        {filteredTransactions.map((transactionData) => {
          return <Transaction key={transactionData.id} transactionData={transactionData} />;
        })}
      </ul>
    </section>
  );
};

export default Transactions;
