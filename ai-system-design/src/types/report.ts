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
