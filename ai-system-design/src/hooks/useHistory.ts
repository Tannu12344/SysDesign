import { useState, useEffect } from 'react'
import type { HistoryEntry } from '../types/report'

const STORAGE_KEY = 'sde_history'
const MAX_ENTRIES = 20

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setHistory(JSON.parse(raw))
    } catch {
      setHistory([])
    }
  }, [])

  const addEntry = (entry: HistoryEntry) => {
    setHistory(prev => {
      const filtered = prev.filter(h => h.product.toLowerCase() !== entry.product.toLowerCase())
      const next = [entry, ...filtered].slice(0, MAX_ENTRIES)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }

  const removeEntry = (product: string) => {
    setHistory(prev => {
      const next = prev.filter(h => h.product !== product)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }

  const clearAll = () => {
    setHistory([])
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }

  return { history, addEntry, removeEntry, clearAll }
}
