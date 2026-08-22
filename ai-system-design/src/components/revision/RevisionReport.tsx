import type { RevisionReport as Report } from '../../types/report'

import s from './RevisionReport.module.css'

const DURATION_LABEL: Record<string, string> = {
  '5': '5-Minute Cheat Sheet',
  '15': '15-Minute Revision',
  '30': '30-Minute Revision',
}

interface Props {
  report: Report
  onReset: () => void
}

export default function RevisionReport({
  report,
  onReset,
}: Props) {
  const handlePrint = () => window.print()

  return (
    <main className={`${s.wrap} fade-in`}>

      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className={s.header}>
        <div>
          <h1 className={s.product}>
            {report.product}
          </h1>
        </div>

        <div className={s.actions}>
          <span className={s.durationBadge}>
            {DURATION_LABEL[report.duration]}
          </span>

          <button
            type="button"
            className={s.actionBtn}
            onClick={handlePrint}
          >
            <i
              className="ti ti-printer"
              aria-hidden="true"
            />
            Print / PDF
          </button>

          <button
            type="button"
            className={s.actionBtn}
            onClick={onReset}
          >
            <i
              className="ti ti-refresh"
              aria-hidden="true"
            />
            New
          </button>
        </div>
      </div>

      {/* =====================================================
          SUMMARY
          ===================================================== */}

      <p className={s.oneLiner}>
        {report.oneLiner}
      </p>

      {/* =====================================================
          CORE DECISIONS
          ===================================================== */}

      <section className={s.section}>
        <h2 className={s.sectionTitle}>
          <i
            className="ti ti-bulb"
            aria-hidden="true"
          />
          Core Decisions
        </h2>

        <ul className={s.list}>
          {report.coreDecisions.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </section>

      {/* =====================================================
          KEY SERVICES
          ===================================================== */}

      <section className={s.section}>
        <h2 className={s.sectionTitle}>
          <i
            className="ti ti-components"
            aria-hidden="true"
          />
          Key Services
        </h2>

        <div className={s.serviceGrid}>
          {report.keyServices.map((svc, i) => (
            <div
              key={i}
              className={s.serviceChip}
            >
              <div className={s.serviceName}>
                {svc.name}
              </div>

              <div className={s.serviceNote}>
                {svc.note}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          STORAGE & INFRASTRUCTURE
          ===================================================== */}

      <section className={s.section}>
        <h2 className={s.sectionTitle}>
          <i
            className="ti ti-stack-2"
            aria-hidden="true"
          />
          Storage &amp; Infra Choices
        </h2>

        <div className={s.choiceGrid}>

          <div className={s.choiceCard}>
            <div className={s.choiceLabel}>
              Database
            </div>

            <div className={s.choiceValue}>
              {report.databaseChoice.choice}
            </div>

            <div className={s.choiceReason}>
              {report.databaseChoice.reason}
            </div>
          </div>

          <div className={s.choiceCard}>
            <div className={s.choiceLabel}>
              Caching
            </div>

            <div className={s.choiceValue}>
              {report.cachingChoice.choice}
            </div>

            <div className={s.choiceReason}>
              {report.cachingChoice.reason}
            </div>
          </div>

          <div className={s.choiceCard}>
            <div className={s.choiceLabel}>
              Messaging
            </div>

            <div className={s.choiceValue}>
              {report.messagingChoice.choice}
            </div>

            <div className={s.choiceReason}>
              {report.messagingChoice.reason}
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          SCALING
          ===================================================== */}

      <section className={s.section}>
        <h2 className={s.sectionTitle}>
          <i
            className="ti ti-trending-up"
            aria-hidden="true"
          />
          Scaling Strategies
        </h2>

        <ul className={s.list}>
          {report.scalingStrategies.map((sc, i) => (
            <li key={i}>{sc}</li>
          ))}
        </ul>
      </section>

      {/* =====================================================
          API
          ===================================================== */}

      <section className={s.section}>
        <h2 className={s.sectionTitle}>
          <i
            className="ti ti-api"
            aria-hidden="true"
          />
          API Highlights
        </h2>

        <ul className={s.list}>
          {report.apiHighlights.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </section>

      {/* =====================================================
          LIKELY QUESTIONS
          ===================================================== */}

      <section className={s.section}>
        <h2 className={s.sectionTitle}>
          <i
            className="ti ti-message-question"
            aria-hidden="true"
          />
          Likely Questions
        </h2>

        {report.likelyQuestions.map((qa, i) => (
          <article
            key={i}
            className={s.qaCard}
          >
            <h3 className={s.qaQ}>
              {qa.question}
            </h3>

            <p className={s.qaA}>
              {qa.answer}
            </p>
          </article>
        ))}
      </section>

      {/* =====================================================
          FINAL TAKEAWAYS
          ===================================================== */}

      <section className={s.section}>
        <h2 className={s.sectionTitle}>
          <i
            className="ti ti-star"
            aria-hidden="true"
          />
          Final Takeaways
        </h2>

        <div className={s.takeawaysCard}>
          <ul className={s.list}>
            {report.finalTakeaways.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

    </main>
  )
}