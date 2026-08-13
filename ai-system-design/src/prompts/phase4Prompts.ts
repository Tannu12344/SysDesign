export const COMPARE_LOADING_MESSAGES = [
  'Analyzing both sides...',
  'Building decision matrix...',
  'Mapping tradeoffs...',
  'Writing interview angles...',
]

export const CUSTOM_LOADING_MESSAGES = [
  'Deriving requirements...',
  'Designing services...',
  'Planning data architecture...',
  'Estimating scale...',
  'Writing tradeoffs...',
]

export function getComparePrompt(itemA: string, itemB: string): string {
  return `You are a Principal Staff Engineer at a top-tier tech company.
Compare ${itemA} vs ${itemB} from a system design and engineering perspective.
Return ONLY valid JSON — no markdown, no backticks, no preamble.

Schema:
{
  "itemA": "${itemA}",
  "itemB": "${itemB}",
  "category": "string — e.g. 'Messaging', 'Database', 'Architecture', 'Systems'",
  "summary": "string — 2-3 sentence executive summary of the core difference between these two",
  "items": [
    {
      "name": "${itemA}",
      "advantages": ["string — 4-6 specific advantages"],
      "disadvantages": ["string — 3-5 specific disadvantages"],
      "useCases": ["string — 4-5 real-world use cases where this is the right choice"],
      "performance": "string — performance characteristics in 1-2 sentences with real numbers where possible",
      "cost": "string — cost profile: infrastructure cost, operational overhead, licensing",
      "complexity": "string — operational and development complexity"
    },
    {
      "name": "${itemB}",
      "advantages": ["string — 4-6 specific advantages"],
      "disadvantages": ["string — 3-5 specific disadvantages"],
      "useCases": ["string — 4-5 real-world use cases where this is the right choice"],
      "performance": "string — performance characteristics in 1-2 sentences with real numbers where possible",
      "cost": "string — cost profile: infrastructure cost, operational overhead, licensing",
      "complexity": "string — operational and development complexity"
    }
  ],
  "decisionMatrix": [
    {
      "criterion": "string — e.g. 'Throughput', 'Latency', 'Scalability', 'Ease of use', 'Cost', 'Ecosystem'",
      "itemA": "string — how ${itemA} performs on this criterion",
      "itemB": "string — how ${itemB} performs on this criterion",
      "winner": "string — '${itemA}' | '${itemB}' | 'Tie'"
    }
  ],
  "whenToUseA": ["string — 4-5 specific scenarios where ${itemA} is the clear winner"],
  "whenToUseB": ["string — 4-5 specific scenarios where ${itemB} is the clear winner"],
  "interviewQuestions": [
    {
      "question": "string — interview question about this comparison",
      "hint": "string — key points a strong answer should cover"
    }
  ],
  "verdict": "string — 2-3 sentence honest verdict: is one objectively better, or is it purely context-dependent? What's the default choice and when do you deviate?"
}

Rules:
- decisionMatrix must have exactly 7-8 rows covering distinct criteria
- interviewQuestions must have exactly 5 questions
- Be opinionated in the verdict — engineers appreciate directness
- Use real company names as examples where relevant (e.g. 'Netflix uses Kafka because...')
- Numbers must be real: throughput figures, latency numbers, not vague comparisons`
}

export function getCustomDesignPrompt(description: string): string {
  return `You are a Principal Staff Engineer at a top-tier tech company.
A user wants to design the following system: "${description}"

Generate a complete system design for this. Infer reasonable requirements and scale if not specified.
Return ONLY valid JSON — no markdown, no backticks, no preamble.

Schema:
{
  "systemName": "string — clean product name derived from the description",
  "oneLiner": "string — one sentence describing what this system does",
  "functionalRequirements": ["string — 6 specific functional requirements starting with a verb"],
  "nonFunctionalRequirements": ["string — 5 non-functional requirements with numbers (e.g. '99.9% uptime', '< 200ms p99')"],
  "services": [
    {
      "name": "string — service name",
      "responsibility": "string — 1-2 sentence description",
      "techStack": "string — primary technologies",
      "type": "string — Core | Platform | Data | Real-Time | Gateway"
    }
  ],
  "databaseDesign": "string — 3-4 sentences: which databases, what data they store, why chosen, sharding/partitioning approach",
  "cachingStrategy": "string — 2-3 sentences: what is cached, which tool (Redis etc.), TTL strategy, cache invalidation",
  "messagingStrategy": "string — 2-3 sentences: event-driven components, broker choice (Kafka/SQS), key topics/events",
  "apiDesign": "string — 2-3 sentences: REST vs GraphQL, auth strategy, rate limiting, API gateway",
  "scalingStrategy": "string — 3-4 sentences: how the system scales from 1K to 10M users, horizontal vs vertical, bottlenecks",
  "securityConsiderations": "string — 2-3 sentences: auth/authz, encryption, key security concerns for this specific system",
  "estimate": {
    "users": "string — e.g. '1M DAU assumed'",
    "requestsPerDay": "string — e.g. '50M requests/day'",
    "storageGB": "string — e.g. '500 GB/month growth'",
    "bandwidthGB": "string — e.g. '10 TB/month'",
    "serversEstimate": "string — e.g. '20-30 app servers at 1M DAU'",
    "costEstimate": "string — e.g. '$2,000-5,000/month on AWS at this scale'"
  },
  "tradeoffs": [
    {
      "decision": "string — the architectural decision made",
      "rationale": "string — why this decision, what was given up"
    }
  ],
  "interviewAngles": ["string — 5-6 angles an interviewer would probe for this specific system"],
  "infrastructure": "string — 2-3 sentences: cloud provider, containerization, CI/CD, deployment regions"
}

Rules:
- services must have 7-10 entries
- tradeoffs must have 5-6 entries covering the most important decisions
- estimate numbers must be realistic and calculated (not made up)
- interviewAngles must be specific to this system, not generic
- If the description is vague (e.g. 'Design a chat app'), assume reasonable scale: 5M users, messaging-first, mobile-heavy`
}
