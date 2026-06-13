import { useState } from 'react'
import type { InterviewReport as Report } from '../../types/report'
import s from './InterviewReport.module.css'

interface Props {
  report: Report
  onReset: () => void
}

export default function InterviewReport({ report, onReset }: Props) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set([0]))

  const toggle = (i: number) => {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <div className={`${s.wrap} fade-in`}>
      <div className={s.header}>
        <div>
          <h1 className={s.product}>{report.product}</h1>
          <div className={s.subtitle}>
            System Design Interview
            <span className={s.levelBadge}>{report.level} Level</span>
          </div>
        </div>
        <div className={s.actions}>
          <button className={s.newBtn} onClick={onReset}>
            <i className="ti ti-refresh" aria-hidden="true" /> New Interview
          </button>
        </div>
      </div>

      <div className={s.focusAreas}>
        {report.focusAreas.map((f, i) => (
          <span key={i} className={s.focusTag}>{f}</span>
        ))}
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}>
          <i className="ti ti-message-question" aria-hidden="true" /> Interview Questions
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-faint)' }}>
            {report.questions.length} questions
          </span>
        </div>
        {report.questions.map((q, i) => {
          const isOpen = expanded.has(i)
          return (
            <div key={i} className={s.questionCard} onClick={() => toggle(i)}>
              <div className={s.questionHeader}>
                <span className={s.questionNum}>Q{i + 1}</span>
                <span className={s.questionText}>{q.question}</span>
                <div className={s.questionMeta}>
                  <span className={`${s.diffBadge} ${s[q.difficulty]}`}>{q.difficulty}</span>
                  <span className={s.categoryTag}>{q.category}</span>
                  <i className={`ti ti-chevron-right ${s.chevron} ${isOpen ? s.open : ''}`} aria-hidden="true" />
                </div>
              </div>

              {isOpen && (
                <div className={s.expandedContent}>
                  <div>
                    <div className={s.subLabel}>Answer Framework</div>
                    <ul className={s.list}>
                      {q.answerFramework.map((a, j) => <li key={j}>{a}</li>)}
                    </ul>
                  </div>
                  <div>
                    <div className={s.subLabel}>Likely Follow-Ups</div>
                    <ul className={s.list}>
                      {q.followUps.map((f, j) => <li key={j}>{f}</li>)}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}>
          <i className="ti ti-scale" aria-hidden="true" /> Tradeoff Questions
        </div>
        {report.tradeoffQuestions.map((t, i) => (
          <div key={i} className={s.tradeoffCard}>
            <div className={s.tradeoffQ}>{t.question}</div>
            <div className={s.tradeoffA}>{t.framework}</div>
          </div>
        ))}
      </div>

      <div className={s.grid2}>
        <div className={s.section}>
          <div className={s.sectionTitle}>
            <i className="ti ti-alert-circle" aria-hidden="true" /> Common Mistakes
          </div>
          <div className={s.card}>
            <ul className={s.list}>
              {report.commonMistakes.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          </div>
        </div>
        <div className={s.section}>
          <div className={s.sectionTitle}>
            <i className="ti ti-users" aria-hidden="true" /> Behavioral Points
          </div>
          <div className={s.card}>
            <ul className={s.list}>
              {report.behavioralPoints.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
