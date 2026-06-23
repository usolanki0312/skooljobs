import { CreditCard } from "lucide-react";
import styles from "./styles/SchoolTransactions.module.css";

const SchoolTransactions = () => (
  <div className={styles.wrap}>
    <CreditCard size={40} className={styles.icon} />
    <h2 className={styles.title}>Transactions</h2>
    <p className={styles.text}>
      Package and payment transaction records will appear here once your first plan is activated.
    </p>
  </div>
);

export default SchoolTransactions;
