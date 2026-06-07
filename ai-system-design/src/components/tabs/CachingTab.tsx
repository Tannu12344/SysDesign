import type { CachingReport } from '../../types/report'
import s from './TabShared.module.css'

const TOOL_COLOR: Record<string, string> = {
  Redis: 'coral', Memcached: 'amber', CDN: 'teal', 'In-memory': 'blue', ElastiCache: 'coral',
}

export default function CachingTab({ data }: { data: CachingReport }) {
  return (
    <div className={s.wrap}>
      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-bolt" />Cache Layers</div>
        {data.layers.map((layer, i) => (
          <div className={s.card} key={i}>
            <div className={s.cardHeader}>
              <span className={s.cardTitle}>{layer.name}</span>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span className={`${s.badge} ${s[TOOL_COLOR[layer.tool] || 'gray']}`}>{layer.tool}</span>
                <span className={`${s.badge} ${s.gray}`}>{layer.strategy}</span>
              </div>
            </div>
            <div className={s.mutedText} style={{ marginBottom: 12 }}>{layer.rationale}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
              {[
                { label: 'Key Pattern', value: layer.keyPattern, mono: true },
                { label: 'TTL', value: layer.ttl },
                { label: 'Eviction', value: layer.eviction },
              ].map(({ label, value, mono }) => (
                <div key={label}>
                  <div style={{ fontSize: 10, color: 'var(--text-faint)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
                  {mono ? <span className={s.monoText}>{value}</span> : <span className={s.mutedText}>{value}</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={s.grid2}>
        <div className={s.section}>
          <div className={s.sectionTitle}><i className="ti ti-world" />CDN Strategy</div>
          <div className={s.highlightBlock}>{data.cdnStrategy}</div>
        </div>
        <div className={s.section}>
          <div className={s.sectionTitle}><i className="ti ti-refresh" />Cache Invalidation</div>
          <div className={s.highlightBlock}>{data.invalidationApproach}</div>
        </div>
      </div>

      <div className={s.grid2}>
        <div className={s.section}>
          <div className={s.sectionTitle}><i className="ti ti-flame" />Hot Data</div>
          <div className={s.highlightBlock}>{data.hotDataNotes}</div>
        </div>
        <div className={s.section}>
          <div className={s.sectionTitle}><i className="ti ti-gauge" />Performance Impact</div>
          <div className={s.highlightBlock}>{data.performanceImpact}</div>
        </div>
      </div>
    </div>
  )
}
