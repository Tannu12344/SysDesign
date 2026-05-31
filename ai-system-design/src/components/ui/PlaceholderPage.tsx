import styles from './PlaceholderPage.module.css'

interface PlaceholderPageProps {
  icon: string
  title: string
  description: string
  phase: string
}

export default function PlaceholderPage({ icon, title, description, phase }: PlaceholderPageProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.icon}>
        <i className={`ti ${icon}`} aria-hidden="true" />
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.desc}>{description}</p>
      <div className={styles.phaseBadge}>
        <i className="ti ti-clock" aria-hidden="true" />
        {phase}
      </div>
    </div>
  )
}
