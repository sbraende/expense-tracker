import { useEffect, useState } from "react";
import { allCategories } from "../../data/categoriesData";
import { capitalizeLetter } from "../../utilities/naming";
import Transaction from "../Transaction/Transaction";
import styles from "./Transactions.module.css";

const Transactions = ({
  transactionsData,
  isOpenAddModal,
  setIsOpenAddModal,
  setEditMode,
}) => {
  const [filterCategory, setFilterCategory] = useState("all");

  const updateFilter = (e) => {
    setFilterCategory(e.target.value);
  };

  const filteredTransactions =
    filterCategory === "all"
      ? transactionsData
      : transactionsData.filter((t) => t.category === filterCategory);

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
                <option key={category} value={category}>
                  {capitalizeLetter(category)}
                </option>
              );
            })}
          </select>
        </div>
      </header>
      <ul className={styles.transactionsList}>
        {filteredTransactions.map((transactionData) => {
          return (
            <Transaction
              key={transactionData.id}
              transactionData={transactionData}
              isOpenAddModal={isOpenAddModal}
              setIsOpenAddModal={setIsOpenAddModal}
              setEditMode={setEditMode}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Transactions;
