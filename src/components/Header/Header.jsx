import NavButton from "../NavButton/NavButton";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.profileContainer}>
        <div className={styles.profilePictureContainer}>
          <img
            className={styles.profilePicture}
            src="images/profile-pictures/man_01.jpg"
            alt="Profile picture"
          />
        </div>
        <div className={styles.textContainer}>
          <p className={styles.message}>Welcome!</p>
          <h3 className={styles.profileName}>John Charter</h3>
        </div>
      </div>
      <div className={styles.settingsContainer}>
        <NavButton />
        {/* <img className={styles.settingsIcon} src="icons/settings.svg" alt="Settings icon" /> */}
      </div>
    </header>
  );
};

export default Header;
