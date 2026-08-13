import { useState, useCallback } from 'react'
import type { CompareReport, CustomReport } from '../types/phase4'

function slugify(s: string) {
  return s.toLowerCase().replace(/[\s/()]+/g, '_').replace(/[^a-z0-9_]/g, '')
}

export function useCompareCache() {
  const getKey = (a: string, b: string) => `sde_compare_${slugify(a)}_vs_${slugify(b)}`
  const [cache, setCache] = useState<Record<string, CompareReport>>({})

  const get = useCallback((a: string, b: string): CompareReport | undefined => {
    const key = getKey(a, b)
    if (cache[key]) return cache[key]
    try {
      const raw = localStorage.getItem(key)
      if (raw) return JSON.parse(raw) as CompareReport
    } catch { /* ignore */ }
    return undefined
  }, [cache])

  const set = useCallback((a: string, b: string, data: CompareReport) => {
    const key = getKey(a, b)
    setCache(prev => ({ ...prev, [key]: data }))
    try { localStorage.setItem(key, JSON.stringify(data)) } catch { /* ignore */ }
  }, [])

  const has = useCallback((a: string, b: string): boolean => {
    const key = getKey(a, b)
    if (key in cache) return true
    try { return localStorage.getItem(key) !== null } catch { return false }
  }, [cache])

  return { get, set, has }
}

export function useCustomCache() {
  const getKey = (desc: string) => `sde_custom_${slugify(desc).slice(0, 60)}`
  const [cache, setCache] = useState<Record<string, CustomReport>>({})

  const get = useCallback((desc: string): CustomReport | undefined => {
    const key = getKey(desc)
    if (cache[key]) return cache[key]
    try {
      const raw = localStorage.getItem(key)
      if (raw) return JSON.parse(raw) as CustomReport
    } catch { /* ignore */ }
    return undefined
  }, [cache])

  const set = useCallback((desc: string, data: CustomReport) => {
    const key = getKey(desc)
    setCache(prev => ({ ...prev, [key]: data }))
    try { localStorage.setItem(key, JSON.stringify(data)) } catch { /* ignore */ }
  }, [])

  const has = useCallback((desc: string): boolean => {
    const key = getKey(desc)
    if (key in cache) return true
    try { return localStorage.getItem(key) !== null } catch { return false }
  }, [cache])

  return { get, set, has }
}
