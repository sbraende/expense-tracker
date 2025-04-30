import { useEffect, useState } from "react";
import styles from "./App.module.css";
import AddTransaction from "./components/AddTransaction/AddTransaction";
import Balance from "./components/Balance/Balance";
import Header from "./components/Header/Header";
import InputModal from "./components/InputModal/InputModal";
import Transactions from "./components/Transactions/Transactions";
import transactionsData from "./data/transactionsData";

function App() {
  const [total, setTotal] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [openAddModal, setOpenAddModal] = useState(false);

  const getTransactions = (transactionsData) => {
    let totalExpenses = 0;
    let totalIncome = 0;

    transactionsData.forEach((transaction) => {
      if (transaction.isIncome) {
        totalIncome += transaction.amount;
      } else {
        totalExpenses += transaction.amount;
      }
    });

    setIncome(totalIncome);
    setExpense(totalExpenses);
    setTotal(totalIncome - totalExpenses);
  };

  useEffect(() => {
    getTransactions(transactionsData);
  }, [transactionsData]);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Balance total={total} income={income} expense={expense} />
        <Transactions transactionsData={transactionsData} />
      </main>
      <AddTransaction setOpenAddModal={setOpenAddModal} />
      {openAddModal && <InputModal setOpenAddModal={setOpenAddModal} />}
    </>
  );
}

export default App;
