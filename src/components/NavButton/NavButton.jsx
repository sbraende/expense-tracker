import styles from "./NavButton.module.css";

const NavButton = ({ src = "icons/settings.svg", alt, onClick = () => {} }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <img className={styles.buttonIcon} src={src} alt={alt} />
    </button>
  );
};

export default NavButton;
