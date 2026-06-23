import { Package } from "lucide-react";
import styles from "./styles/SchoolPackages.module.css";

const SchoolPackages = () => (
  <div className={styles.wrap}>
    <Package size={40} className={styles.icon} />
    <h2 className={styles.title}>Packages</h2>
    <p className={styles.text}>
      Pricing plans and payment gateway details coming soon. Contact support@skooljobs.in for early access.
    </p>
  </div>
);

export default SchoolPackages;
