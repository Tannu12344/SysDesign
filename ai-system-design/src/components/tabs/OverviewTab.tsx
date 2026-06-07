import type { ArchitectureReport } from '../../types/report'
import ServiceCard from '../explorer/ServiceCard'
import s from './TabShared.module.css'
import rs from '../explorer/ArchitectureReport.module.css'

interface Props {
  report: ArchitectureReport
  onCopy: () => void
}

export default function OverviewTab({ report }: Props) {
  return (
    <div className={s.wrap}>
      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-info-circle" />Product Overview</div>
        <div className={s.highlightBlock}>{report.overview}</div>
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-list-check" />Requirements</div>
        <div className={s.grid2}>
          <div className={s.card}>
            <div style={{ fontSize: 11, color: 'var(--accent-2)', fontWeight: 500, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Functional</div>
            <ul className={s.list}>
              {report.functionalRequirements.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
          <div className={s.card}>
            <div style={{ fontSize: 11, color: 'var(--accent-2)', fontWeight: 500, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Non-Functional</div>
            <ul className={s.list}>
              {report.nonFunctionalRequirements.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-components" />Services <span style={{ fontSize: 10, marginLeft: 4, color: 'var(--text-faint)' }}>({report.services.length})</span></div>
        <div className={rs.servicesGrid}>
          {report.services.map((svc, i) => <ServiceCard key={i} service={svc} />)}
        </div>
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-server" />Infrastructure</div>
        <div className={s.highlightBlock}>{report.infrastructure}</div>
      </div>
    </div>
  )
}
