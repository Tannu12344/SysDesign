import { useState, useCallback } from 'react'
import CustomSelector from './CustomSelector'
import CustomReportView from './CustomReport'
import { useGeminiCall } from '../../hooks/useGeminiCall'
import { useCustomCache } from '../../hooks/usePhase4Cache'
import { getCustomDesignPrompt, CUSTOM_LOADING_MESSAGES } from '../../prompts/phase4Prompts'
import type { CustomReport } from '../../types/phase4'
import s from '../compare/CompareMode.module.css'

type State = 'idle' | 'loading' | 'success' | 'error'

export default function CustomMode() {
  const [state, setState] = useState<State>('idle')
  const [report, setReport] = useState<CustomReport | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loadingMsg, setLoadingMsg] = useState('')
  const [lastDesc, setLastDesc] = useState('')

  const { callGemini } = useGeminiCall()
  const cache = useCustomCache()

  const handleGenerate = useCallback(async (description: string) => {
    setLastDesc(description)

    if (cache.has(description)) {
      const cached = cache.get(description)
      if (cached) { setReport(cached); setState('success'); return }
    }

    setState('loading')
    setError(null)

    let idx = 0
    setLoadingMsg(CUSTOM_LOADING_MESSAGES[0])
    const interval = setInterval(() => {
      idx = (idx + 1) % CUSTOM_LOADING_MESSAGES.length
      setLoadingMsg(CUSTOM_LOADING_MESSAGES[idx])
    }, 2000)

    try {
      const raw = await callGemini(getCustomDesignPrompt(description), 5000)
      const parsed = JSON.parse(raw) as CustomReport
      cache.set(description, parsed)
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
        <div className={s.loadingTitle}>Designing your system...</div>
        <div className={s.loadingMsg}>{loadingMsg}</div>
      </div>
    )
  }

  if (state === 'error') {
    return (
      <div className={s.errorWrap}>
        <i className="ti ti-alert-circle" />
        <div>{error}</div>
        <button onClick={() => handleGenerate(lastDesc)}>
          <i className="ti ti-refresh" /> Retry
        </button>
      </div>
    )
  }

  if (state === 'success' && report) {
    return (
      <div style={{ height: '100%', overflowY: 'auto' }}>
        <CustomReportView report={report} onReset={() => setState('idle')} />
      </div>
    )
  }

  return <CustomSelector loading={false} onGenerate={handleGenerate} />
}
