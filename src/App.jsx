import styles from "./App.module.css";
import Balance from "./components/Balance/Balance";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <main>
        <Balance />
        {/* Transactions */}
        {/* Add */}
      </main>
      <footer></footer>
    </div>
  );
}
export default App;
