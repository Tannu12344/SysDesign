import styles from './Sidebar.module.css'
import type { NavPage, HistoryEntry } from '../../types/report'

interface SidebarProps {
  activePage: NavPage
  onNavigate: (page: NavPage) => void
  history: HistoryEntry[]
  onLoadHistory: (entry: HistoryEntry) => void
}

const NAV_ITEMS: { page: NavPage; icon: string; label: string }[] = [
  { page: 'architecture', icon: 'ti-layout-dashboard', label: 'Architecture' },
  { page: 'interview',    icon: 'ti-help-circle',      label: 'Interview Mode' },
  { page: 'revision',     icon: 'ti-book',             label: 'Revision Mode' },
  { page: 'compare',      icon: 'ti-arrows-diff',      label: 'Compare' },
  { page: 'custom',       icon: 'ti-pencil',           label: 'Custom Design' },
]

const UTIL_ITEMS: { page: NavPage; icon: string; label: string }[] = [
  { page: 'history',  icon: 'ti-clock',    label: 'History' },
  { page: 'saved',    icon: 'ti-bookmark', label: 'Saved Reports' },
  { page: 'settings', icon: 'ti-settings', label: 'Settings' },
]

export default function Sidebar({ activePage, onNavigate, history, onLoadHistory }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoMark}>SysDesign</div>
        <div className={styles.logoSub}>AI Architecture Explorer</div>
      </div>

      <nav className={styles.nav}>
        <div className={styles.navLabel}>Explore</div>
        {NAV_ITEMS.map(({ page, icon, label }) => (
          <button
            key={page}
            className={`${styles.navItem} ${activePage === page ? styles.active : ''}`}
            onClick={() => onNavigate(page)}
          >
            <i className={`ti ${icon}`} aria-hidden="true" />
            {label}
          </button>
        ))}

        <div className={styles.navLabel} style={{ marginTop: '20px' }}>Account</div>
        {UTIL_ITEMS.map(({ page, icon, label }) => (
          <button
            key={page}
            className={`${styles.navItem} ${activePage === page ? styles.active : ''}`}
            onClick={() => onNavigate(page)}
          >
            <i className={`ti ${icon}`} aria-hidden="true" />
            {label}
          </button>
        ))}
      </nav>

      <div className={styles.historyPanel}>
        <div className={styles.historyLabel}>Recent</div>
        {history.length === 0 ? (
          <div className={styles.historyEmpty}>No history yet</div>
        ) : (
          history.slice(0, 8).map(entry => (
            <button
              key={entry.timestamp}
              className={styles.historyItem}
              onClick={() => onLoadHistory(entry)}
              title={entry.product}
            >
              <i className="ti ti-arrow-right" aria-hidden="true" />
              {entry.product}
            </button>
          ))
        )}
      </div>
    </aside>
  )
}
