import { useState } from 'react'
import type { AppSettings } from '../../types/phase5'
import s from './SettingsPage.module.css'

interface Props {
  settings: AppSettings
  onUpdate: (partial: Partial<AppSettings>) => void
  onReset: () => void
  onClearHistory: () => void
  onClearSaved: () => void
}

const LEVELS = ['Junior', 'Mid', 'Senior', 'Staff'] as const
const DURATIONS = [
  { value: '5',  label: '5 min' },
  { value: '15', label: '15 min' },
  { value: '30', label: '30 min' },
] as const

export default function SettingsPage({ settings, onUpdate, onReset, onClearHistory, onClearSaved }: Props) {
  const [saved, setSaved] = useState(false)
  const [apiKeyVisible, setApiKeyVisible] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const [localKey, setLocalKey] = useState(settings.apiKey)

  const handleSaveKey = () => {
    onUpdate({ apiKey: localKey })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className={s.wrap}>
      <h2 className={s.title}>Settings</h2>
      <p className={s.desc}>Configure your API key, default preferences, and manage stored data.</p>

      {/* API Key */}
      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-key" aria-hidden="true" />API Configuration</div>
        <div className={s.field}>
          <div className={s.fieldLabel}>Groq API Key</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              className={s.input}
              type={apiKeyVisible ? 'text' : 'password'}
              placeholder="gsk_xxxxxxxxxxxxxxxxxxxx"
              value={localKey}
              onChange={e => setLocalKey(e.target.value)}
            />
            <button
              onClick={() => setApiKeyVisible(v => !v)}
              style={{ background: 'var(--bg-surface)', border: '0.5px solid var(--border-mid)', borderRadius: 'var(--radius-md)', padding: '0 12px', color: 'var(--text-faint)', cursor: 'pointer', flexShrink: 0 }}
            >
              <i className={`ti ${apiKeyVisible ? 'ti-eye-off' : 'ti-eye'}`} aria-hidden="true" />
            </button>
          </div>
          <div className={s.fieldHint}>Get your free key at console.groq.com · Stored locally in localStorage only</div>
        </div>
        <button className={s.saveBtn} onClick={handleSaveKey}>
          <i className="ti ti-device-floppy" aria-hidden="true" /> Save Key
        </button>
        {saved && (
          <div className={s.successMsg}>
            <i className="ti ti-check" aria-hidden="true" /> API key saved
          </div>
        )}
      </div>

      {/* Interview defaults */}
      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-help-circle" aria-hidden="true" />Interview Defaults</div>
        <div className={s.field}>
          <div className={s.fieldLabel}>Default Experience Level</div>
          <div className={s.grid4}>
            {LEVELS.map(l => (
              <button
                key={l}
                className={`${s.optionBtn} ${settings.defaultLevel === l ? s.active : ''}`}
                onClick={() => onUpdate({ defaultLevel: l })}
              >
                {l}
              </button>
            ))}
          </div>
          <div className={s.fieldHint}>Pre-selected when opening Interview Mode</div>
        </div>
      </div>

      {/* Revision defaults */}
      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-book" aria-hidden="true" />Revision Defaults</div>
        <div className={s.field}>
          <div className={s.fieldLabel}>Default Revision Duration</div>
          <div className={s.grid3}>
            {DURATIONS.map(d => (
              <button
                key={d.value}
                className={`${s.optionBtn} ${settings.defaultRevisionDuration === d.value ? s.active : ''}`}
                onClick={() => onUpdate({ defaultRevisionDuration: d.value })}
              >
                {d.label}
              </button>
            ))}
          </div>
          <div className={s.fieldHint}>Pre-selected when opening Revision Mode</div>
        </div>
      </div>

      {/* Display preferences */}
      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-adjustments" aria-hidden="true" />Display</div>
        <div className={s.toggle}>
          <div className={s.toggleInfo}>
            <span className={s.toggleLabel}>Show Scale Estimation in Custom Design</span>
            <span className={s.toggleDesc}>Displays server count, cost, and bandwidth estimates</span>
          </div>
          <button
            className={`${s.toggleSwitch} ${settings.showEstimationsInCustom ? s.on : ''}`}
            onClick={() => onUpdate({ showEstimationsInCustom: !settings.showEstimationsInCustom })}
            aria-label="Toggle estimation"
          />
        </div>
      </div>

      {/* Data management */}
      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-database" aria-hidden="true" />Data Management</div>
        <button className={s.dangerBtn} onClick={onClearHistory}>
          <i className="ti ti-clock-off" aria-hidden="true" /> Clear Architecture History
        </button>
        <button className={s.dangerBtn} onClick={onClearSaved}>
          <i className="ti ti-bookmark-off" aria-hidden="true" /> Clear Saved Reports
        </button>
        <button
          className={s.dangerBtn}
          onClick={() => {
            if (!confirmReset) { setConfirmReset(true); return }
            onReset()
            setLocalKey('')
            setConfirmReset(false)
          }}
        >
          <i className="ti ti-refresh-alert" aria-hidden="true" />
          {confirmReset ? 'Click again — this clears everything' : 'Reset All Settings'}
        </button>
      </div>

      <div className={s.version}>
        SysDesign v1.0 · Phase 5 · Built with React + TypeScript + Groq API
      </div>
    </div>
  )
}
