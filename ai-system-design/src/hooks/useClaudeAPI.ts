import { useState, useCallback } from "react";

interface UseClaudeAPIOptions {
  systemPrompt: string;
  loadingMessages?: string[];
}

export function useClaudeAPI<T>({
  systemPrompt,
  loadingMessages = [],
}: UseClaudeAPIOptions) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMsg, setLoadingMsg] = useState("");

  const generate = useCallback(
    async (userMessage: string): Promise<T | null> => {
      setLoading(true);
      setError(null);

      let msgIdx = 0;
      let interval: ReturnType<typeof setInterval> | null = null;

      if (loadingMessages.length > 0) {
        setLoadingMsg(loadingMessages[0]);

        interval = setInterval(() => {
          msgIdx = (msgIdx + 1) % loadingMessages.length;
          setLoadingMsg(loadingMessages[msgIdx]);
        }, 2000);
      }

      try {
        const apiKey = import.meta.env.VITE_GROQ_API_KEY;

        if (!apiKey) {
          throw new Error(
            "VITE_GROQ_API_KEY is not set in .env.local"
          );
        }

        const resp = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: 'openai/gpt-oss-120b',
              messages: [
                {
                  role: "system",
                  content: systemPrompt,
                },
                {
                  role: "user",
                  content: userMessage,
                },
              ],
              temperature: 0.7,
              response_format: {
                type: "json_object",
              },
            }),
          }
        );

        if (!resp.ok) {
          const errData = await resp.json().catch(() => ({}));

          const msg =
            errData?.error?.message ||
            `Groq API error ${resp.status}`;

          throw new Error(msg);
        }

        const data = await resp.json();

        const raw =
          data?.choices?.[0]?.message?.content ?? "";

        if (!raw) {
          throw new Error("Empty response from Groq");
        }
        console.log('RAW GROQ RESPONSE:', raw)
        const clean = raw
          .replace(/```json\s*/g, "")
          .replace(/```\s*/g, "")
          .trim();

        const parsed = JSON.parse(clean) as T;

        return parsed;
      } catch (err) {
        const msg =
          err instanceof Error
            ? err.message
            : "Unknown error";

        setError(msg);

        return null;
      } finally {
        if (interval) {
          clearInterval(interval);
        }

        setLoading(false);
      }
    },
    [systemPrompt, loadingMessages]
  );

  return {
    generate,
    loading,
    error,
    loadingMsg,
  };
}