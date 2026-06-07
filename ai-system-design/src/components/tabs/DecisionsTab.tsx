import type { DecisionsReport } from '../../types/report'
import s from './TabShared.module.css'

export default function DecisionsTab({ data }: { data: DecisionsReport }) {
  return (
    <div className={s.wrap}>
      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-compass" />Architecture Philosophy</div>
        <div className={s.highlightBlock}>{data.architecturePhilosophy}</div>
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-bulb" />Engineering Decisions</div>
        {data.decisions.map((d, i) => (
          <div className={s.card} key={i}>
            <div className={s.cardHeader}>
              <span className={s.cardTitle}>{d.decision}</span>
              <span className={`${s.badge} ${s.teal}`}>{d.chosen}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 8 }}>
              <div>
                <div style={{ fontSize: 10, color: 'var(--text-faint)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Rationale</div>
                <div className={s.mutedText}>{d.rationale}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: 'var(--text-faint)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Alternatives rejected</div>
                <div className={s.mutedText}>{d.alternatives}</div>
              </div>
            </div>
            <div style={{ marginTop: 12, paddingTop: 10, borderTop: '0.5px solid var(--border-subtle)' }}>
              <div style={{ fontSize: 10, color: 'var(--text-faint)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Tradeoff accepted</div>
              <div className={s.mutedText}>{d.tradeoff}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-clock-edit" />What They'd Do Differently</div>
        <div className={s.highlightBlock}>{data.whatTheyWouldDodifferently}</div>
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-star" />Key Takeaways</div>
        <div className={s.card}>
          <ul className={s.list}>
            {data.keyTakeaways.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}
