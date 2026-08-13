import { useState } from 'react'
import { COMPARE_PAIRS } from '../../types/phase4'
import s from './CompareSelector.module.css'

interface Props {
  loading: boolean
  onGenerate: (a: string, b: string) => void
}

// Group pairs by category
const grouped = COMPARE_PAIRS.reduce<Record<string, typeof COMPARE_PAIRS>>((acc, p) => {
  if (!acc[p.category]) acc[p.category] = []
  acc[p.category].push(p)
  return acc
}, {})

export default function CompareSelector({ loading, onGenerate }: Props) {
  const [itemA, setItemA] = useState('')
  const [itemB, setItemB] = useState('')

  const handleSubmit = () => {
    const a = itemA.trim()
    const b = itemB.trim()
    if (!a || !b || loading) return
    onGenerate(a, b)
  }

  const handlePairClick = (a: string, b: string) => {
    setItemA(a)
    setItemB(b)
    onGenerate(a, b)
  }

  return (
    <div className={s.wrap}>
      <h2 className={s.title}>Compare Systems</h2>
      <p className={s.desc}>
        Compare any two technologies, architectures, or products side-by-side.
        Get advantages, disadvantages, a decision matrix, and interview questions.
      </p>

      <div className={s.inputRow}>
        <div className={s.inputWrap}>
          <i className="ti ti-cube" aria-hidden="true" />
          <input
            className={s.input}
            type="text"
            placeholder="e.g. Kafka"
            value={itemA}
            onChange={e => setItemA(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            disabled={loading}
          />
        </div>
        <div className={s.vsLabel}>vs</div>
        <div className={s.inputWrap}>
          <i className="ti ti-cube" aria-hidden="true" />
          <input
            className={s.input}
            type="text"
            placeholder="e.g. RabbitMQ"
            value={itemB}
            onChange={e => setItemB(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            disabled={loading}
          />
        </div>
      </div>

      <button
        className={s.genBtn}
        onClick={handleSubmit}
        disabled={loading || !itemA.trim() || !itemB.trim()}
      >
        {loading
          ? <><span className={s.spinner} />Comparing...</>
          : <>Compare <i className="ti ti-arrows-diff" aria-hidden="true" /></>
        }
      </button>

      <div className={s.sectionLabel}>Quick Compare</div>

      {Object.entries(grouped).map(([category, pairs]) => (
        <div key={category} className={s.categorySection}>
          <div className={s.categoryLabel}>{category}</div>
          <div className={s.pairsGrid}>
            {pairs.map(p => (
              <button
                key={p.label}
                className={s.pairChip}
                onClick={() => handlePairClick(p.a, p.b)}
                disabled={loading}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
