import type { ExperienceLevel, RevisionDuration } from '../types/report'

export const INTERVIEW_LOADING_MESSAGES = [
  'Reviewing the architecture...',
  'Drafting interview questions...',
  'Calibrating difficulty level...',
  'Building answer frameworks...',
  'Adding tradeoff questions...',
]

export const REVISION_LOADING_MESSAGES = [
  'Condensing the architecture...',
  'Extracting key decisions...',
  'Building your cheat sheet...',
  'Prioritizing what matters most...',
]

const LEVEL_FOCUS: Record<ExperienceLevel, string> = {
  Junior: 'Focus on requirements gathering, basic architecture understanding, and 3-4 core services. Questions should test fundamentals, not deep tradeoffs.',
  Mid: 'Focus on database design, caching strategy, and API design. Questions should test practical engineering judgment.',
  Senior: 'Focus on scaling, tradeoffs, and failure scenarios. Questions should test system-level thinking and the ability to defend design choices.',
  Staff: 'Focus on engineering decisions, cross-system tradeoffs, "why not X" questions, and organizational/architectural philosophy. Questions should test depth of judgment across the entire system.',
}

export function getInterviewPrompt(product: string, level: ExperienceLevel): string {
  return `You are a Principal Engineer conducting a system design interview for a ${level}-level Software Engineer role.

The candidate is being asked to design: ${product}

${LEVEL_FOCUS[level]}

Return ONLY valid JSON — no markdown, no backticks, no preamble.

Schema:
{
  "product": "${product}",
  "level": "${level}",
  "focusAreas": ["string — 4-6 topic areas this interview will probe, tailored to ${level} level"],
  "questions": [
    {
      "question": "string — the interview question, phrased naturally as an interviewer would ask it",
      "difficulty": "Easy | Medium | Hard",
      "category": "string — e.g. 'Requirements', 'Database', 'Scaling', 'API Design', 'Caching', 'Tradeoffs'",
      "followUps": ["string — 2-3 natural follow-up questions an interviewer would ask based on the candidate's answer"],
      "answerFramework": ["string — 3-5 bullet points outlining what a strong answer should cover"]
    }
  ],
  "tradeoffQuestions": [
    { "question": "string — e.g. 'Why Kafka over RabbitMQ here?'", "framework": "string — 2-3 sentence framework for answering this tradeoff question well" }
  ],
  "commonMistakes": ["string — 5-6 mistakes candidates commonly make when designing this system"],
  "behavioralPoints": ["string — 3-4 behavioral/communication discussion points relevant to system design interviews (e.g. how to structure the 45-minute interview, when to ask clarifying questions)"]
}

Rules:
- Include exactly 10 questions in the questions array
- Questions must be ordered roughly by increasing difficulty
- tradeoffQuestions must have 4-5 entries specific to ${product}
- Everything must be calibrated to ${level} level — do not give Staff-level depth to a Junior interview or vice versa`
}

export function getRevisionPrompt(product: string, duration: RevisionDuration): string {
  const durationContext: Record<RevisionDuration, string> = {
    '5': 'This is a 5-minute interview-day cheat sheet. Be extremely concise — single lines, no fluff. The reader has 5 minutes before walking into the interview.',
    '15': 'This is a 15-minute morning-of-interview revision. Slightly more detail than the 5-minute version, but still scannable in 15 minutes.',
    '30': 'This is a 30-minute day-before-interview revision. Comprehensive but well-organized — the reader has time to actually read and absorb everything.',
  }

  return `You are a Principal Engineer creating a revision cheat sheet for a system design interview.

System: ${product}
${durationContext[duration]}

Return ONLY valid JSON — no markdown, no backticks, no preamble.

Schema:
{
  "product": "${product}",
  "duration": "${duration}",
  "oneLiner": "string — what this system is, in one sentence",
  "coreDecisions": ["string — 3-5 of the most important architectural decisions, each one sentence"],
  "keyServices": [
    { "name": "string", "note": "string — one line on what it does" }
  ],
  "databaseChoice": { "choice": "string — e.g. 'PostgreSQL + Cassandra'", "reason": "string — one sentence why" },
  "cachingChoice": { "choice": "string — e.g. 'Redis'", "reason": "string — one sentence why" },
  "messagingChoice": { "choice": "string — e.g. 'Kafka'", "reason": "string — one sentence why" },
  "scalingStrategies": ["string — 3-5 one-line scaling strategies"],
  "apiHighlights": ["string — 3-4 one-line API design highlights"],
  "likelyQuestions": [
    { "question": "string", "answer": "string — short answer, 1-2 sentences" }
  ],
  "finalTakeaways": ["string — 3-5 final one-line engineering takeaways to remember"]
}

Rules:
- For duration "5": keyServices has 5 entries, likelyQuestions has 3 entries, everything is ultra-concise (under 15 words per line where possible)
- For duration "15": keyServices has 7 entries, likelyQuestions has 6 entries, moderate detail
- For duration "30": keyServices has 9 entries, likelyQuestions has 10 entries, fuller detail with brief explanations
- Every field must be specific to ${product}, not generic`
}
