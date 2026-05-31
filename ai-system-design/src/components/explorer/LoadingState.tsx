import styles from './LoadingState.module.css'

interface LoadingStateProps {
  message: string
  product: string
}

export default function LoadingState({ message, product }: LoadingStateProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.ring} />
      <div className={styles.productName}>{product}</div>
      <div className={styles.message}>{message}</div>
      <div className={styles.dots}>
        <span /><span /><span />
      </div>
    </div>
  )
}
