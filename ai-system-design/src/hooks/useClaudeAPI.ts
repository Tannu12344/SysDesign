import { useState, useCallback } from 'react'

interface UseClaudeAPIOptions {
  systemPrompt: string
  onLoadingMessage?: (msg: string) => void
  loadingMessages?: string[]
}

export function useClaudeAPI<T>({ systemPrompt, loadingMessages = [] }: UseClaudeAPIOptions) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loadingMsg, setLoadingMsg] = useState('')

  const generate = useCallback(async (userMessage: string): Promise<T | null> => {
    setLoading(true)
    setError(null)

    let msgIdx = 0
    let interval: ReturnType<typeof setInterval> | null = null

    if (loadingMessages.length > 0) {
      setLoadingMsg(loadingMessages[0])
      interval = setInterval(() => {
        msgIdx = (msgIdx + 1) % loadingMessages.length
        setLoadingMsg(loadingMessages[msgIdx])
      }, 2000)
    }

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      }
      if (apiKey) headers['x-api-key'] = apiKey

      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2000,
          system: systemPrompt,
          messages: [{ role: 'user', content: userMessage }],
        }),
      })

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}))
        throw new Error(errData?.error?.message || `API error ${resp.status}`)
      }

      const data = await resp.json()
      const raw = (data.content as Array<{ type: string; text?: string }>)
        .map(c => c.text || '')
        .join('')

      const clean = raw.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim()
      const parsed = JSON.parse(clean) as T
      return parsed

    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(msg)
      return null
    } finally {
      if (interval) clearInterval(interval)
      setLoading(false)
    }
  }, [systemPrompt, loadingMessages])

  return { generate, loading, error, loadingMsg }
}
