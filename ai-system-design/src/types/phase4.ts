// ─── Phase 4: Compare Mode ────────────────────────────────────────────────────

export interface CompareItem {
  name: string
  advantages: string[]
  disadvantages: string[]
  useCases: string[]
  performance: string
  cost: string
  complexity: string
}

export interface DecisionMatrixRow {
  criterion: string
  itemA: string
  itemB: string
  winner: string
}

export interface CompareReport {
  itemA: string
  itemB: string
  category: string
  summary: string
  items: [CompareItem, CompareItem]
  decisionMatrix: DecisionMatrixRow[]
  whenToUseA: string[]
  whenToUseB: string[]
  interviewQuestions: { question: string; hint: string }[]
  verdict: string
}

// ─── Phase 4: Custom Design Mode ─────────────────────────────────────────────

export interface CustomService {
  name: string
  responsibility: string
  techStack: string
  type: string
}

export interface CustomEstimate {
  users: string
  requestsPerDay: string
  storageGB: string
  bandwidthGB: string
  serversEstimate: string
  costEstimate: string
}

export interface CustomReport {
  systemName: string
  oneLiner: string
  functionalRequirements: string[]
  nonFunctionalRequirements: string[]
  services: CustomService[]
  databaseDesign: string
  cachingStrategy: string
  messagingStrategy: string
  apiDesign: string
  scalingStrategy: string
  securityConsiderations: string
  estimate: CustomEstimate
  tradeoffs: { decision: string; rationale: string }[]
  interviewAngles: string[]
  infrastructure: string
}

// ─── Pre-built comparison pairs ───────────────────────────────────────────────

export interface ComparePair {
  label: string
  a: string
  b: string
  category: string
}

export const COMPARE_PAIRS: ComparePair[] = [
  { label: 'Uber vs Ola',               a: 'Uber',              b: 'Ola',                    category: 'Systems' },
  { label: 'Netflix vs YouTube',         a: 'Netflix',           b: 'YouTube',                category: 'Systems' },
  { label: 'WhatsApp vs Telegram',       a: 'WhatsApp',          b: 'Telegram',               category: 'Systems' },
  { label: 'Swiggy vs Zomato',           a: 'Swiggy',            b: 'Zomato',                 category: 'Systems' },
  { label: 'Kafka vs RabbitMQ',          a: 'Kafka',             b: 'RabbitMQ',               category: 'Messaging' },
  { label: 'Kafka vs SQS',              a: 'Kafka',             b: 'AWS SQS',                category: 'Messaging' },
  { label: 'Redis vs Memcached',         a: 'Redis',             b: 'Memcached',              category: 'Caching' },
  { label: 'REST vs GraphQL',            a: 'REST API',          b: 'GraphQL',                category: 'API' },
  { label: 'REST vs gRPC',              a: 'REST API',          b: 'gRPC',                   category: 'API' },
  { label: 'SQL vs NoSQL',              a: 'SQL (PostgreSQL)',  b: 'NoSQL (MongoDB)',         category: 'Database' },
  { label: 'PostgreSQL vs Cassandra',    a: 'PostgreSQL',        b: 'Cassandra',              category: 'Database' },
  { label: 'MongoDB vs DynamoDB',        a: 'MongoDB',           b: 'DynamoDB',               category: 'Database' },
  { label: 'Monolith vs Microservices',  a: 'Monolith',          b: 'Microservices',          category: 'Architecture' },
  { label: 'Microservices vs Serverless',a: 'Microservices',     b: 'Serverless',             category: 'Architecture' },
  { label: 'WebSocket vs SSE',           a: 'WebSocket',         b: 'Server-Sent Events',     category: 'Real-Time' },
  { label: 'CDN vs No CDN',             a: 'CDN',               b: 'No CDN (Origin only)',   category: 'Infrastructure' },
]

export const CUSTOM_EXAMPLES = [
  'Design a food delivery app like Zomato',
  'Design a real-time chat app like WhatsApp',
  'Design a video streaming platform like YouTube',
  'Design a URL shortener like Bitly',
  'Design a ride-sharing app like Uber',
  'Design a payment gateway like Razorpay',
  'Design a ticket booking system like BookMyShow',
  'Design a social media feed like Instagram',
  'Design an e-commerce platform like Amazon',
  'Design a collaborative doc editor like Google Docs',
]
