import type { CompareReport as Report } from '../../types/phase4'
import s from './CompareReport.module.css'

interface Props {
  report: Report
  onReset: () => void
}

export default function CompareReport({ report, onReset }: Props) {
  const [a, b] = report.items

  const getWinnerClass = (winner: string) => {
    if (winner === report.itemA) return s.a
    if (winner === report.itemB) return s.b
    return s.tie
  }

  const getWinnerLabel = (winner: string) => {
    if (winner === report.itemA) return report.itemA
    if (winner === report.itemB) return report.itemB
    return 'Tie'
  }

  return (
    <div className={`${s.wrap} fade-in`}>
      <div className={s.header}>
        <div>
          <h1 className={s.title}>{report.itemA} vs {report.itemB}</h1>
          <div className={s.subtitle}>Side-by-side engineering comparison</div>
        </div>
        <div className={s.actions}>
          <span className={s.categoryBadge}>{report.category}</span>
          <button className={s.newBtn} onClick={onReset}>
            <i className="ti ti-refresh" aria-hidden="true" /> New Compare
          </button>
        </div>
      </div>

      <div className={s.summary}>{report.summary}</div>

      {/* Side-by-side cards */}
      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-layout-columns" aria-hidden="true" />Side by Side</div>
        <div className={s.compareGrid}>
          {[a, b].map((item, idx) => (
            <div key={idx} className={s.itemCard}>
              <div className={`${s.itemName} ${idx === 0 ? s.a : s.b}`}>{item.name}</div>

              <div className={s.subLabel}>Advantages</div>
              <ul className={`${s.list} ${s.pros}`}>
                {item.advantages.map((adv, i) => <li key={i}>{adv}</li>)}
              </ul>

              <div className={s.subLabel}>Disadvantages</div>
              <ul className={`${s.list} ${s.cons}`}>
                {item.disadvantages.map((dis, i) => <li key={i}>{dis}</li>)}
              </ul>

              <div className={s.subLabel}>Use Cases</div>
              <ul className={`${s.list} ${s.cases}`}>
                {item.useCases.map((uc, i) => <li key={i}>{uc}</li>)}
              </ul>

              <div className={s.metaRow}>
                {[
                  { k: 'Performance', v: item.performance },
                  { k: 'Cost', v: item.cost },
                  { k: 'Complexity', v: item.complexity },
                ].map(({ k, v }) => (
                  <div key={k} className={s.metaItem}>
                    <span className={s.metaKey}>{k}</span>
                    <span className={s.metaVal}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decision Matrix */}
      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-table" aria-hidden="true" />Decision Matrix</div>
        <div style={{ overflowX: 'auto' }}>
          <table className={s.matrixTable}>
            <thead>
              <tr>
                <th>Criterion</th>
                <th style={{ color: '#5a9fd4' }}>{report.itemA}</th>
                <th style={{ color: '#9d7ef0' }}>{report.itemB}</th>
                <th className={s.center}>Winner</th>
              </tr>
            </thead>
            <tbody>
              {report.decisionMatrix.map((row, i) => (
                <tr key={i}>
                  <td className={s.criterion}>{row.criterion}</td>
                  <td>{row.itemA}</td>
                  <td>{row.itemB}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`${s.winnerBadge} ${getWinnerClass(row.winner)}`}>
                      {getWinnerLabel(row.winner)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* When to use */}
      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-map-pin" aria-hidden="true" />When to Use Each</div>
        <div className={s.whenGrid}>
          <div className={s.whenCard}>
            <div className={`${s.whenTitle} ${s.a}`}>{report.itemA}</div>
            <ul className={`${s.list} ${s.cases}`}>
              {report.whenToUseA.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </div>
          <div className={s.whenCard}>
            <div className={`${s.whenTitle} ${s.b}`}>{report.itemB}</div>
            <ul className={`${s.list} ${s.cases}`}>
              {report.whenToUseB.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* Interview Questions */}
      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-message-question" aria-hidden="true" />Interview Questions</div>
        {report.interviewQuestions.map((q, i) => (
          <div key={i} className={s.iqCard}>
            <div className={s.iqQ}>{q.question}</div>
            <div className={s.iqHint}>{q.hint}</div>
          </div>
        ))}
      </div>

      {/* Verdict */}
      <div className={s.section}>
        <div className={s.sectionTitle}><i className="ti ti-gavel" aria-hidden="true" />Verdict</div>
        <div className={s.verdictCard}>{report.verdict}</div>
      </div>
    </div>
  )
}
