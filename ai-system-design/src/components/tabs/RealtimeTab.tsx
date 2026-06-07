import type { RealtimeReport } from '../../types/report'
import s from './TabShared.module.css'

const PROTO_COLOR: Record<string, string> = {
  WebSocket: 'teal', SSE: 'blue', 'Long Polling': 'amber', WebRTC: 'purple',
}

export default function RealtimeTab({ data }: { data: RealtimeReport }) {
  return (
    <div className={s.wrap}>
      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-broadcast" />Protocol Decision</div>
        <div className={s.card}>
          <div className={s.cardHeader}>
            <span className={s.cardTitle}>{data.protocolChoice}</span>
            <span className={`${s.badge} ${s.teal}`}>Primary Protocol</span>
          </div>
          <div className={s.bodyText}>{data.protocolRationale}</div>
        </div>
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-antenna" />Real-Time Channels</div>
        {data.channels.map((ch, i) => (
          <div className={s.card} key={i}>
            <div className={s.cardHeader}>
              <span className={s.cardTitle}><span className={s.monoText}>{ch.name}</span></span>
              <div style={{ display: 'flex', gap: 8 }}>
                <span className={`${s.badge} ${s[PROTO_COLOR[ch.protocol] || 'gray']}`}>{ch.protocol}</span>
                <span className={`${s.badge} ${s.gray}`}>{ch.direction}</span>
              </div>
            </div>
            <div className={s.grid2}>
              <div>
                <div style={{ fontSize: 10, color: 'var(--text-faint)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Payload</div>
                <div className={s.mutedText}>{ch.payload}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: 'var(--text-faint)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Scaling</div>
                <div className={s.mutedText}>{ch.scalingNote}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={s.grid2}>
        <div className={s.section}>
          <div className={s.sectionTitle}><i className="ti ti-plug-connected" />Connection Management</div>
          <div className={s.highlightBlock}>{data.connectionManagement}</div>
        </div>
        <div className={s.section}>
          <div className={s.sectionTitle}><i className="ti ti-share" />Pub/Sub Design</div>
          <div className={s.highlightBlock}>{data.pubSubDesign}</div>
        </div>
      </div>

      {data.locationTracking && data.locationTracking !== 'Not applicable for this product' && (
        <div className={s.section}>
          <div className={s.sectionTitle}><i className="ti ti-map-pin" />Location Tracking</div>
          <div className={s.highlightBlock}>{data.locationTracking}</div>
        </div>
      )}

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-trending-up" />Scaling Real-Time</div>
        <div className={s.highlightBlock}>{data.scalingApproach}</div>
      </div>
    </div>
  )
}
