import styles from './MobileHeader.module.css'
import type { NavPage } from '../../types/report'

interface MobileHeaderProps {
  activePage: NavPage
  onOpenSidebar: () => void
}

const PAGE_NAMES: Record<NavPage, string> = {
  architecture: 'Architecture',
  interview: 'Interview Mode',
  revision: 'Revision Mode',
  compare: 'Compare',
  custom: 'Custom Design',
  history: 'History',
  saved: 'Saved Reports',
  settings: 'Settings',
}

export default function MobileHeader({
  activePage,
  onOpenSidebar,
}: MobileHeaderProps) {
  return (
    <header className={styles.header}>
      <button
        className={styles.menuBtn}
        onClick={onOpenSidebar}
        aria-label="Open navigation"
      >
        <i className="ti ti-menu-2" aria-hidden="true" />
      </button>

      <div className={styles.title}>
        {PAGE_NAMES[activePage]}
      </div>

      <div className={styles.spacer} />
    </header>
  )
}