import { useState, useCallback } from 'react'

// ─── Layout ──────────────────────────────────────────────────────────────────
import Sidebar from './components/layout/Sidebar'
import MobileHeader from './components/layout/MobileHeader'
import TopBar from './components/layout/TopBar'

// ─── Pages ───────────────────────────────────────────────────────────────────
import EmptyState from './components/explorer/EmptyState'
import LoadingState from './components/explorer/LoadingState'
import ErrorBanner from './components/ui/ErrorBanner'
import DeepExplorer from './components/tabs/DeepExplorer'
import InterviewMode from './components/interview/InterviewMode'
import RevisionMode from './components/revision/RevisionMode'
import CompareMode from './components/compare/CompareMode'
import CustomMode from './components/custom/CustomMode'
import HistoryPage from './components/history/HistoryPage'
import SavedPage from './components/saved/SavedPage'
import SettingsPage from './components/settings/SettingsPage'

// ─── Hooks ───────────────────────────────────────────────────────────────────
import { useClaudeAPI } from './hooks/useClaudeAPI'
import { useHistory } from './hooks/useHistory'
import { useSavedReports } from './hooks/useSavedReports'
import { useSettings } from './hooks/useSettings'

// ─── Prompts / Types ─────────────────────────────────────────────────────────
import {
  ARCHITECTURE_SYSTEM_PROMPT,
  LOADING_MESSAGES,
} from './prompts/architecturePrompt'

import type {
  ArchitectureReport as Report,
  NavPage,
  HistoryEntry,
} from './types/report'

// ─── Utilities ──────────────────────────────────────────────────────────────
import {
  architectureToMarkdown,
  copyToClipboard,
} from './utils/exportUtils'

// ─── Styles ─────────────────────────────────────────────────────────────────
import styles from './App.module.css'

type AppState = 'idle' | 'loading' | 'success' | 'error'

export default function App() {
  // ─── Application State ────────────────────────────────────────────────────

  const [activePage, setActivePage] =
    useState<NavPage>('architecture')

  const [query, setQuery] =
    useState('')

  const [appState, setAppState] =
    useState<AppState>('idle')

  const [report, setReport] =
    useState<Report | null>(null)

  const [lastQuery, setLastQuery] =
    useState('')

  // ─── Sidebar State ────────────────────────────────────────────────────────

  // Desktop:
  // false = expanded
  // true  = collapsed
  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false)

  // Mobile:
  // false = closed
  // true  = open
  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false)

  // ─── Hooks ────────────────────────────────────────────────────────────────

  const {
    history,
    addEntry,
    clearAll: clearHistory,
  } = useHistory()

  const {
    saved,
    saveReport,
    removeReport,
    clearAll: clearSaved,
    isSaved,
  } = useSavedReports()

  const {
    settings,
    updateSettings,
    resetSettings,
  } = useSettings()

  const {
    generate,
    loading,
    error,
    loadingMsg,
  } = useClaudeAPI<Report>({
    systemPrompt: ARCHITECTURE_SYSTEM_PROMPT,
    loadingMessages: LOADING_MESSAGES,
  })

  // ─── Sidebar Handlers ─────────────────────────────────────────────────────

  const handleToggleSidebar = useCallback(() => {
    setSidebarCollapsed(prev => !prev)
  }, [])

  const handleOpenMobileSidebar = useCallback(() => {
    setMobileSidebarOpen(true)
  }, [])

  const handleCloseMobileSidebar = useCallback(() => {
    setMobileSidebarOpen(false)
  }, [])

  // ─── Navigation ──────────────────────────────────────────────────────────

  const handleNavigate = useCallback((page: NavPage) => {
    setActivePage(page)

    // Always close mobile drawer after navigation.
    setMobileSidebarOpen(false)
  }, [])

  // ─── Generate Architecture ───────────────────────────────────────────────

  const handleGenerate = useCallback(async () => {
    const q = query.trim()

    if (!q || loading) return

    setLastQuery(q)
    setAppState('loading')

    const result = await generate(
      `Generate system design report for: ${q}`
    )

    if (result) {
      setReport(result)
      setAppState('success')

      addEntry({
        product: result.product,
        report: result,
        timestamp: Date.now(),
      })
    } else {
      setAppState('error')
    }
  }, [
    query,
    loading,
    generate,
    addEntry,
  ])

  // ─── History ──────────────────────────────────────────────────────────────

  const handleLoadHistory = useCallback(
    (entry: HistoryEntry) => {
      setQuery(entry.product)
      setReport(entry.report)
      setAppState('success')
      setActivePage('architecture')

      // Close mobile navigation.
      setMobileSidebarOpen(false)
    },
    []
  )

  // ─── Copy ─────────────────────────────────────────────────────────────────

  const handleCopyOverview = useCallback(() => {
    if (!report) return

    copyToClipboard(
      architectureToMarkdown(report)
    ).catch(() => {})
  }, [report])

  // ─── Save ─────────────────────────────────────────────────────────────────

  const handleSaveCurrentReport = useCallback(() => {
    if (!report) return

    if (isSaved(report.product, 'architecture')) {
      return
    }

    saveReport(
      report.product,
      report.tagline,
      'architecture',
      report
    )
  }, [
    report,
    saveReport,
    isSaved,
  ])

  // ─── Render Content ──────────────────────────────────────────────────────

  const renderContent = () => {
    switch (activePage) {
      // ─────────────────────────────────────────────────────────
      // INTERVIEW
      // ─────────────────────────────────────────────────────────

      case 'interview':
        return <InterviewMode />

      // ─────────────────────────────────────────────────────────
      // REVISION
      // ─────────────────────────────────────────────────────────

      case 'revision':
        return <RevisionMode />

      // ─────────────────────────────────────────────────────────
      // COMPARE
      // ─────────────────────────────────────────────────────────

      case 'compare':
        return <CompareMode />

      // ─────────────────────────────────────────────────────────
      // CUSTOM
      // ─────────────────────────────────────────────────────────

      case 'custom':
        return <CustomMode />

      // ─────────────────────────────────────────────────────────
      // HISTORY
      // ─────────────────────────────────────────────────────────

      case 'history':
        return (
          <HistoryPage
            history={history}
            onLoad={handleLoadHistory}
            onClear={clearHistory}
          />
        )

      // ─────────────────────────────────────────────────────────
      // SAVED
      // ─────────────────────────────────────────────────────────

      case 'saved':
        return (
          <SavedPage
            saved={saved}
            onRemove={removeReport}
            onClearAll={clearSaved}
          />
        )

      // ─────────────────────────────────────────────────────────
      // SETTINGS
      // ─────────────────────────────────────────────────────────

      case 'settings':
        return (
          <SettingsPage
            settings={settings}
            onUpdate={updateSettings}
            onReset={resetSettings}
            onClearHistory={clearHistory}
            onClearSaved={clearSaved}
          />
        )

      // ─────────────────────────────────────────────────────────
      // ARCHITECTURE
      // ─────────────────────────────────────────────────────────

      case 'architecture':
      default:
        switch (appState) {
          case 'idle':
            return <EmptyState />

          case 'loading':
            return (
              <LoadingState
                message={loadingMsg}
                product={lastQuery}
              />
            )

          case 'error':
            return (
              <ErrorBanner
                message={
                  error || 'Unknown error'
                }
                onRetry={handleGenerate}
              />
            )

          case 'success':
            return report ? (
              <DeepExplorer
                report={report}
                onCopy={handleCopyOverview}
                onSave={handleSaveCurrentReport}
                isSaved={isSaved(
                  report.product,
                  'architecture'
                )}
              />
            ) : (
              <EmptyState />
            )
        }
    }
  }

  // ─── Application Shell ───────────────────────────────────────────────────

  return (
    <div className={styles.app}>

      {/* =====================================================
          GLOBAL SIDEBAR
          ===================================================== */}

      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        history={history}
        onLoadHistory={handleLoadHistory}
        collapsed={sidebarCollapsed}
        onToggle={handleToggleSidebar}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={handleCloseMobileSidebar}
      />

      {/* =====================================================
          MAIN
          ===================================================== */}

      <div className={styles.main}>

        {/* ===================================================
            MOBILE HEADER

            Visible on every page.
            Provides navigation access on small screens.
            =================================================== */}

        <MobileHeader
          activePage={activePage}
          onOpenSidebar={handleOpenMobileSidebar}
        />

        {/* ===================================================
            ARCHITECTURE TOP BAR

            Only Architecture needs search + Generate.
            =================================================== */}

        {activePage === 'architecture' && (
          <TopBar
            query={query}
            loading={loading}
            onQueryChange={setQuery}
            onGenerate={handleGenerate}
          />
        )}

        {/* ===================================================
            PAGE CONTENT
            =================================================== */}

        <div className={styles.content}>
          {renderContent()}
        </div>

      </div>
    </div>
  )
}