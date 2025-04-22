import styles from "./App.module.css";
import Balance from "./components/Balance/Balance";
import Header from "./components/Header/Header";
import Transactions from "./components/Transactions/Transactions";

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Balance />
        <Transactions />
        {/* Add */}
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
