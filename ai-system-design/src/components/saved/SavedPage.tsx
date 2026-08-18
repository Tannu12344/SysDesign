import { useState } from 'react'
import type { SavedReport, ReportMode } from '../../types/phase5'
import {
  architectureToMarkdown, interviewToMarkdown, revisionToMarkdown,
  compareToMarkdown, customToMarkdown, downloadMarkdown, copyToClipboard
} from '../../utils/exportUtils'
import type { ArchitectureReport, InterviewReport, RevisionReport } from '../../types/report'
import type { CompareReport, CustomReport } from '../../types/phase4'
import s from './SavedPage.module.css'

interface Props {
  saved: SavedReport[]
  onRemove: (id: string) => void
  onClearAll: () => void
  onLoad: (report: SavedReport) => void
}

const MODE_LABELS: Record<ReportMode, string> = {
  architecture: 'Architecture',
  interview: 'Interview',
  revision: 'Revision',
  compare: 'Compare',
  custom: 'Custom',
}

function getMarkdown(report: SavedReport): string {
  try {
    switch (report.mode) {
      case 'architecture': return architectureToMarkdown(report.data as ArchitectureReport)
      case 'interview':    return interviewToMarkdown(report.data as InterviewReport)
      case 'revision':     return revisionToMarkdown(report.data as RevisionReport)
      case 'compare':      return compareToMarkdown(report.data as CompareReport)
      case 'custom':       return customToMarkdown(report.data as CustomReport)
    }
  } catch { return '# Export Error\nCould not export this report.' }
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

const FILTERS: { label: string; value: ReportMode | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Architecture', value: 'architecture' },
  { label: 'Interview', value: 'interview' },
  { label: 'Revision', value: 'revision' },
  { label: 'Compare', value: 'compare' },
  { label: 'Custom', value: 'custom' },
]

export default function SavedPage({
  saved,
  onRemove,
  onClearAll,
  onLoad,
}: Props) {
  const [filter, setFilter] = useState<ReportMode | 'all'>('all')
  const [copied, setCopied] = useState<string | null>(null)
  const [confirmClear, setConfirmClear] = useState(false)

  const filtered = filter === 'all' ? saved : saved.filter(r => r.mode === filter)

  const handleCopy = async (report: SavedReport, e: React.MouseEvent) => {
    e.stopPropagation()
    await copyToClipboard(getMarkdown(report))
    setCopied(report.id)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleDownload = (report: SavedReport, e: React.MouseEvent) => {
    e.stopPropagation()
    const md = getMarkdown(report)
    const filename = `${report.title.toLowerCase().replace(/\s+/g, '-')}-${report.mode}`
    downloadMarkdown(md, filename)
  }

  const handleExportAll = () => {
    const all = saved.map(r => getMarkdown(r)).join('\n\n---\n\n')
    downloadMarkdown(all, 'all-saved-reports')
  }

  if (saved.length === 0) {
    return (
      <div className={s.wrap}>
        <div className={s.topbar}>
          <h2 className={s.title}>Saved Reports</h2>
        </div>
        <div className={s.empty}>
          <i className="ti ti-bookmark" aria-hidden="true" />
          <h3>No saved reports</h3>
          <p>Click the bookmark icon on any generated report to save it here for quick access.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={s.wrap}>
      <div className={s.topbar}>
        <h2 className={s.title}>Saved Reports</h2>
        <span className={s.count}>{saved.length} saved</span>

        <button
          className={s.exportBtn}
          onClick={handleExportAll}
          title="Export all as Markdown"
        >
          <i className="ti ti-download" aria-hidden="true" /> Export All
        </button>

        <button
          className={s.clearBtn}
          onClick={() => {
            if (!confirmClear) {
              setConfirmClear(true)
              return
            }
            onClearAll()
            setConfirmClear(false)
          }}
        >
          <i className="ti ti-trash" aria-hidden="true" />
          {confirmClear ? 'Confirm?' : 'Clear All'}
        </button>
      </div>

      <div className={s.filters}>
        {FILTERS.map(f => (
          <button
            key={f.value}
            className={`${s.filterBtn} ${filter === f.value ? s.active : ''}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className={s.content}>
        <div className={s.grid}>
          {filtered.map(report => (
            <div
              key={report.id}
              className={s.card}
              onClick={() => onLoad(report)}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter') onLoad(report)
              }}
            >
              <div className={s.cardHeader}>
                <span className={s.cardTitle}>{report.title}</span>
                <span className={`${s.modeBadge} ${s[report.mode]}`}>
                  {MODE_LABELS[report.mode]}
                </span>
              </div>

              <p className={s.cardSubtitle}>{report.subtitle}</p>

              <div className={s.cardFooter}>
                <span className={s.timestamp}>
                  {timeAgo(report.savedAt)}
                </span>

                <div className={s.cardActions}>
                  <button
                    className={s.iconBtn}
                    title="Copy Markdown"
                    onClick={e => handleCopy(report, e)}
                  >
                    <i
                      className={`ti ${copied === report.id ? 'ti-check' : 'ti-copy'}`}
                      aria-hidden="true"
                    />
                  </button>

                  <button
                    className={s.iconBtn}
                    title="Download Markdown"
                    onClick={e => handleDownload(report, e)}
                  >
                    <i className="ti ti-download" aria-hidden="true" />
                  </button>

                  <button
                    className={`${s.iconBtn} ${s.danger}`}
                    title="Remove"
                    onClick={e => {
                      e.stopPropagation()
                      onRemove(report.id)
                    }}
                  >
                    <i className="ti ti-trash" aria-hidden="true" />
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