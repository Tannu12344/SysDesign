// ─── Phase 5: Saved Reports ───────────────────────────────────────────────────

export type ReportMode = 'architecture' | 'interview' | 'revision' | 'compare' | 'custom'

export interface SavedReport {
  id: string
  title: string
  subtitle: string
  mode: ReportMode
  data: unknown
  savedAt: number
  tags: string[]
}

// ─── Phase 5: Settings ───────────────────────────────────────────────────────

export interface AppSettings {
  apiKey: string
  defaultLevel: 'Junior' | 'Mid' | 'Senior' | 'Staff'
  defaultRevisionDuration: '5' | '15' | '30'
  showEstimationsInCustom: boolean
}

export const DEFAULT_SETTINGS: AppSettings = {
  apiKey: '',
  defaultLevel: 'Mid',
  defaultRevisionDuration: '15',
  showEstimationsInCustom: true,
}
