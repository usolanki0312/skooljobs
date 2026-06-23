import { useNavigate } from "react-router-dom";
import styles from "./styles/backbutton.module.css";

const BackButton = () => {

  const navigate = useNavigate();

  return (

    <button
      type="button"
      onClick={() => navigate(-1)}
      className={styles.backButton}
    >
      ← Back
    </button>

  );
};

export default BackButton;
