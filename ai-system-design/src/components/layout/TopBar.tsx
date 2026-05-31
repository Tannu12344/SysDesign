import { useRef, useEffect } from 'react'
import styles from './TopBar.module.css'
import { PRODUCTS } from '../../prompts/architecturePrompt'

interface TopBarProps {
  query: string
  loading: boolean
  onQueryChange: (q: string) => void
  onGenerate: () => void
}

export default function TopBar({ query, loading, onQueryChange, onGenerate }: TopBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) onGenerate()
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.topbar}>
        <div className={styles.searchWrap}>
          <i className="ti ti-search" aria-hidden="true" />
          <input
            ref={inputRef}
            className={styles.searchInput}
            type="text"
            placeholder="Type a product — Uber, Netflix, WhatsApp, Zomato..."
            value={query}
            onChange={e => onQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <kbd className={styles.kbd}>⌘K</kbd>
        </div>
        <button
          className={styles.genBtn}
          onClick={onGenerate}
          disabled={loading || !query.trim()}
        >
          {loading ? (
            <>
              <span className={styles.spinner} />
              Generating...
            </>
          ) : (
            <>Generate <i className="ti ti-arrow-right" aria-hidden="true" /></>
          )}
        </button>
      </div>

      <div className={styles.chips}>
        {PRODUCTS.slice(0, 14).map(p => (
          <button
            key={p}
            className={styles.chip}
            onClick={() => { onQueryChange(p); }}
            disabled={loading}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  )
}
