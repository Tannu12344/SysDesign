import { useState, useCallback } from 'react'
import type { SavedReport, ReportMode } from '../types/phase5'

const KEY = 'sde_saved_reports'

function load(): SavedReport[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function save(reports: SavedReport[]) {
  try { localStorage.setItem(KEY, JSON.stringify(reports)) } catch { /* ignore */ }
}

export function useSavedReports() {
  const [saved, setSaved] = useState<SavedReport[]>(load)

  const saveReport = useCallback((
    title: string,
    subtitle: string,
    mode: ReportMode,
    data: unknown,
    tags: string[] = []
  ): string => {
    const id = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
    const entry: SavedReport = { id, title, subtitle, mode, data, savedAt: Date.now(), tags }
    setSaved(prev => {
      const next = [entry, ...prev]
      save(next)
      return next
    })
    return id
  }, [])

  const removeReport = useCallback((id: string) => {
    setSaved(prev => {
      const next = prev.filter(r => r.id !== id)
      save(next)
      return next
    })
  }, [])

  const clearAll = useCallback(() => {
    setSaved([])
    try { localStorage.removeItem(KEY) } catch { /* ignore */ }
  }, [])

  const isSaved = useCallback((title: string, mode: ReportMode): boolean => {
    return saved.some(r => r.title === title && r.mode === mode)
  }, [saved])

  return { saved, saveReport, removeReport, clearAll, isSaved }
}
