import { useCallback } from 'react'

/**
 * Low-level Groq call helper, shared across Phase 2/3 features.
 * Returns cleaned JSON text (caller is responsible for JSON.parse).
 */
export function useGeminiCall() {
  const callGemini = useCallback(async (prompt: string, maxTokens = 3000): Promise<string> => {
    const apiKey = (import.meta as { env: { VITE_GROQ_API_KEY?: string } }).env.VITE_GROQ_API_KEY
    if (!apiKey) throw new Error('VITE_GROQ_API_KEY not set')

    const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: [
          { role: 'system', content: 'Return only valid JSON. No markdown, no backticks, no preamble.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: maxTokens,
      }),
    })

    if (!resp.ok) {
      const e = await resp.json().catch(() => ({}))
      throw new Error((e as { error?: { message?: string } })?.error?.message || `API error ${resp.status}`)
    }

    const data = await resp.json()
    const raw: string = (data as { choices: { message: { content: string } }[] })
      .choices?.[0]?.message?.content ?? ''

    return raw.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim()
  }, [])

  return { callGemini }
}