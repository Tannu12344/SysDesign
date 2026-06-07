import type { MessagingReport } from '../../types/report'
import s from './TabShared.module.css'

export default function MessagingTab({ data }: { data: MessagingReport }) {
  return (
    <div className={s.wrap}>
      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-messages" />Broker Decision</div>
        <div className={s.card}>
          <div className={s.cardHeader}>
            <span className={s.cardTitle}>{data.brokerChoice}</span>
            <span className={`${s.badge} ${s.purple}`}>Message Broker</span>
          </div>
          <div className={s.bodyText}>{data.brokerRationale}</div>
        </div>
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-topology-star" />Topics & Event Flows</div>
        <div style={{ overflowX: 'auto' }}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Topic</th><th>Producers</th><th>Consumers</th>
                <th>Partitions</th><th>Retention</th><th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              {data.topics.map((t, i) => (
                <tr key={i}>
                  <td><span className={s.monoText}>{t.name}</span></td>
                  <td>{t.producers.join(', ')}</td>
                  <td>{t.consumers.join(', ')}</td>
                  <td><span className={`${s.badge} ${s.teal}`}>{t.partitions}</span></td>
                  <td>{t.retentionHours}h</td>
                  <td className={s.mutedText}>{t.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={s.grid2}>
        <div className={s.section}>
          <div className={s.sectionTitle}><i className="ti ti-users-group" />Consumer Groups</div>
          <div className={s.card}>
            <ul className={s.list}>
              {data.consumerGroups.map((g, i) => <li key={i}>{g}</li>)}
            </ul>
          </div>
        </div>
        <div className={s.section}>
          <div className={s.sectionTitle}><i className="ti ti-refresh-alert" />Retry Strategy</div>
          <div className={s.highlightBlock}>{data.retryStrategy}</div>
        </div>
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-mail-off" />Dead Letter Queue</div>
        <div className={s.highlightBlock}>{data.dlqStrategy}</div>
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-arrow-right-circle" />Event Flow Summary</div>
        <div className={s.highlightBlock}>{data.eventFlowSummary}</div>
      </div>
    </div>
  )
}
