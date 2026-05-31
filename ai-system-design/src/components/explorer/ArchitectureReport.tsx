import styles from './ArchitectureReport.module.css'
import ServiceCard from './ServiceCard'
import type { ArchitectureReport as Report } from '../../types/report'

interface Props {
  report: Report
  onCopy: () => void
}

export default function ArchitectureReport({ report, onCopy }: Props) {
  return (
    <div className={`${styles.wrap} fade-in`}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.product}>{report.product}</h1>
          <p className={styles.tagline}>{report.tagline}</p>
        </div>
        <div className={styles.actions}>
          <span className={styles.badge}>Architecture Report</span>
          <button className={styles.copyBtn} onClick={onCopy} title="Copy as Markdown">
            <i className="ti ti-copy" aria-hidden="true" /> Copy
          </button>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <i className="ti ti-info-circle" aria-hidden="true" /> Product Overview
        </div>
        <p className={styles.overviewText}>{report.overview}</p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <i className="ti ti-list-check" aria-hidden="true" /> Requirements
        </div>
        <div className={styles.reqGrid}>
          <div className={styles.reqCard}>
            <div className={styles.reqCardTitle}>Functional</div>
            <ul className={styles.reqList}>
              {report.functionalRequirements.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
          <div className={styles.reqCard}>
            <div className={styles.reqCardTitle}>Non-Functional</div>
            <ul className={styles.reqList}>
              {report.nonFunctionalRequirements.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <i className="ti ti-components" aria-hidden="true" /> Service Architecture
          <span className={styles.count}>{report.services.length} services</span>
        </div>
        <div className={styles.servicesGrid}>
          {report.services.map((s, i) => (
            <ServiceCard key={i} service={s} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <i className="ti ti-server" aria-hidden="true" /> Infrastructure Overview
        </div>
        <div className={styles.infraBlock}>
          {report.infrastructure}
        </div>
      </section>

      <div className={styles.footer}>
        <span>Phase 2 coming soon — Database, Caching, Kafka, APIs, Scaling & more</span>
      </div>
    </div>
  )
}
