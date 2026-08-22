import { useState } from 'react'

import { PRODUCTS } from '../../prompts/architecturePrompt'
import type { RevisionDuration } from '../../types/report'

import s from '../interview/InterviewSelector.module.css'

const DURATIONS: {
  value: RevisionDuration
  label: string
  desc: string
}[] = [
  { value: '5', label: '5 min', desc: 'Walking in' },
  { value: '15', label: '15 min', desc: 'This morning' },
  { value: '30', label: '30 min', desc: 'Night before' },
]

interface Props {
  loading: boolean
  onGenerate: (
    product: string,
    duration: RevisionDuration
  ) => void
}

export default function RevisionSelector({
  loading,
  onGenerate,
}: Props) {
  const [product, setProduct] = useState('')
  const [duration, setDuration] =
    useState<RevisionDuration>('15')

  const handleSubmit = () => {
    const p = product.trim()

    if (!p || loading) return

    onGenerate(p, duration)
  }

  return (
    <div className={s.wrap}>

      <i
        className={`ti ti-book ${s.icon}`}
        aria-hidden="true"
      />

      <div>
        <p className={s.desc}>
          Pick a product and how much time you have — get a
          focused cheat sheet with the core decisions,
          services, and likely questions.
        </p>
      </div>

      <div className={s.form}>

        {/* =====================================================
            PRODUCT
            ===================================================== */}

        <div>
          <label
            className={s.fieldLabel}
            htmlFor="revision-product"
          >
            Product
          </label>

          <div className={s.searchWrap}>
            <i
              className="ti ti-search"
              aria-hidden="true"
            />

            <input
              id="revision-product"
              className={s.searchInput}
              type="text"
              placeholder="Uber, Netflix, WhatsApp..."
              value={product}
              onChange={e => setProduct(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleSubmit()
                }
              }}
              disabled={loading}
            />
          </div>
        </div>

        {/* =====================================================
            TIME AVAILABLE
            ===================================================== */}

        <div>
          <div className={s.fieldLabel}>
            Time Available
          </div>

          <div
            className={s.levelGrid}
            style={{
              gridTemplateColumns:
                'repeat(3, 1fr)',
            }}
          >
            {DURATIONS.map(d => {
              const isSelected = duration === d.value

              return (
                <button
                  key={d.value}
                  type="button"
                  className={`${s.levelBtn} ${
                    isSelected ? s.active : ''
                  }`}
                  onClick={() => setDuration(d.value)}
                  disabled={loading}
                  aria-pressed={isSelected}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    padding: '10px 8px',
                  }}
                >
                  <span
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {d.label}
                  </span>

                  <span
                    style={{
                      fontSize: 10,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {d.desc}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* =====================================================
            PRODUCT SUGGESTIONS
            ===================================================== */}

        <div className={s.chips}>
          {PRODUCTS.slice(0, 8).map(p => (
            <button
              key={p}
              type="button"
              className={s.chip}
              onClick={() => setProduct(p)}
              disabled={loading}
            >
              {p}
            </button>
          ))}
        </div>

        {/* =====================================================
            GENERATE
            ===================================================== */}

        <button
          type="button"
          className={s.genBtn}
          onClick={handleSubmit}
          disabled={
            loading || !product.trim()
          }
        >
          {loading ? (
            <>
              <span className={s.spinner} />
              Generating...
            </>
          ) : (
            <>
              Generate Cheat Sheet
              <i
                className="ti ti-arrow-right"
                aria-hidden="true"
              />
            </>
          )}
        </button>

      </div>
    </div>
  )
}