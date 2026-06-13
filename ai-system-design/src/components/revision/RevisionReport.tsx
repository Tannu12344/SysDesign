import type { RevisionReport as Report } from '../../types/report'
import s from './RevisionReport.module.css'

const DURATION_LABEL: Record<string, string> = {
  '5': '5-Minute Cheat Sheet',
  '15': '15-Minute Revision',
  '30': '30-Minute Revision',
}

interface Props {
  report: Report
  onReset: () => void
}

export default function RevisionReport({ report, onReset }: Props) {
  const handlePrint = () => window.print()

  return (
    <div className={`${s.wrap} fade-in`}>
      <div className={s.header}>
        <div>
          <h1 className={s.product}>{report.product}</h1>
        </div>
        <div className={s.actions}>
          <span className={s.durationBadge}>{DURATION_LABEL[report.duration]}</span>
          <button className={s.actionBtn} onClick={handlePrint}>
            <i className="ti ti-printer" aria-hidden="true" /> Print / PDF
          </button>
          <button className={s.actionBtn} onClick={onReset}>
            <i className="ti ti-refresh" aria-hidden="true" /> New
          </button>
        </div>
      </div>

      <div className={s.oneLiner}>{report.oneLiner}</div>

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-bulb" aria-hidden="true" />Core Decisions</div>
        <ul className={s.list}>
          {report.coreDecisions.map((d, i) => <li key={i}>{d}</li>)}
        </ul>
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-components" aria-hidden="true" />Key Services</div>
        <div className={s.serviceGrid}>
          {report.keyServices.map((svc, i) => (
            <div key={i} className={s.serviceChip}>
              <div className={s.serviceName}>{svc.name}</div>
              <div className={s.serviceNote}>{svc.note}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-stack-2" aria-hidden="true" />Storage & Infra Choices</div>
        <div className={s.choiceGrid}>
          <div className={s.choiceCard}>
            <div className={s.choiceLabel}>Database</div>
            <div className={s.choiceValue}>{report.databaseChoice.choice}</div>
            <div className={s.choiceReason}>{report.databaseChoice.reason}</div>
          </div>
          <div className={s.choiceCard}>
            <div className={s.choiceLabel}>Caching</div>
            <div className={s.choiceValue}>{report.cachingChoice.choice}</div>
            <div className={s.choiceReason}>{report.cachingChoice.reason}</div>
          </div>
          <div className={s.choiceCard}>
            <div className={s.choiceLabel}>Messaging</div>
            <div className={s.choiceValue}>{report.messagingChoice.choice}</div>
            <div className={s.choiceReason}>{report.messagingChoice.reason}</div>
          </div>
        </div>
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-trending-up" aria-hidden="true" />Scaling Strategies</div>
        <ul className={s.list}>
          {report.scalingStrategies.map((sc, i) => <li key={i}>{sc}</li>)}
        </ul>
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-api" aria-hidden="true" />API Highlights</div>
        <ul className={s.list}>
          {report.apiHighlights.map((a, i) => <li key={i}>{a}</li>)}
        </ul>
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-message-question" aria-hidden="true" />Likely Questions</div>
        {report.likelyQuestions.map((qa, i) => (
          <div key={i} className={s.qaCard}>
            <div className={s.qaQ}>{qa.question}</div>
            <div className={s.qaA}>{qa.answer}</div>
          </div>
        ))}
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-star" aria-hidden="true" />Final Takeaways</div>
        <div className={s.takeawaysCard}>
          <ul className={s.list}>
            {report.finalTakeaways.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}
