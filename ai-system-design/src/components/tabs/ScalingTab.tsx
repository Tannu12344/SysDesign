import type { ScalingReport } from '../../types/report'
import s from './TabShared.module.css'

export default function ScalingTab({ data }: { data: ScalingReport }) {
  return (
    <div className={s.wrap}>
      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-trending-up" />Traffic Projections</div>
        <div style={{ overflowX: 'auto' }}>
          <table className={s.table}>
            <thead><tr><th>Scale</th><th>RPS</th><th>Strategy</th></tr></thead>
            <tbody>
              {data.trafficProjections.map((t, i) => (
                <tr key={i}>
                  <td><span className={`${s.badge} ${i === 0 ? s.teal : i === 1 ? s.blue : s.purple}`}>{t.scale}</span></td>
                  <td><span className={s.monoText}>{t.rps}</span></td>
                  <td className={s.mutedText}>{t.strategy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-alert-circle" />Bottlenecks</div>
        {data.bottlenecks.map((b, i) => (
          <div className={s.card} key={i}>
            <div className={s.cardHeader}>
              <span className={s.cardTitle}>{b.component}</span>
              <span className={`${s.badge} ${s.amber}`}>{b.threshold}</span>
            </div>
            <div className={s.grid2}>
              <div>
                <div style={{ fontSize: 10, color: 'var(--text-faint)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Symptom</div>
                <div className={s.mutedText}>{b.symptom}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: 'var(--text-faint)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Mitigation</div>
                <div className={s.mutedText}>{b.mitigation}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={s.grid2}>
        <div className={s.section}>
          <div className={s.sectionTitle}><i className="ti ti-arrows-maximize" />Horizontal Scaling</div>
          <div className={s.highlightBlock}>{data.horizontalScaling}</div>
        </div>
        <div className={s.section}>
          <div className={s.sectionTitle}><i className="ti ti-adjustments" />Load Balancing</div>
          <div className={s.highlightBlock}>{data.loadBalancingStrategy}</div>
        </div>
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-world" />Multi-Region Plan</div>
        <div className={s.highlightBlock}>{data.multiRegionPlan}</div>
      </div>

      <div className={s.grid2}>
        <div className={s.section}>
          <div className={s.sectionTitle}><i className="ti ti-lifebuoy" />Disaster Recovery</div>
          <div className={s.highlightBlock}>{data.disasterRecovery}</div>
        </div>
        <div className={s.section}>
          <div className={s.sectionTitle}><i className="ti ti-robot" />Auto-Scaling</div>
          <div className={s.highlightBlock}>{data.autoScalingNotes}</div>
        </div>
      </div>
    </div>
  )
}
