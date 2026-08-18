import styles from './Sidebar.module.css'
import type { NavPage, HistoryEntry } from '../../types/report'

interface SidebarProps {
  activePage: NavPage
  onNavigate: (page: NavPage) => void
  history: HistoryEntry[]
  onLoadHistory: (entry: HistoryEntry) => void
  collapsed: boolean
  onToggle: () => void
  mobileOpen: boolean
  onCloseMobile: () => void
}

const NAV_ITEMS: { page: NavPage; icon: string; label: string }[] = [
  { page: 'architecture', icon: 'ti-layout-dashboard', label: 'Architecture' },
  { page: 'interview', icon: 'ti-help-circle', label: 'Interview Mode' },
  { page: 'revision', icon: 'ti-book', label: 'Revision Mode' },
  { page: 'compare', icon: 'ti-arrows-diff', label: 'Compare' },
  { page: 'custom', icon: 'ti-pencil', label: 'Custom Design' },
]

const UTIL_ITEMS: { page: NavPage; icon: string; label: string }[] = [
  { page: 'history', icon: 'ti-clock', label: 'History' },
  { page: 'saved', icon: 'ti-bookmark', label: 'Saved Reports' },
  { page: 'settings', icon: 'ti-settings', label: 'Settings' },
]

export default function Sidebar({
  activePage,
  onNavigate,
  history,
  onLoadHistory,
  collapsed,
  onToggle,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const handleNavigate = (page: NavPage) => {
    onNavigate(page)
    onCloseMobile()
  }

  return (
    <>
      {mobileOpen && (
        <div
          className={styles.overlay}
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`${styles.sidebar} ${
          collapsed ? styles.collapsed : ''
        } ${mobileOpen ? styles.mobileOpen : ''}`}
      >
        <div className={styles.logo}>
          <div className={styles.logoMark}>
            <span className={styles.logoFull}>SysDesign</span>
            <span className={styles.logoShort}>SD</span>
          </div>

          <div className={styles.logoSub}>
            AI Architecture Explorer
          </div>

          <button
            className={styles.toggleBtn}
            onClick={onToggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <i
              className={`ti ${
                collapsed
                  ? 'ti-layout-sidebar-right'
                  : 'ti-layout-sidebar-left'
              }`}
              aria-hidden="true"
            />
          </button>

          <button
            className={styles.mobileClose}
            onClick={onCloseMobile}
            aria-label="Close navigation"
          >
            <i className="ti ti-x" aria-hidden="true" />
          </button>
        </div>

        <nav className={styles.nav}>
          <div className={styles.navLabel}>Explore</div>

          {NAV_ITEMS.map(({ page, icon, label }) => (
            <button
              key={page}
              className={`${styles.navItem} ${
                activePage === page ? styles.active : ''
              }`}
              onClick={() => handleNavigate(page)}
              title={collapsed ? label : undefined}
            >
              <i className={`ti ${icon}`} aria-hidden="true" />
              <span className={styles.navText}>{label}</span>
            </button>
          ))}

          <div className={styles.navLabel}>Account</div>

          {UTIL_ITEMS.map(({ page, icon, label }) => (
            <button
              key={page}
              className={`${styles.navItem} ${
                activePage === page ? styles.active : ''
              }`}
              onClick={() => handleNavigate(page)}
              title={collapsed ? label : undefined}
            >
              <i className={`ti ${icon}`} aria-hidden="true" />
              <span className={styles.navText}>{label}</span>
            </button>
          ))}
        </nav>

        <div className={styles.historyPanel}>
          <div className={styles.historyLabel}>Recent</div>

          {history.length === 0 ? (
            <div className={styles.historyEmpty}>
              No history yet
            </div>
          ) : (
            history.slice(0, 8).map(entry => (
              <button
                key={entry.timestamp}
                className={styles.historyItem}
                onClick={() => {
                  onLoadHistory(entry)
                  onCloseMobile()
                }}
                title={entry.product}
              >
                <i
                  className="ti ti-arrow-right"
                  aria-hidden="true"
                />

                <span className={styles.historyText}>
                  {entry.product}
                </span>
              </button>
            ))
          )}
        </div>
      </aside>
    </>
  )
}