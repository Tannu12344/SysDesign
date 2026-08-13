import { useState } from 'react'
import { CUSTOM_EXAMPLES } from '../../types/phase4'
import s from './CustomSelector.module.css'

interface Props {
  loading: boolean
  onGenerate: (description: string) => void
}

export default function CustomSelector({ loading, onGenerate }: Props) {
  const [description, setDescription] = useState('')

  const handleSubmit = () => {
    const d = description.trim()
    if (!d || loading) return
    onGenerate(d)
  }

  const handleExample = (ex: string) => {
    setDescription(ex)
    onGenerate(ex)
  }

  return (
    <div className={s.wrap}>
      <h2 className={s.title}>Custom Design Mode</h2>
      <p className={s.desc}>
        Describe any system in plain English. The platform derives requirements,
        designs the architecture, estimates scale, and generates interview angles.
      </p>

      <div className={s.textareaWrap}>
        <textarea
          className={s.textarea}
          placeholder="Design a food delivery app like Zomato for 1 million users..."
          value={description}
          onChange={e => setDescription(e.target.value)}
          disabled={loading}
          rows={4}
        />
      </div>
      <div className={s.charCount}>{description.length} chars</div>

      <button
        className={s.genBtn}
        onClick={handleSubmit}
        disabled={loading || !description.trim()}
      >
        {loading
          ? <><span className={s.spinner} />Designing system...</>
          : <>Design System <i className="ti ti-pencil" aria-hidden="true" /></>
        }
      </button>

      <div className={s.sectionLabel}>Examples</div>
      <div className={s.examplesGrid}>
        {CUSTOM_EXAMPLES.map(ex => (
          <button
            key={ex}
            className={s.exampleChip}
            onClick={() => handleExample(ex)}
            disabled={loading}
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  )
}
