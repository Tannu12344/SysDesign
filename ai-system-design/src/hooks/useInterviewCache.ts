import { useState, useCallback } from 'react'
import type { ExperienceLevel, InterviewReport, RevisionDuration, RevisionReport } from '../types/report'

function slugify(s: string) {
  return s.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
}

export function useInterviewCache() {
  const getKey = (product: string, level: ExperienceLevel) =>
    `sde_interview_${slugify(product)}_${level.toLowerCase()}`

  const [cache, setCache] = useState<Record<string, InterviewReport>>({})

  const getReport = useCallback((product: string, level: ExperienceLevel): InterviewReport | undefined => {
    const key = getKey(product, level)
    if (cache[key]) return cache[key]
    try {
      const raw = localStorage.getItem(key)
      if (raw) return JSON.parse(raw) as InterviewReport
    } catch { /* ignore */ }
    return undefined
  }, [cache])

  const setReport = useCallback((product: string, level: ExperienceLevel, data: InterviewReport) => {
    const key = getKey(product, level)
    setCache(prev => ({ ...prev, [key]: data }))
    try { localStorage.setItem(key, JSON.stringify(data)) } catch { /* ignore */ }
  }, [])

  const hasReport = useCallback((product: string, level: ExperienceLevel): boolean => {
    const key = getKey(product, level)
    if (key in cache) return true
    try { return localStorage.getItem(key) !== null } catch { return false }
  }, [cache])

  return { getReport, setReport, hasReport }
}

export function useRevisionCache() {
  const getKey = (product: string, duration: RevisionDuration) =>
    `sde_revision_${slugify(product)}_${duration}`

  const [cache, setCache] = useState<Record<string, RevisionReport>>({})

  const getReport = useCallback((product: string, duration: RevisionDuration): RevisionReport | undefined => {
    const key = getKey(product, duration)
    if (cache[key]) return cache[key]
    try {
      const raw = localStorage.getItem(key)
      if (raw) return JSON.parse(raw) as RevisionReport
    } catch { /* ignore */ }
    return undefined
  }, [cache])

  const setReport = useCallback((product: string, duration: RevisionDuration, data: RevisionReport) => {
    const key = getKey(product, duration)
    setCache(prev => ({ ...prev, [key]: data }))
    try { localStorage.setItem(key, JSON.stringify(data)) } catch { /* ignore */ }
  }, [])

  const hasReport = useCallback((product: string, duration: RevisionDuration): boolean => {
    const key = getKey(product, duration)
    if (key in cache) return true
    try { return localStorage.getItem(key) !== null } catch { return false }
  }, [cache])

  return { getReport, setReport, hasReport }
}
