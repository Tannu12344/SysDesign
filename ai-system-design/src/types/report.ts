// ─── Phase 1 ─────────────────────────────────────────────────────────────────

export interface Service {
  name: string
  responsibility: string
  techStack: string
  type: string
}

export interface ArchitectureReport {
  product: string
  tagline: string
  overview: string
  functionalRequirements: string[]
  nonFunctionalRequirements: string[]
  services: Service[]
  infrastructure: string
}

export type NavPage =
  | 'architecture'
  | 'interview'
  | 'revision'
  | 'compare'
  | 'custom'
  | 'history'
  | 'saved'
  | 'settings'

export interface HistoryEntry {
  product: string
  report: ArchitectureReport
  timestamp: number
}

// ─── Phase 2 Tab Types ────────────────────────────────────────────────────────

export type TabId =
  | 'overview'
  | 'database'
  | 'caching'
  | 'messaging'
  | 'api'
  | 'realtime'
  | 'scaling'
  | 'security'
  | 'failures'
  | 'decisions'

// Tab: Database
export interface DbTable {
  name: string
  columns: { name: string; type: string; note: string }[]
  indexes: string[]
  partitioning: string
}
export interface DbStore {
  name: string
  type: string
  reason: string
  tables: DbTable[]
  readPattern: string
  writePattern: string
}
export interface DatabaseReport {
  product: string
  stores: DbStore[]
  storageDecisions: string
  whyHybrid: string
}

// Tab: Caching
export interface CacheLayer {
  name: string
  tool: string
  strategy: string
  ttl: string
  keyPattern: string
  eviction: string
  rationale: string
}
export interface CachingReport {
  product: string
  layers: CacheLayer[]
  cdnStrategy: string
  invalidationApproach: string
  hotDataNotes: string
  performanceImpact: string
}

// Tab: Messaging
export interface KafkaTopic {
  name: string
  producers: string[]
  consumers: string[]
  partitions: number
  retentionHours: number
  purpose: string
}
export interface MessagingReport {
  product: string
  brokerChoice: string
  brokerRationale: string
  topics: KafkaTopic[]
  consumerGroups: string[]
  dlqStrategy: string
  retryStrategy: string
  eventFlowSummary: string
}

// Tab: API
export interface ApiEndpoint {
  method: string
  path: string
  description: string
  auth: string
  requestBody: string
  responseShape: string
  rateLimit: string
}
export interface ApiReport {
  product: string
  apiStyle: string
  authStrategy: string
  gatewayNotes: string
  rateLimitingStrategy: string
  endpoints: ApiEndpoint[]
}

// Tab: Real-Time
export interface RealtimeChannel {
  name: string
  protocol: string
  direction: string
  payload: string
  scalingNote: string
}
export interface RealtimeReport {
  product: string
  protocolChoice: string
  protocolRationale: string
  channels: RealtimeChannel[]
  connectionManagement: string
  pubSubDesign: string
  locationTracking: string
  scalingApproach: string
}

// Tab: Scaling
export interface BottleneckItem {
  component: string
  threshold: string
  symptom: string
  mitigation: string
}
export interface ScalingReport {
  product: string
  trafficProjections: { scale: string; rps: string; strategy: string }[]
  bottlenecks: BottleneckItem[]
  horizontalScaling: string
  loadBalancingStrategy: string
  multiRegionPlan: string
  disasterRecovery: string
  autoScalingNotes: string
}

// Tab: Security
export interface SecurityControl {
  area: string
  mechanism: string
  details: string
}
export interface SecurityReport {
  product: string
  authNStrategy: string
  authZStrategy: string
  controls: SecurityControl[]
  encryptionAtRest: string
  encryptionInTransit: string
  piiHandling: string
  rateLimitingDDoS: string
  complianceNotes: string
}

// Tab: Failures
export interface FailureScenario {
  name: string
  trigger: string
  impact: string
  mitigation: string
  recoveryTime: string
}
export interface FailuresReport {
  product: string
  scenarios: FailureScenario[]
  circuitBreakerDesign: string
  bulkheadPattern: string
  chaosEngineeringNotes: string
  runbook: string
}

// Tab: Engineering Decisions
export interface EngineeringDecision {
  decision: string
  chosen: string
  alternatives: string
  rationale: string
  tradeoff: string
}
export interface DecisionsReport {
  product: string
  decisions: EngineeringDecision[]
  architecturePhilosophy: string
  whatTheyWouldDodifferently: string
  keyTakeaways: string[]
}

// Union of all tab data
export type TabData =
  | DatabaseReport
  | CachingReport
  | MessagingReport
  | ApiReport
  | RealtimeReport
  | ScalingReport
  | SecurityReport
  | FailuresReport
  | DecisionsReport

export type TabCache = Partial<Record<TabId, TabData>>
