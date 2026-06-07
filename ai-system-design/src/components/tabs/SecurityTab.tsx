import type { SecurityReport } from '../../types/report'
import s from './TabShared.module.css'

export default function SecurityTab({ data }: { data: SecurityReport }) {
  return (
    <div className={s.wrap}>
      <div className={s.grid2}>
        <div className={s.section}>
          <div className={s.sectionTitle}><i className="ti ti-login" />Authentication</div>
          <div className={s.highlightBlock}>{data.authNStrategy}</div>
        </div>
        <div className={s.section}>
          <div className={s.sectionTitle}><i className="ti ti-key" />Authorization</div>
          <div className={s.highlightBlock}>{data.authZStrategy}</div>
        </div>
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-shield-check" />Security Controls</div>
        <div style={{ overflowX: 'auto' }}>
          <table className={s.table}>
            <thead><tr><th>Area</th><th>Mechanism</th><th>Details</th></tr></thead>
            <tbody>
              {data.controls.map((c, i) => (
                <tr key={i}>
                  <td><span className={`${s.badge} ${s.purple}`}>{c.area}</span></td>
                  <td><span className={s.monoText}>{c.mechanism}</span></td>
                  <td className={s.mutedText}>{c.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={s.grid2}>
        <div className={s.section}>
          <div className={s.sectionTitle}><i className="ti ti-lock" />Encryption at Rest</div>
          <div className={s.highlightBlock}>{data.encryptionAtRest}</div>
        </div>
        <div className={s.section}>
          <div className={s.sectionTitle}><i className="ti ti-lock-square" />Encryption in Transit</div>
          <div className={s.highlightBlock}>{data.encryptionInTransit}</div>
        </div>
      </div>

      <div className={s.grid2}>
        <div className={s.section}>
          <div className={s.sectionTitle}><i className="ti ti-user-shield" />PII Handling</div>
          <div className={s.highlightBlock}>{data.piiHandling}</div>
        </div>
        <div className={s.section}>
          <div className={s.sectionTitle}><i className="ti ti-barrier-block" />Rate Limiting & DDoS</div>
          <div className={s.highlightBlock}>{data.rateLimitingDDoS}</div>
        </div>
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-certificate" />Compliance</div>
        <div className={s.highlightBlock}>{data.complianceNotes}</div>
      </div>
    </div>
  )
}
