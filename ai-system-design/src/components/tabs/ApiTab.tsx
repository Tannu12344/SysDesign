import type { ApiReport } from '../../types/report'
import s from './TabShared.module.css'

export default function ApiTab({ data }: { data: ApiReport }) {
  return (
    <div className={s.wrap}>
      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-api" />API Overview</div>
        <div className={s.grid2}>
          <div className={s.card}>
            <div style={{ fontSize: 10, color: 'var(--text-faint)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Style</div>
            <div className={s.bodyText}>{data.apiStyle}</div>
          </div>
          <div className={s.card}>
            <div style={{ fontSize: 10, color: 'var(--text-faint)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Auth Strategy</div>
            <div className={s.bodyText}>{data.authStrategy}</div>
          </div>
        </div>
      </div>

      <div className={s.grid2}>
        <div className={s.section}>
          <div className={s.sectionTitle}><i className="ti ti-gate" />API Gateway</div>
          <div className={s.highlightBlock}>{data.gatewayNotes}</div>
        </div>
        <div className={s.section}>
          <div className={s.sectionTitle}><i className="ti ti-speedboat" />Rate Limiting</div>
          <div className={s.highlightBlock}>{data.rateLimitingStrategy}</div>
        </div>
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-list-details" />Endpoints</div>
        <div style={{ overflowX: 'auto' }}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Method</th><th>Path</th><th>Description</th>
                <th>Auth</th><th>Rate Limit</th>
              </tr>
            </thead>
            <tbody>
              {data.endpoints.map((ep, i) => (
                <tr key={i}>
                  <td>
                    <span className={`${s.methodBadge} ${s[ep.method] || ''}`}>{ep.method}</span>
                  </td>
                  <td><span className={s.monoText}>{ep.path}</span></td>
                  <td className={s.mutedText}>{ep.description}</td>
                  <td><span className={`${s.badge} ${s.gray}`}>{ep.auth}</span></td>
                  <td className={s.mutedText}>{ep.rateLimit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-code" />Request / Response Details</div>
        {data.endpoints.slice(0, 4).map((ep, i) => (
          <div className={s.card} key={i} style={{ marginBottom: 10 }}>
            <div className={s.cardHeader}>
              <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span className={`${s.methodBadge} ${s[ep.method] || ''}`}>{ep.method}</span>
                <span className={s.monoText}>{ep.path}</span>
              </span>
            </div>
            <div className={s.grid2}>
              <div>
                <div style={{ fontSize: 10, color: 'var(--text-faint)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Request</div>
                <div className={s.mutedText}>{ep.requestBody}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: 'var(--text-faint)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Response</div>
                <div className={s.mutedText}>{ep.responseShape}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
