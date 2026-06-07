import type { TabId } from '../../types/report'
import styles from './TabBar.module.css'

export interface TabConfig {
  id: TabId
  label: string
  icon: string
}

export const TABS: TabConfig[] = [
  { id: 'overview',   label: 'Overview',    icon: 'ti-layout-dashboard' },
  { id: 'database',   label: 'Database',    icon: 'ti-database' },
  { id: 'caching',    label: 'Caching',     icon: 'ti-bolt' },
  { id: 'messaging',  label: 'Messaging',   icon: 'ti-messages' },
  { id: 'api',        label: 'API Design',  icon: 'ti-api' },
  { id: 'realtime',   label: 'Real-Time',   icon: 'ti-broadcast' },
  { id: 'scaling',    label: 'Scaling',     icon: 'ti-trending-up' },
  { id: 'security',   label: 'Security',    icon: 'ti-shield-lock' },
  { id: 'failures',   label: 'Failures',    icon: 'ti-alert-triangle' },
  { id: 'decisions',  label: 'Decisions',   icon: 'ti-bulb' },
]

interface TabBarProps {
  activeTab: TabId
  cachedTabs: Set<TabId>
  loadingTab: TabId | null
  onSelectTab: (tab: TabId) => void
}

export default function TabBar({ activeTab, cachedTabs, loadingTab, onSelectTab }: TabBarProps) {
  return (
    <div className={styles.tabBar}>
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={[
            styles.tab,
            activeTab === tab.id ? styles.active : '',
            cachedTabs.has(tab.id) && activeTab !== tab.id ? styles.cached : '',
          ].join(' ')}
          onClick={() => onSelectTab(tab.id)}
          title={tab.label}
        >
          {loadingTab === tab.id ? (
            <span className={styles.spinner} />
          ) : (
            <i className={`ti ${tab.icon}`} aria-hidden="true" />
          )}
          <span className={styles.label}>{tab.label}</span>
          {cachedTabs.has(tab.id) && activeTab !== tab.id && (
            <span className={styles.dot} title="Cached" />
          )}
        </button>
      ))}
    </div>
  )
}
