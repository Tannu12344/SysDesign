import { useRef, useEffect } from 'react'
import styles from './TopBar.module.css'
import { PRODUCTS } from '../../prompts/architecturePrompt'

interface TopBarProps {
  query: string
  loading: boolean
  onQueryChange: (q: string) => void
  onGenerate: () => void
  onOpenSidebar: () => void
}

export default function TopBar({
  query,
  loading,
  onQueryChange,
  onGenerate,
  onOpenSidebar,
}: TopBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handler)

    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading && query.trim()) {
      onGenerate()
    }
  }

  const handleProductClick = (product: string) => {
    if (!loading) {
      onQueryChange(product)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.topbar}>

        {/* Mobile sidebar button */}
        <button
          type="button"
          className={styles.menuBtn}
          onClick={onOpenSidebar}
          aria-label="Open navigation"
          title="Open navigation"
        >
          <i className="ti ti-menu-2" aria-hidden="true" />
        </button>

        {/* Search */}
        <div className={styles.searchWrap}>
          <i
            className={`ti ti-search ${styles.searchIcon}`}
            aria-hidden="true"
          />

          <input
            ref={inputRef}
            className={styles.searchInput}
            type="text"
            placeholder="Type a product — Uber, Netflix, WhatsApp, Zomato..."
            value={query}
            onChange={e => onQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            aria-label="System design product"
          />

          <kbd className={styles.kbd}>
            <span className={styles.kbdDesktop}>⌘K</span>
            <span className={styles.kbdWindows}>Ctrl K</span>
          </kbd>
        </div>

        {/* Generate */}
        <button
          type="button"
          className={styles.genBtn}
          onClick={onGenerate}
          disabled={loading || !query.trim()}
        >
          {loading ? (
            <>
              <span
                className={styles.spinner}
                aria-hidden="true"
              />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <span>Generate</span>
              <i
                className="ti ti-arrow-right"
                aria-hidden="true"
              />
            </>
          )}
        </button>
      </div>

      {/* Example products */}
      <div className={styles.chips} aria-label="Example products">
        {PRODUCTS.slice(0, 14).map(product => (
          <button
            key={product}
            type="button"
            className={styles.chip}
            onClick={() => handleProductClick(product)}
            disabled={loading}
          >
            {product}
          </button>
        ))}
      </div>
    </div>
  )
}