import { useState, useCallback } from 'react'
import RevisionSelector from './RevisionSelector'
import RevisionReportView from './RevisionReport'
import LoadingState from '../explorer/LoadingState'
import ErrorBanner from '../ui/ErrorBanner'
import { useGeminiCall } from '../../hooks/useGeminiCall'
import { useRevisionCache } from '../../hooks/useInterviewCache'
import { getRevisionPrompt, REVISION_LOADING_MESSAGES } from '../../prompts/interviewPrompt'
import type { RevisionDuration, RevisionReport } from '../../types/report'

type State = 'idle' | 'loading' | 'success' | 'error'

export default function RevisionMode() {
  const [state, setState] = useState<State>('idle')
  const [report, setReport] = useState<RevisionReport | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loadingMsg, setLoadingMsg] = useState('')
  const [lastInput, setLastInput] = useState<{ product: string; duration: RevisionDuration } | null>(null)

  const { callGemini } = useGeminiCall()
  const { getReport, setReport: cacheReport, hasReport } = useRevisionCache()

  const handleGenerate = useCallback(async (product: string, duration: RevisionDuration) => {
    setLastInput({ product, duration })

    if (hasReport(product, duration)) {
      const cached = getReport(product, duration)
      if (cached) {
        setReport(cached)
        setState('success')
        return
      }
    }

    setState('loading')
    setError(null)

    let idx = 0
    setLoadingMsg(REVISION_LOADING_MESSAGES[0])
    const interval = setInterval(() => {
      idx = (idx + 1) % REVISION_LOADING_MESSAGES.length
      setLoadingMsg(REVISION_LOADING_MESSAGES[idx])
    }, 1800)

    try {
      const prompt = getRevisionPrompt(product, duration)
      const raw = await callGemini(prompt, 3500)
      const parsed = JSON.parse(raw) as RevisionReport
      cacheReport(product, duration, parsed)
      setReport(parsed)
      setState('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setState('error')
    } finally {
      clearInterval(interval)
    }
  }, [callGemini, getReport, cacheReport, hasReport])

  const handleRetry = useCallback(() => {
    if (lastInput) handleGenerate(lastInput.product, lastInput.duration)
  }, [lastInput, handleGenerate])

  const handleReset = useCallback(() => {
    setState('idle')
    setReport(null)
  }, [])

  switch (state) {
    case 'loading':
      return <LoadingState message={loadingMsg} product={lastInput?.product || ''} />
    case 'error':
      return <ErrorBanner message={error || 'Unknown error'} onRetry={handleRetry} />
    case 'success':
      return report ? <RevisionReportView report={report} onReset={handleReset} /> : null
    default:
      return <RevisionSelector loading={false} onGenerate={handleGenerate} />
  }
}
