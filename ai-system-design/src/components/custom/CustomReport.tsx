import type { CustomReport as Report } from '../../types/phase4'
import s from './CustomReport.module.css'

interface Props {
  report: Report
  onReset: () => void
}

export default function CustomReport({ report, onReset }: Props) {
  return (
    <div className={`${s.wrap} fade-in`}>
      <div className={s.header}>
        <div>
          <h1 className={s.systemName}>{report.systemName}</h1>
          <p className={s.oneLiner}>{report.oneLiner}</p>
        </div>
        <div className={s.actions}>
          <span className={s.badge}>Custom Design</span>
          <button className={s.newBtn} onClick={onReset}>
            <i className="ti ti-refresh" aria-hidden="true" /> New Design
          </button>
        </div>
      </div>

      {/* Requirements */}
      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-list-check" aria-hidden="true" />Requirements</div>
        <div className={s.grid2}>
          <div className={s.card}>
            <div className={s.cardTitle}>Functional</div>
            <ul className={s.list}>
              {report.functionalRequirements.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
          <div className={s.card}>
            <div className={s.cardTitle}>Non-Functional</div>
            <ul className={s.list}>
              {report.nonFunctionalRequirements.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className={s.section}>
        <div className={s.sectionTitle}>
          <i className="ti ti-components" aria-hidden="true" />Services
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-faint)' }}>
            {report.services.length} services
          </span>
        </div>
        <div className={s.servicesGrid}>
          {report.services.map((svc, i) => (
            <div key={i} className={s.serviceCard}>
              <div className={s.serviceName}>{svc.name}</div>
              <div className={s.serviceResp}>{svc.responsibility}</div>
              <div className={s.serviceStack}>
                <i className="ti ti-stack-2" aria-hidden="true" />{svc.techStack}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture blocks */}
      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-database" aria-hidden="true" />Database Design</div>
        <div className={s.highlightBlock}>{report.databaseDesign}</div>
      </div>

      <div className={s.grid2}>
        <div className={s.section}>
          <div className={s.sectionTitle}><i className="ti ti-bolt" aria-hidden="true" />Caching</div>
          <div className={s.highlightBlock}>{report.cachingStrategy}</div>
        </div>
        <div className={s.section}>
          <div className={s.sectionTitle}><i className="ti ti-messages" aria-hidden="true" />Messaging</div>
          <div className={s.highlightBlock}>{report.messagingStrategy}</div>
        </div>
      </div>

      <div className={s.grid2}>
        <div className={s.section}>
          <div className={s.sectionTitle}><i className="ti ti-api" aria-hidden="true" />API Design</div>
          <div className={s.highlightBlock}>{report.apiDesign}</div>
        </div>
        <div className={s.section}>
          <div className={s.sectionTitle}><i className="ti ti-shield-lock" aria-hidden="true" />Security</div>
          <div className={s.highlightBlock}>{report.securityConsiderations}</div>
        </div>
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-trending-up" aria-hidden="true" />Scaling Strategy</div>
        <div className={s.highlightBlock}>{report.scalingStrategy}</div>
      </div>

      {/* Estimation */}
      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-calculator" aria-hidden="true" />Scale Estimation</div>
        <div className={s.estimateGrid}>
          {[
            { label: 'Users', value: report.estimate.users },
            { label: 'Requests / Day', value: report.estimate.requestsPerDay },
            { label: 'Storage Growth', value: report.estimate.storageGB },
            { label: 'Bandwidth', value: report.estimate.bandwidthGB },
            { label: 'Servers', value: report.estimate.serversEstimate },
            { label: 'Est. Monthly Cost', value: report.estimate.costEstimate },
          ].map(({ label, value }) => (
            <div key={label} className={s.estimateCard}>
              <div className={s.estimateLabel}>{label}</div>
              <div className={s.estimateValue}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tradeoffs */}
      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-scale" aria-hidden="true" />Tradeoffs</div>
        {report.tradeoffs.map((t, i) => (
          <div key={i} className={s.tradeoffCard}>
            <div className={s.tradeoffDecision}>{t.decision}</div>
            <div className={s.tradeoffRationale}>{t.rationale}</div>
          </div>
        ))}
      </div>

      {/* Interview angles */}
      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-message-question" aria-hidden="true" />Interview Angles</div>
        <div className={s.angleCard}>
          <ul className={s.list}>
            {report.interviewAngles.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
      </div>

      {/* Infrastructure */}
      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-server" aria-hidden="true" />Infrastructure</div>
        <div className={s.highlightBlock}>{report.infrastructure}</div>
      </div>
    </div>
  )
}
