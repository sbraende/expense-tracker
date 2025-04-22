import styles from "./App.module.css";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <main></main>
      <footer></footer>
    </div>
  );
}

export default App;
