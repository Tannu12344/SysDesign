import { useState, useCallback } from 'react'
import type { AppSettings } from '../types/phase5'
import { DEFAULT_SETTINGS } from '../types/phase5'

const KEY = 'sde_settings'

function load(): AppSettings {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS
  } catch { return DEFAULT_SETTINGS }
}

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(load)

  const updateSettings = useCallback((partial: Partial<AppSettings>) => {
    setSettings(prev => {
      const next = { ...prev, ...partial }
      try { localStorage.setItem(KEY, JSON.stringify(next)) } catch { /* ignore */ }
      return next
    })
  }, [])

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS)
    try { localStorage.removeItem(KEY) } catch { /* ignore */ }
  }, [])

  return { settings, updateSettings, resetSettings }
}
