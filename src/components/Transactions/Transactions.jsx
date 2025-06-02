import { useState } from "react";
import {
  allCategories,
  expenseCategories,
  incomeCategories,
} from "../../data/categoriesData";
import { capitalizeLetter } from "../../utilities/naming";
import Transaction from "../Transaction/Transaction";
import styles from "./Transactions.module.css";

const Transactions = ({
  transactionsData,
  isOpenAddModal,
  setIsOpenAddModal,
  setEditMode,
}) => {
  // Hooks
  const [filter, setFilter] = useState({
    type: "all",
    date: "all",
    category: "all",
  });

  // Logic
  const updateFilter = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const timestempToMonth = (timestamp) => {
    const month = new Date(timestamp).toLocaleDateString("en-GB", {
      month: "long",
    });

    return `${month[0].toLowerCase()}${month.slice(1)}`;
  };

  const filterTransactions = () => {
    let filteredList = [...transactionsData];

    // Transaction type filter
    if (filter.type !== "all") {
      if (filter.type === "income") {
        filteredList = filteredList.filter((t) => t.isIncome);
      }
      if (filter.type === "expences") {
        filteredList = filteredList.filter((t) => !t.isIncome);
      }
    }

    // Transaction date filter
    if (filter.date !== "all") {
      filteredList = filteredList.filter((t) => {
        return timestempToMonth(t.date) === filter.date;
      });
    }

    // Transaction category filter
    if (filter.category !== "all") {
      filteredList = filteredList.filter((t) => t.category === filter.category);
    }

    return filteredList;
  };

  const categoryType = () => {
    if (filter.type !== "all") {
      if (filter.type === "income") return incomeCategories;
      if (filter.type === "expences") return expenseCategories;
    }
    return allCategories;
  };

  // JSX-markup
  return (
    <section className={styles.transactionsSection}>
      <header className={styles.transactionHeader}>
        <div className={styles.filterContainer}>
          {/* Filter transaction type */}
          <div className={styles.filterGroup}>
            <p className={styles.filterLabel}>Type</p>
            <select
              className={styles.filterSelect}
              onChange={updateFilter}
              name="type"
              value={filter.type}
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expences">Expences</option>
            </select>
          </div>

          {/* Filter transaction date */}
          <div className={styles.filterGroup}>
            <p className={styles.filterLabel}>Date</p>
            <select
              className={styles.filterSelect}
              onChange={updateFilter}
              name="date"
              value={filter.date}
            >
              <option value="all">All</option>
              <option value="january">January</option>
              <option value="february">February</option>
              <option value="march">March</option>
              <option value="april">April</option>
              <option value="may">May</option>
              <option value="june">June</option>
              <option value="july">July</option>
              <option value="august">August</option>
              <option value="september">September</option>
              <option value="october">October</option>
              <option value="november">November</option>
              <option value="december">December</option>
            </select>
          </div>

          {/* Filter transaction category */}
          <div className={styles.filterGroup}>
            <p className={styles.filterLabel}>Category</p>
            <select
              className={styles.filterSelect}
              onChange={updateFilter}
              name="category"
              value={filter.category}
            >
              <option value="all">All</option>
              {categoryType().map((category) => {
                return (
                  <option key={category} value={category}>
                    {capitalizeLetter(category)}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            className={styles.resetFiltersButton}
            onClick={() =>
              setFilter({ type: "all", date: "all", category: "all" })
            }
          >
            Reset filters
          </button>
        </div>
      </header>
      <ul className={styles.transactionsList}>
        {filterTransactions().map((transactionData) => {
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
