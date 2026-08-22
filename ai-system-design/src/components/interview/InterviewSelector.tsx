import { useState } from 'react'
import { PRODUCTS } from '../../prompts/architecturePrompt'
import type { ExperienceLevel } from '../../types/report'
import s from './InterviewSelector.module.css'

const LEVELS: ExperienceLevel[] = ['Junior', 'Mid', 'Senior', 'Staff']

interface Props {
  loading: boolean
  onGenerate: (product: string, level: ExperienceLevel) => void
}

export default function InterviewSelector({ loading, onGenerate }: Props) {
  const [product, setProduct] = useState('')
  const [level, setLevel] = useState<ExperienceLevel>('Mid')

  const handleSubmit = () => {
    const p = product.trim()
    if (!p || loading) return
    onGenerate(p, level)
  }

  return (
    <div className={s.wrap}>
      <i className={`ti ti-help-circle ${s.icon}`} aria-hidden="true" />
      <div>
        
        <p className={s.desc}>
          Pick a product and your target level — get 10 calibrated interview
          questions, follow-ups, tradeoff questions, and answer frameworks.
        </p>
      </div>

      <div className={s.form}>
        <div>
          <div className={s.fieldLabel}>Product</div>
          <div className={s.searchWrap}>
            <i className="ti ti-search" aria-hidden="true" />
            <input
              className={s.searchInput}
              type="text"
              placeholder="Uber, Netflix, WhatsApp..."
              value={product}
              onChange={e => setProduct(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <div className={s.fieldLabel}>Experience Level</div>
          <div className={s.levelGrid}>
            {LEVELS.map(l => (
              <button
                key={l}
                className={`${s.levelBtn} ${level === l ? s.active : ''}`}
                onClick={() => setLevel(l)}
                disabled={loading}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className={s.chips}>
          {PRODUCTS.slice(0, 8).map(p => (
            <button key={p} className={s.chip} onClick={() => setProduct(p)} disabled={loading}>
              {p}
            </button>
          ))}
        </div>

        <button className={s.genBtn} onClick={handleSubmit} disabled={loading || !product.trim()}>
          {loading ? (
            <><span className={s.spinner} />Generating...</>
          ) : (
            <>Generate Interview <i className="ti ti-arrow-right" aria-hidden="true" /></>
          )}
        </button>
      </div>
    </div>
  )
}
