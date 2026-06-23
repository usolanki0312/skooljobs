import styles from "./styles/SectionCard.module.css";

const SectionCard = ({ number, title, optional = false, headerAction = null, children }) => (
  <div className={styles.card}>
    <div className={styles.headerRow}>
      <h3 className={styles.title}>
        <span className={styles.numberBadge}>
          {number}
        </span>
        <span className={styles.titleText}>{title}</span>
        {optional && (
          <span className={styles.optionalLabel}>(Optional)</span>
        )}
      </h3>
      {headerAction}
    </div>
    {children}
  </div>
);

export default SectionCard;
