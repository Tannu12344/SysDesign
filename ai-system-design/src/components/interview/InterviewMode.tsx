import { useState, useCallback } from 'react'
import InterviewSelector from './InterviewSelector'
import InterviewReportView from './InterviewReport'
import LoadingState from '../explorer/LoadingState'
import ErrorBanner from '../ui/ErrorBanner'
import { useGeminiCall } from '../../hooks/useGeminiCall'
import { useInterviewCache } from '../../hooks/useInterviewCache'
import { getInterviewPrompt, INTERVIEW_LOADING_MESSAGES } from '../../prompts/interviewPrompt'
import type { ExperienceLevel, InterviewReport } from '../../types/report'

type State = 'idle' | 'loading' | 'success' | 'error'

export default function InterviewMode() {
  const [state, setState] = useState<State>('idle')
  const [report, setReport] = useState<InterviewReport | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loadingMsg, setLoadingMsg] = useState('')
  const [lastInput, setLastInput] = useState<{ product: string; level: ExperienceLevel } | null>(null)

  const { callGemini } = useGeminiCall()
  const { getReport, setReport: cacheReport, hasReport } = useInterviewCache()

  const handleGenerate = useCallback(async (product: string, level: ExperienceLevel) => {
    setLastInput({ product, level })

    if (hasReport(product, level)) {
      const cached = getReport(product, level)
      if (cached) {
        setReport(cached)
        setState('success')
        return
      }
    }

    setState('loading')
    setError(null)

    let idx = 0
    setLoadingMsg(INTERVIEW_LOADING_MESSAGES[0])
    const interval = setInterval(() => {
      idx = (idx + 1) % INTERVIEW_LOADING_MESSAGES.length
      setLoadingMsg(INTERVIEW_LOADING_MESSAGES[idx])
    }, 2000)

    try {
      const prompt = getInterviewPrompt(product, level)
      const raw = await callGemini(prompt, 4000)
      const parsed = JSON.parse(raw) as InterviewReport
      cacheReport(product, level, parsed)
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
    if (lastInput) handleGenerate(lastInput.product, lastInput.level)
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
      return report ? <InterviewReportView report={report} onReset={handleReset} /> : null
    default:
      return <InterviewSelector loading={false} onGenerate={handleGenerate} />
  }
}
