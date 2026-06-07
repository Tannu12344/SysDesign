import type { DatabaseReport } from '../../types/report'
import s from './TabShared.module.css'

export default function DatabaseTab({ data }: { data: DatabaseReport }) {
  return (
    <div className={s.wrap}>
      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-database" />Storage Architecture</div>
        <div className={s.highlightBlock}>{data.storageDecisions}</div>
      </div>

      {data.stores.map((store, i) => (
        <div className={s.section} key={i}>
          <div className={s.sectionTitle}>
            <i className="ti ti-table" />{store.name}
            <span className={`${s.badge} ${s.blue}`}>{store.type}</span>
          </div>
          <div className={s.card}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 10, color: 'var(--text-faint)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Read Pattern</div>
                <div className={s.mutedText}>{store.readPattern}</div>
              </div>
              <div style={{ borderLeft: '0.5px solid var(--border-subtle)', paddingLeft: 12 }}>
                <div style={{ fontSize: 10, color: 'var(--text-faint)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Write Pattern</div>
                <div className={s.mutedText}>{store.writePattern}</div>
              </div>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-faint)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Why this database</div>
            <div className={s.mutedText} style={{ marginBottom: 16 }}>{store.reason}</div>

            {store.tables.map((table, j) => (
              <div key={j} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--accent-3)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>
                  {table.name}
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table className={s.table}>
                    <thead>
                      <tr>
                        <th>Column</th><th>Type</th><th>Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.columns.map((col, k) => (
                        <tr key={k}>
                          <td><span className={s.monoText}>{col.name}</span></td>
                          <td><span className={`${s.badge} ${s.gray}`}>{col.type}</span></td>
                          <td>{col.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {table.indexes.length > 0 && (
                  <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontSize: 10, color: 'var(--text-faint)' }}>Indexes:</span>
                    {table.indexes.map((idx, k) => <span key={k} className={s.tag}>{idx}</span>)}
                  </div>
                )}
                {table.partitioning && (
                  <div style={{ marginTop: 6, fontSize: 12, color: 'var(--text-faint)' }}>
                    <i className="ti ti-layout-rows" style={{ marginRight: 5 }} />Partitioning: {table.partitioning}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-git-merge" />Why Hybrid Storage</div>
        <div className={s.highlightBlock}>{data.whyHybrid}</div>
      </div>
    </div>
  )
}
