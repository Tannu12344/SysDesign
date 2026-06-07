import { useState, useCallback } from 'react'
import type { TabId, TabCache, TabData } from '../types/report'

export function useTabCache(product: string) {
  const storageKey = `sde_tabs_${product.toLowerCase().replace(/\s+/g, '_')}`

  const loadFromStorage = (): TabCache => {
    try {
      const raw = localStorage.getItem(storageKey)
      return raw ? JSON.parse(raw) : {}
    } catch {
      return {}
    }
  }

  const [cache, setCache] = useState<TabCache>(loadFromStorage)

  const getTab = useCallback((tab: TabId): TabData | undefined => {
    return cache[tab]
  }, [cache])

  const setTab = useCallback((tab: TabId, data: TabData) => {
    setCache(prev => {
      const next = { ...prev, [tab]: data }
      try { localStorage.setItem(storageKey, JSON.stringify(next)) } catch {}
      return next
    })
  }, [storageKey])

  const hasTab = useCallback((tab: TabId): boolean => {
    return tab in cache
  }, [cache])

  const clearCache = useCallback(() => {
    setCache({})
    try { localStorage.removeItem(storageKey) } catch {}
  }, [storageKey])

  return { getTab, setTab, hasTab, clearCache }
}
