import styles from "./App.module.css";
import AddTransaction from "./components/AddTransaction/AddTransaction";
import Balance from "./components/Balance/Balance";
import Header from "./components/Header/Header";
import InputModal from "./components/InputModal/InputModal";
import Transactions from "./components/Transactions/Transactions";

function App() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Balance />
        <Transactions />
      </main>
      <AddTransaction />
      <InputModal />
    </>
  );
}

export default App;
