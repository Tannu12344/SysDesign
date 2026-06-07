import type { TabId } from '../types/report'

export const TAB_LOADING_MESSAGES: Record<TabId, string[]> = {
  overview:  [],
  database:  ['Designing schema...', 'Choosing databases...', 'Planning sharding...'],
  caching:   ['Mapping hot data...', 'Configuring Redis...', 'Planning CDN layers...'],
  messaging: ['Designing Kafka topics...', 'Mapping event flows...', 'Planning consumer groups...'],
  api:       ['Designing REST endpoints...', 'Setting up auth...', 'Configuring rate limits...'],
  realtime:  ['Choosing protocols...', 'Designing WebSocket channels...', 'Planning pub/sub...'],
  scaling:   ['Modeling traffic growth...', 'Finding bottlenecks...', 'Planning multi-region...'],
  security:  ['Designing auth flows...', 'Planning encryption...', 'Reviewing DDoS protection...'],
  failures:  ['Mapping failure modes...', 'Designing circuit breakers...', 'Planning recovery...'],
  decisions: ['Reviewing architecture choices...', 'Evaluating tradeoffs...', 'Documenting decisions...'],
}

export function getTabPrompt(tab: TabId, product: string): string {
  const base = `You are a Principal Staff Engineer at a top-tier tech company.
Generate a detailed engineering breakdown for ${product}.
Return ONLY valid JSON — no markdown, no backticks, no preamble.`

  const prompts: Record<TabId, string> = {
    overview: '',

    database: `${base}

Schema:
{
  "product": "${product}",
  "stores": [
    {
      "name": "string — e.g. 'User Store'",
      "type": "string — e.g. 'PostgreSQL' | 'Cassandra' | 'DynamoDB' | 'MongoDB' | 'Redis'",
      "reason": "string — why this DB type for this data",
      "tables": [
        {
          "name": "string",
          "columns": [
            { "name": "string", "type": "string — SQL type e.g. UUID, VARCHAR(255), BIGINT", "note": "string — PK/FK/indexed/nullable" }
          ],
          "indexes": ["string — e.g. 'idx_users_email (email)'"],
          "partitioning": "string — partitioning/sharding strategy"
        }
      ],
      "readPattern": "string — how reads work, ratios",
      "writePattern": "string — how writes work, volume"
    }
  ],
  "storageDecisions": "string — overall storage philosophy 2-3 sentences",
  "whyHybrid": "string — why multiple databases are used together"
}

Rules:
- Include 3-5 stores covering different data domains
- Each store must have 1-3 tables with real columns
- Use real database technology names
- Be specific about partitioning strategies (e.g. hash by user_id, range by created_at)`,

    caching: `${base}

Schema:
{
  "product": "${product}",
  "layers": [
    {
      "name": "string — e.g. 'Session Cache', 'Feed Cache', 'Geo Cache'",
      "tool": "string — Redis | Memcached | CDN | In-memory | ElastiCache",
      "strategy": "string — Cache-aside | Write-through | Write-behind | Read-through",
      "ttl": "string — e.g. '15 minutes', '24 hours', 'no expiry'",
      "keyPattern": "string — e.g. 'user:{user_id}:profile'",
      "eviction": "string — LRU | LFU | TTL-based | No eviction",
      "rationale": "string — why this cache layer exists, what problem it solves"
    }
  ],
  "cdnStrategy": "string — CDN provider, what assets, edge caching rules",
  "invalidationApproach": "string — how cache is invalidated on data changes",
  "hotDataNotes": "string — what is hot data, how it is identified and served",
  "performanceImpact": "string — measurable impact: latency reduction, DB offload %"
}

Rules:
- Include 4-6 cache layers covering different data types
- Key patterns must be concrete and realistic
- Performance impact must have real numbers`,

    messaging: `${base}

Schema:
{
  "product": "${product}",
  "brokerChoice": "string — Kafka | RabbitMQ | SQS | Pub/Sub | etc.",
  "brokerRationale": "string — why this broker, what alternatives were rejected and why",
  "topics": [
    {
      "name": "string — e.g. 'user.signup', 'order.created', 'location.updated'",
      "producers": ["string — service names that produce to this topic"],
      "consumers": ["string — service names that consume from this topic"],
      "partitions": 8,
      "retentionHours": 72,
      "purpose": "string — what this event represents and why it exists"
    }
  ],
  "consumerGroups": ["string — consumer group names and their purpose"],
  "dlqStrategy": "string — dead letter queue design and retry logic",
  "retryStrategy": "string — retry policy: exponential backoff, max attempts, etc.",
  "eventFlowSummary": "string — 2-3 sentences describing the overall event flow"
}

Rules:
- Include 5-8 topics covering core business events
- Partition counts must be realistic (powers of 2 or sensible numbers)
- Consumer groups must map to real services`,

    api: `${base}

Schema:
{
  "product": "${product}",
  "apiStyle": "string — REST | GraphQL | gRPC | Hybrid",
  "authStrategy": "string — JWT | OAuth2 | API Keys | Session — explain the flow",
  "gatewayNotes": "string — API gateway choice (Kong, AWS API GW, Nginx), what it handles",
  "rateLimitingStrategy": "string — rate limit tiers, algorithms (token bucket, sliding window), limits per tier",
  "endpoints": [
    {
      "method": "string — GET | POST | PUT | DELETE | PATCH",
      "path": "string — e.g. '/api/v1/trips/:id'",
      "description": "string — what this endpoint does",
      "auth": "string — Required | Optional | Public | Admin only",
      "requestBody": "string — key fields in request, or 'none' for GET",
      "responseShape": "string — key fields in response",
      "rateLimit": "string — e.g. '100/min per user' or 'no limit'"
    }
  ]
}

Rules:
- Include 8-12 endpoints covering core product flows
- Paths must use real REST conventions with versioning
- Auth strategy must name real protocols (JWT with RS256, OAuth2 + PKCE, etc.)`,

    realtime: `${base}

Schema:
{
  "product": "${product}",
  "protocolChoice": "string — WebSocket | SSE | Long Polling | WebRTC | Hybrid",
  "protocolRationale": "string — why this protocol, what alternatives were rejected",
  "channels": [
    {
      "name": "string — e.g. 'trip.updates', 'chat.messages', 'driver.location'",
      "protocol": "string — WebSocket | SSE | WebRTC",
      "direction": "string — Client→Server | Server→Client | Bidirectional",
      "payload": "string — key fields in the message payload",
      "scalingNote": "string — how this channel scales (sticky sessions, pub/sub, etc.)"
    }
  ],
  "connectionManagement": "string — how connections are managed, heartbeats, reconnection",
  "pubSubDesign": "string — pub/sub infrastructure (Redis Pub/Sub, Kafka, etc.) for fan-out",
  "locationTracking": "string — if applicable, how real-time location is tracked and broadcast",
  "scalingApproach": "string — how real-time layer scales to millions of connections"
}

Rules:
- Include 3-6 channels relevant to this specific product
- locationTracking: if not relevant (e.g. Netflix), say 'Not applicable for this product'
- Scaling must mention real numbers (connections per server, fan-out ratios)`,

    scaling: `${base}

Schema:
{
  "product": "${product}",
  "trafficProjections": [
    { "scale": "string — e.g. '10K DAU'", "rps": "string — e.g. '100 RPS'", "strategy": "string — what architecture supports this scale" },
    { "scale": "string — e.g. '1M DAU'", "rps": "string — e.g. '10K RPS'", "strategy": "string" },
    { "scale": "string — e.g. '100M DAU'", "rps": "string — e.g. '1M RPS'", "strategy": "string" }
  ],
  "bottlenecks": [
    {
      "component": "string — e.g. 'User Service DB'",
      "threshold": "string — e.g. 'Degrades above 50K QPS'",
      "symptom": "string — what goes wrong",
      "mitigation": "string — how to fix it"
    }
  ],
  "horizontalScaling": "string — which services scale horizontally, how, and when",
  "loadBalancingStrategy": "string — L4 vs L7, algorithms, health checks, sticky sessions",
  "multiRegionPlan": "string — active-active vs active-passive, data replication, latency routing",
  "disasterRecovery": "string — RPO, RTO targets, backup strategy, failover mechanism",
  "autoScalingNotes": "string — auto-scaling triggers, cooldown periods, predictive vs reactive"
}

Rules:
- Traffic projections must have 3 tiers from small to hyperscale
- Include 4-6 specific bottlenecks with real thresholds
- Multi-region plan must name real cloud regions`,

    security: `${base}

Schema:
{
  "product": "${product}",
  "authNStrategy": "string — authentication mechanism in detail (JWT, OAuth2 flows, MFA)",
  "authZStrategy": "string — authorization model (RBAC, ABAC, ACL) with examples",
  "controls": [
    {
      "area": "string — e.g. 'Input Validation', 'SQL Injection', 'XSS', 'CSRF', 'Secrets Management'",
      "mechanism": "string — what tool or technique is used",
      "details": "string — specific implementation detail"
    }
  ],
  "encryptionAtRest": "string — what is encrypted, algorithm, key management (KMS, Vault)",
  "encryptionInTransit": "string — TLS version, certificate management, mTLS for internal services",
  "piiHandling": "string — what PII is stored, how it is protected, anonymization strategy",
  "rateLimitingDDoS": "string — rate limiting strategy, DDoS protection (Cloudflare, AWS Shield, etc.)",
  "complianceNotes": "string — GDPR, PCI-DSS, SOC2, HIPAA — which apply and how"
}

Rules:
- Include 6-8 security controls covering OWASP Top 10 relevant items
- Be specific about algorithms and tools (AES-256, TLS 1.3, AWS KMS, HashiCorp Vault)`,

    failures: `${base}

Schema:
{
  "product": "${product}",
  "scenarios": [
    {
      "name": "string — e.g. 'Primary DB Failure', 'Payment Service Timeout', 'CDN Outage'",
      "trigger": "string — what causes this failure",
      "impact": "string — what breaks, blast radius, affected users",
      "mitigation": "string — circuit breaker, fallback, graceful degradation strategy",
      "recoveryTime": "string — estimated MTTR e.g. '< 30 seconds auto-recovery'"
    }
  ],
  "circuitBreakerDesign": "string — which services have circuit breakers, thresholds, open/closed/half-open states",
  "bulkheadPattern": "string — how bulkhead isolation is applied (thread pools, connection pools, service isolation)",
  "chaosEngineeringNotes": "string — chaos testing approach (Chaos Monkey, GameDays, failure injection)",
  "runbook": "string — high-level incident response runbook: detect → alert → triage → resolve → postmortem"
}

Rules:
- Include 5-7 realistic failure scenarios specific to this product
- Each mitigation must reference a real pattern (circuit breaker, bulkhead, retry with backoff, etc.)
- Recovery times must be realistic`,

    decisions: `${base}

Schema:
{
  "product": "${product}",
  "decisions": [
    {
      "decision": "string — e.g. 'Microservices vs Monolith'",
      "chosen": "string — what was chosen",
      "alternatives": "string — what was considered but rejected",
      "rationale": "string — detailed engineering rationale for the choice",
      "tradeoff": "string — what was given up by making this choice"
    }
  ],
  "architecturePhilosophy": "string — 2-3 sentences on the overall guiding principles of this system's architecture",
  "whatTheyWouldDodifferently": "string — honest engineering retrospective: what would change with hindsight",
  "keyTakeaways": ["string — 5-7 bullet points: the most important engineering lessons from this system"]
}

Rules:
- Include 6-8 decisions covering: architecture style, database choice, messaging, deployment, auth, caching, API design
- Decisions must be specific to this product (not generic)
- Tradeoffs must be honest and nuanced`
  }

  return prompts[tab] || ''
}
