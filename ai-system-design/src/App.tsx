import { useState, useCallback } from 'react'
import Sidebar from './components/layout/Sidebar'
import TopBar from './components/layout/TopBar'
import EmptyState from './components/explorer/EmptyState'
import LoadingState from './components/explorer/LoadingState'
import DeepExplorer from './components/tabs/DeepExplorer'
import ErrorBanner from './components/ui/ErrorBanner'
import PlaceholderPage from './components/ui/PlaceholderPage'
import { useClaudeAPI } from './hooks/useClaudeAPI'
import { useHistory } from './hooks/useHistory'
import { ARCHITECTURE_SYSTEM_PROMPT, LOADING_MESSAGES } from './prompts/architecturePrompt'
import type { ArchitectureReport as Report, NavPage, HistoryEntry } from './types/report'
import styles from './App.module.css'

type AppState = 'idle' | 'loading' | 'success' | 'error'

export default function App() {
  const [activePage, setActivePage] = useState<NavPage>('architecture')
  const [query, setQuery] = useState('')
  const [appState, setAppState] = useState<AppState>('idle')
  const [report, setReport] = useState<Report | null>(null)
  const [lastQuery, setLastQuery] = useState('')

  const { history, addEntry } = useHistory()
  const { generate, loading, error, loadingMsg } = useClaudeAPI<Report>({
    systemPrompt: ARCHITECTURE_SYSTEM_PROMPT,
    loadingMessages: LOADING_MESSAGES,
  })

  const handleGenerate = useCallback(async () => {
    const q = query.trim()
    if (!q || loading) return
    setLastQuery(q)
    setAppState('loading')
    const result = await generate(`Generate system design report for: ${q}`)
    if (result) {
      setReport(result)
      setAppState('success')
      addEntry({ product: result.product, report: result, timestamp: Date.now() })
    } else {
      setAppState('error')
    }
  }, [query, loading, generate, addEntry])

  const handleLoadHistory = useCallback((entry: HistoryEntry) => {
    setQuery(entry.product)
    setReport(entry.report)
    setAppState('success')
    setActivePage('architecture')
  }, [])

  const handleCopyOverview = useCallback(() => {
    if (!report) return
    navigator.clipboard.writeText(buildMarkdown(report)).catch(() => {})
  }, [report])

  const renderMainContent = () => {
    if (activePage !== 'architecture') return renderPlaceholder(activePage)

    switch (appState) {
      case 'idle':
        return <EmptyState />
      case 'loading':
        return <LoadingState message={loadingMsg} product={lastQuery} />
      case 'error':
        return <ErrorBanner message={error || 'Unknown error'} onRetry={handleGenerate} />
      case 'success':
        return report
          ? <DeepExplorer report={report} onCopy={handleCopyOverview} />
          : <EmptyState />
    }
  }

  return (
    <div className={styles.app}>
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        history={history}
        onLoadHistory={handleLoadHistory}
      />
      <div className={styles.main}>
        {activePage === 'architecture' && (
          <TopBar
            query={query}
            loading={loading}
            onQueryChange={setQuery}
            onGenerate={handleGenerate}
          />
        )}
        <div className={styles.content}>
          {renderMainContent()}
        </div>
      </div>
    </div>
  )
}

function renderPlaceholder(page: NavPage) {
  const pages: Record<NavPage, { icon: string; title: string; description: string; phase: string }> = {
    architecture: { icon: '', title: '', description: '', phase: '' },
    interview: {
      icon: 'ti-help-circle',
      title: 'Interview Mode',
      description: 'Generate level-specific interview questions, follow-ups, tradeoffs, and expected answers for any product.',
      phase: 'Coming in Phase 3',
    },
    revision: {
      icon: 'ti-book',
      title: 'Revision Mode',
      description: 'Get 5-minute, 15-minute, and 30-minute revision cheat sheets for your interview.',
      phase: 'Coming in Phase 3',
    },
    compare: {
      icon: 'ti-arrows-diff',
      title: 'Compare Systems',
      description: 'Side-by-side: Kafka vs RabbitMQ, SQL vs NoSQL, Monolith vs Microservices, REST vs GraphQL.',
      phase: 'Coming in Phase 4',
    },
    custom: {
      icon: 'ti-pencil',
      title: 'Custom Design',
      description: 'Describe your system in plain English and get a full architecture with all 10 deep-dive tabs.',
      phase: 'Coming in Phase 4',
    },
    history: {
      icon: 'ti-clock',
      title: 'History',
      description: 'Your last 20 generated reports are saved locally. Click any item in the sidebar to reload.',
      phase: 'Available via sidebar',
    },
    saved: {
      icon: 'ti-bookmark',
      title: 'Saved Reports',
      description: 'Pin important architecture reports and export them as Markdown.',
      phase: 'Coming in Phase 5',
    },
    settings: {
      icon: 'ti-settings',
      title: 'Settings',
      description: 'Configure your API key, default level for interview mode, theme, and export preferences.',
      phase: 'Coming in Phase 5',
    },
  }
  const config = pages[page]
  if (!config.title) return null
  return <PlaceholderPage icon={config.icon} title={config.title} description={config.description} phase={config.phase} />
}

function buildMarkdown(r: Report): string {
  return `# ${r.product} — System Design Report\n\n## Overview\n${r.overview}\n\n## Functional Requirements\n${r.functionalRequirements.map(req => `- ${req}`).join('\n')}\n\n## Non-Functional Requirements\n${r.nonFunctionalRequirements.map(req => `- ${req}`).join('\n')}\n\n## Services\n${r.services.map(s => `### ${s.name} (${s.type})\n${s.responsibility}\n**Stack:** ${s.techStack}`).join('\n\n')}\n\n## Infrastructure\n${r.infrastructure}\n`
}
