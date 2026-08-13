import { useState, useCallback } from 'react'
import CompareSelector from './CompareSelector'
import CompareReportView from './CompareReport'
import { useGeminiCall } from '../../hooks/useGeminiCall'
import { useCompareCache } from '../../hooks/usePhase4Cache'
import { getComparePrompt, COMPARE_LOADING_MESSAGES } from '../../prompts/phase4Prompts'
import type { CompareReport } from '../../types/phase4'
import s from './CompareMode.module.css'

type State = 'idle' | 'loading' | 'success' | 'error'

export default function CompareMode() {
  const [state, setState] = useState<State>('idle')
  const [report, setReport] = useState<CompareReport | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loadingMsg, setLoadingMsg] = useState('')
  const [lastInput, setLastInput] = useState<{ a: string; b: string } | null>(null)

  const { callGemini } = useGeminiCall()
  const cache = useCompareCache()

  const handleGenerate = useCallback(async (a: string, b: string) => {
    setLastInput({ a, b })

    if (cache.has(a, b)) {
      const cached = cache.get(a, b)
      if (cached) { setReport(cached); setState('success'); return }
    }

    setState('loading')
    setError(null)

    let idx = 0
    setLoadingMsg(COMPARE_LOADING_MESSAGES[0])
    const interval = setInterval(() => {
      idx = (idx + 1) % COMPARE_LOADING_MESSAGES.length
      setLoadingMsg(COMPARE_LOADING_MESSAGES[idx])
    }, 2000)

    try {
      const raw = await callGemini(getComparePrompt(a, b), 4000)
      const parsed = JSON.parse(raw) as CompareReport
      cache.set(a, b, parsed)
      setReport(parsed)
      setState('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setState('error')
    } finally {
      clearInterval(interval)
    }
  }, [callGemini, cache])

  if (state === 'loading') {
    return (
      <div className={s.loadingWrap}>
        <div className={s.spinner} />
        <div className={s.loadingTitle}>{lastInput?.a} vs {lastInput?.b}</div>
        <div className={s.loadingMsg}>{loadingMsg}</div>
      </div>
    )
  }

  if (state === 'error') {
    return (
      <div className={s.errorWrap}>
        <i className="ti ti-alert-circle" />
        <div>{error}</div>
        <button onClick={() => lastInput && handleGenerate(lastInput.a, lastInput.b)}>
          <i className="ti ti-refresh" /> Retry
        </button>
      </div>
    )
  }

  if (state === 'success' && report) {
    return (
      <div style={{ height: '100%', overflowY: 'auto' }}>
        <CompareReportView report={report} onReset={() => setState('idle')} />
      </div>
    )
  }

  return <CompareSelector loading={false} onGenerate={handleGenerate} />
}
