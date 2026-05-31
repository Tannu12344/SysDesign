import styles from './ErrorBanner.module.css'

interface ErrorBannerProps {
  message: string
  onRetry: () => void
}

export default function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <i className="ti ti-alert-circle" aria-hidden="true" />
        <div>
          <div className={styles.title}>Failed to generate report</div>
          <div className={styles.message}>{message}</div>
        </div>
        <button className={styles.retryBtn} onClick={onRetry}>
          <i className="ti ti-refresh" aria-hidden="true" /> Retry
        </button>
      </div>
    </div>
  )
}
