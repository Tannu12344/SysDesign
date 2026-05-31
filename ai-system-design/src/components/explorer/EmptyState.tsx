import styles from './EmptyState.module.css'

export default function EmptyState() {
  return (
    <div className={styles.wrap}>
      <div className={styles.icon}>
        <i className="ti ti-topology-star-3" aria-hidden="true" />
      </div>
      <h2 className={styles.title}>Explore any system design</h2>
      <p className={styles.desc}>
        Type a product name above — Uber, Netflix, WhatsApp, Zomato, Airbnb —
        and get a complete Staff Engineer-level architecture breakdown.
      </p>
      <div className={styles.hints}>
        <span className={styles.hint}><i className="ti ti-layout-dashboard" aria-hidden="true" /> Architecture</span>
        <span className={styles.hint}><i className="ti ti-database" aria-hidden="true" /> Database Design</span>
        <span className={styles.hint}><i className="ti ti-messages" aria-hidden="true" /> Messaging</span>
        <span className={styles.hint}><i className="ti ti-trending-up" aria-hidden="true" /> Scaling</span>
      </div>
    </div>
  )
}
