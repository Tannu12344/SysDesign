import { useState, useCallback, useEffect } from 'react'
import { useGeminiCall } from '../../hooks/useGeminiCall'
import TabBar from './TabBar'
import DatabaseTab from './DatabaseTab'
import CachingTab from './CachingTab'
import MessagingTab from './MessagingTab'
import ApiTab from './ApiTab'
import RealtimeTab from './RealtimeTab'
import ScalingTab from './ScalingTab'
import SecurityTab from './SecurityTab'
import FailuresTab from './FailuresTab'
import DecisionsTab from './DecisionsTab'
import OverviewTab from './OverviewTab'
import { useTabCache } from '../../hooks/useTabCache'
import { getTabPrompt, TAB_LOADING_MESSAGES } from '../../prompts/tabPrompts'
import type {
  TabId, TabData, ArchitectureReport,
  DatabaseReport, CachingReport, MessagingReport, ApiReport,
  RealtimeReport, ScalingReport, SecurityReport, FailuresReport, DecisionsReport
} from '../../types/report'
import s from './DeepExplorer.module.css'

interface Props {
  report: ArchitectureReport
  onCopy: () => void
  onSave?: () => void
  isSaved?: boolean
}

export default function DeepExplorer({ report, onCopy, onSave, isSaved }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>('overview')
  const [loadingTab, setLoadingTab] = useState<TabId | null>(null)
  const [tabError, setTabError] = useState<string | null>(null)
  const [loadingMsg, setLoadingMsg] = useState('')
  const [saveFeedback, setSaveFeedback] = useState(false)

  const { getTab, setTab, hasTab } = useTabCache(report.product)
  const [cachedSet, setCachedSet] = useState<Set<TabId>>(new Set())
  const { callGemini } = useGeminiCall()

  useEffect(() => {
    const tabs: TabId[] = ['database','caching','messaging','api','realtime','scaling','security','failures','decisions']
    const cached = new Set<TabId>(tabs.filter(t => hasTab(t as TabId)) as TabId[])
    setCachedSet(cached)
  }, [report.product, hasTab])

  const loadTab = useCallback(async (tab: TabId) => {
    if (tab === 'overview') { setActiveTab('overview'); return }
    if (hasTab(tab)) { setActiveTab(tab); return }
    setActiveTab(tab)
    setLoadingTab(tab)
    setTabError(null)
    const msgs = TAB_LOADING_MESSAGES[tab]
    let idx = 0
    setLoadingMsg(msgs[0] || 'Loading...')
    const interval = setInterval(() => {
      idx = (idx + 1) % msgs.length
      setLoadingMsg(msgs[idx])
    }, 2000)
    try {
      const prompt = getTabPrompt(tab, report.product)
      const raw = await callGemini(prompt)
      const parsed = JSON.parse(raw) as TabData
      setTab(tab, parsed)
      setCachedSet(prev => new Set([...prev, tab]))
    } catch (err) {
      setTabError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      clearInterval(interval)
      setLoadingTab(null)
    }
  }, [hasTab, callGemini, report.product, setTab])

  const handleSave = () => {
    if (onSave && !isSaved) {
      onSave()
      setSaveFeedback(true)
      setTimeout(() => setSaveFeedback(false), 2000)
    }
  }

  const renderTabContent = () => {
    if (activeTab === 'overview') return <OverviewTab report={report} onCopy={onCopy} />
    if (loadingTab === activeTab) {
      return (
        <div className={s.tabLoading}>
          <div className={s.tabSpinner} />
          <div className={s.tabLoadingProduct}>{report.product}</div>
          <div className={s.tabLoadingMsg}>{loadingMsg}</div>
        </div>
      )
    }
    if (tabError && !hasTab(activeTab)) {
      return (
        <div className={s.tabError}>
          <i className="ti ti-alert-circle" />
          <div>{tabError}</div>
          <button onClick={() => { setTabError(null); loadTab(activeTab) }}>
            <i className="ti ti-refresh" /> Retry
          </button>
        </div>
      )
    }
    const data = getTab(activeTab)
    if (!data) return null
    switch (activeTab) {
      case 'database':  return <DatabaseTab  data={data as DatabaseReport} />
      case 'caching':   return <CachingTab   data={data as CachingReport} />
      case 'messaging': return <MessagingTab data={data as MessagingReport} />
      case 'api':       return <ApiTab       data={data as ApiReport} />
      case 'realtime':  return <RealtimeTab  data={data as RealtimeReport} />
      case 'scaling':   return <ScalingTab   data={data as ScalingReport} />
      case 'security':  return <SecurityTab  data={data as SecurityReport} />
      case 'failures':  return <FailuresTab  data={data as FailuresReport} />
      case 'decisions': return <DecisionsTab data={data as DecisionsReport} />
      default: return null
    }
  }

  return (
    <div className={s.wrap}>
      <div className={s.productHeader}>
        <div>
          <h1 className={s.product}>{report.product}</h1>
          <p className={s.tagline}>{report.tagline}</p>
        </div>
        <div className={s.headerActions}>
          <span className={s.badge}>Deep Explorer</span>
          <button className={s.copyBtn} onClick={onCopy}>
            <i className="ti ti-copy" /> Copy MD
          </button>
          {onSave && (
            <button
              className={s.copyBtn}
              onClick={handleSave}
              disabled={isSaved}
              title={isSaved ? 'Already saved' : 'Save report'}
              style={isSaved ? { color: 'var(--accent-3)', borderColor: 'var(--accent-border)' } : {}}
            >
              <i className={`ti ${saveFeedback || isSaved ? 'ti-bookmark-filled' : 'ti-bookmark'}`} />
              {saveFeedback ? 'Saved!' : isSaved ? 'Saved' : 'Save'}
            </button>
          )}
        </div>
      </div>
      <TabBar activeTab={activeTab} cachedTabs={cachedSet} loadingTab={loadingTab} onSelectTab={loadTab} />
      <div className={s.tabContent}>{renderTabContent()}</div>
    </div>
  )
}
