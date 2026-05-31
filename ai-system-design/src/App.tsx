import { useState, useCallback } from 'react'
import Sidebar from './components/layout/Sidebar'
import TopBar from './components/layout/TopBar'
import EmptyState from './components/explorer/EmptyState'
import LoadingState from './components/explorer/LoadingState'
import ArchitectureReport from './components/explorer/ArchitectureReport'
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

  const handleCopyReport = useCallback(() => {
    if (!report) return
    const md = buildMarkdown(report)
    navigator.clipboard.writeText(md).catch(() => {})
  }, [report])

  const renderMainContent = () => {
    if (activePage !== 'architecture') {
      return renderPlaceholder(activePage)
    }

    switch (appState) {
      case 'idle':
        return <EmptyState />
      case 'loading':
        return <LoadingState message={loadingMsg} product={lastQuery} />
      case 'error':
        return <ErrorBanner message={error || 'Unknown error'} onRetry={handleGenerate} />
      case 'success':
        return report
          ? <ArchitectureReport report={report} onCopy={handleCopyReport} />
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
      description: 'Generate level-specific interview questions, follow-ups, tradeoffs, and expected answers for any product or system.',
      phase: 'Coming in Phase 3',
    },
    revision: {
      icon: 'ti-book',
      title: 'Revision Mode',
      description: 'Get 5-minute, 15-minute, and 30-minute revision cheat sheets. Perfect for the morning before your interview.',
      phase: 'Coming in Phase 3',
    },
    compare: {
      icon: 'ti-arrows-diff',
      title: 'Compare Systems',
      description: 'Side-by-side comparisons — Kafka vs RabbitMQ, SQL vs NoSQL, Monolith vs Microservices, REST vs GraphQL.',
      phase: 'Coming in Phase 4',
    },
    custom: {
      icon: 'ti-pencil',
      title: 'Custom Design',
      description: 'Describe your system in plain English and get a complete architecture, services, database design, and interview questions.',
      phase: 'Coming in Phase 4',
    },
    history: {
      icon: 'ti-clock',
      title: 'History',
      description: 'Your last 20 generated reports are saved locally. Click any item in the sidebar to reload it instantly.',
      phase: 'Available now via sidebar',
    },
    saved: {
      icon: 'ti-bookmark',
      title: 'Saved Reports',
      description: 'Pin your most important architecture reports for quick access. Export them as Markdown or PDF.',
      phase: 'Coming in Phase 5',
    },
    settings: {
      icon: 'ti-settings',
      title: 'Settings',
      description: 'Configure your API key, default experience level for interview mode, theme, and export preferences.',
      phase: 'Coming in Phase 5',
    },
  }

  const config = pages[page]
  if (!config.title) return null

  return (
    <PlaceholderPage
      icon={config.icon}
      title={config.title}
      description={config.description}
      phase={config.phase}
    />
  )
}

function buildMarkdown(r: Report): string {
  return `# ${r.product} — System Design Report

## Overview
${r.overview}

## Functional Requirements
${r.functionalRequirements.map(req => `- ${req}`).join('\n')}

## Non-Functional Requirements
${r.nonFunctionalRequirements.map(req => `- ${req}`).join('\n')}

## Service Architecture
${r.services.map(s => `### ${s.name} (${s.type})
${s.responsibility}
**Stack:** ${s.techStack}`).join('\n\n')}

## Infrastructure
${r.infrastructure}
`
}
