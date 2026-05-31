import styles from './ServiceCard.module.css'
import type { Service } from '../../types/report'

const TYPE_COLORS: Record<string, string> = {
  Core:       'purple',
  Platform:   'blue',
  Data:       'teal',
  'Real-Time': 'amber',
  Gateway:    'coral',
}

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const color = TYPE_COLORS[service.type] || 'gray'

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.name}>{service.name}</span>
        <span className={`${styles.type} ${styles[color]}`}>{service.type}</span>
      </div>
      <p className={styles.resp}>{service.responsibility}</p>
      <div className={styles.stack}>
        <i className="ti ti-stack-2" aria-hidden="true" />
        {service.techStack}
      </div>
    </div>
  )
}
