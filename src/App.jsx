import { useState } from "react";
import styles from "./App.module.css";
import AddTransaction from "./components/AddTransaction/AddTransaction";
import Balance from "./components/Balance/Balance";
import Header from "./components/Header/Header";
import InputModal from "./components/InputModal/InputModal";
import Transactions from "./components/Transactions/Transactions";
import transactionsData from "./data/transactionsData";

function App() {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expences, setExpences] = useState(0);
  // const [transactions, setTransactions] = useState(transactionsData);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Balance />
        <Transactions transactionsData={transactionsData} />
      </main>
      <AddTransaction />
      <InputModal />
    </>
  );
}

export default App;
