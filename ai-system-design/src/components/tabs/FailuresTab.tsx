import type { FailuresReport } from '../../types/report'
import s from './TabShared.module.css'

export default function FailuresTab({ data }: { data: FailuresReport }) {
  return (
    <div className={s.wrap}>
      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-alert-triangle" />Failure Scenarios</div>
        {data.scenarios.map((sc, i) => (
          <div className={s.card} key={i}>
            <div className={s.cardHeader}>
              <span className={s.cardTitle}>{sc.name}</span>
              <span className={`${s.badge} ${s.green}`}>MTTR: {sc.recoveryTime}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
              {[
                { label: 'Trigger', value: sc.trigger },
                { label: 'Impact', value: sc.impact },
                { label: 'Mitigation', value: sc.mitigation },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div style={{ fontSize: 10, color: 'var(--text-faint)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
                  <div className={s.mutedText}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={s.grid2}>
        <div className={s.section}>
          <div className={s.sectionTitle}><i className="ti ti-circuit-switch-closed" />Circuit Breakers</div>
          <div className={s.highlightBlock}>{data.circuitBreakerDesign}</div>
        </div>
        <div className={s.section}>
          <div className={s.sectionTitle}><i className="ti ti-wall" />Bulkhead Pattern</div>
          <div className={s.highlightBlock}>{data.bulkheadPattern}</div>
        </div>
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-bug" />Chaos Engineering</div>
        <div className={s.highlightBlock}>{data.chaosEngineeringNotes}</div>
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-notebook" />Incident Runbook</div>
        <div className={s.highlightBlock}>{data.runbook}</div>
      </div>
    </div>
  )
}
