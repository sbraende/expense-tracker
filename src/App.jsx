import { useEffect, useState } from "react";
import styles from "./App.module.css";
import AddTransaction from "./components/AddTransaction/AddTransaction";
import Balance from "./components/Balance/Balance";
import Header from "./components/Header/Header";
import InputModal from "./components/InputModal/InputModal";
import Transactions from "./components/Transactions/Transactions";
// import transactionsData from "./data/transactionsData";

function App() {
  const [total, setTotal] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [transactionsData, setTransactionsData] = useState(
    JSON.parse(localStorage.getItem("transactions")) || []
  );

  const getTransactions = (transactionsData) => {
    let totalExpenses = 0;
    let totalIncome = 0;

    transactionsData.forEach((transaction) => {
      if (transaction.isIncome) {
        totalIncome += parseFloat(transaction.amount);
      } else {
        totalExpenses += parseFloat(transaction.amount);
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
        <h1>Transactions</h1>

        {transactionsData.length === 0 ? (
          <p className={styles.addTransactionMessage}>
            Click + button to add a transaction
          </p>
        ) : (
          <Transactions
            transactionsData={transactionsData}
            isOpenAddModal={isOpenAddModal}
            setIsOpenAddModal={setIsOpenAddModal}
            setEditMode={setEditMode}
          />
        )}
      </main>
      <AddTransaction setIsOpenAddModal={setIsOpenAddModal} />
      {isOpenAddModal && (
        <InputModal
          setIsOpenAddModal={setIsOpenAddModal}
          transactionsData={transactionsData}
          setTransactionsData={setTransactionsData}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      )}
    </>
  );
}

export default App;
