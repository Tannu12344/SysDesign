import { useState } from 'react'
import type { HistoryEntry } from '../../types/report'
import s from './HistoryPage.module.css'

interface Props {
  history: HistoryEntry[]
  onLoad: (entry: HistoryEntry) => void
  onClear: () => void
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60000)
  const hrs = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  if (hrs < 24) return `${hrs}h ago`
  return `${days}d ago`
}

export default function HistoryPage({ history, onLoad, onClear }: Props) {
  const [confirmClear, setConfirmClear] = useState(false)

  const handleClear = () => {
    if (!confirmClear) { setConfirmClear(true); return }
    onClear()
    setConfirmClear(false)
  }

  if (history.length === 0) {
    return (
      <div className={s.wrap}>
        <div className={s.topbar}>
          <h2 className={s.title}>History</h2>
        </div>
        <div className={s.empty}>
          <i className="ti ti-clock" aria-hidden="true" />
          <h3>No history yet</h3>
          <p>Generate architecture reports from the Explorer tab and they'll appear here.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={s.wrap}>
      <div className={s.topbar}>
        <h2 className={s.title}>History</h2>
        <span className={s.count}>{history.length} reports</span>
        <button className={s.clearBtn} onClick={handleClear}>
          <i className="ti ti-trash" aria-hidden="true" />
          {confirmClear ? 'Click again to confirm' : 'Clear All'}
        </button>
      </div>

      <div className={s.content}>
        <div className={s.grid}>
          {history.map(entry => (
            <div
              key={entry.timestamp}
              className={s.card}
              onClick={() => onLoad(entry)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && onLoad(entry)}
            >
              <div className={s.cardHeader}>
                <span className={s.cardTitle}>{entry.product}</span>
                <span className={`${s.modeBadge} ${s.architecture}`}>Architecture</span>
              </div>
              <p className={s.cardSubtitle}>{entry.report.tagline}</p>
              <div className={s.cardFooter}>
                <span className={s.timestamp}>{timeAgo(entry.timestamp)}</span>
                <div className={s.cardActions}>
                  <button
                    className={s.iconBtn}
                    title="Load report"
                    onClick={e => { e.stopPropagation(); onLoad(entry) }}
                  >
                    <i className="ti ti-arrow-right" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
