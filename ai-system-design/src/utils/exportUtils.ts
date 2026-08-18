import type { ArchitectureReport, InterviewReport, RevisionReport } from '../types/report'
import type { CompareReport, CustomReport } from '../types/phase4'

export function downloadMarkdown(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename.endsWith('.md') ? filename : `${filename}.md`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text)
}

export function architectureToMarkdown(r: ArchitectureReport): string {
  return `# ${r.product} — System Design Report\n\n> ${r.tagline}\n\n## Overview\n\n${r.overview}\n\n## Functional Requirements\n\n${r.functionalRequirements.map(x => `- ${x}`).join('\n')}\n\n## Non-Functional Requirements\n\n${r.nonFunctionalRequirements.map(x => `- ${x}`).join('\n')}\n\n## Services\n\n${r.services.map(s => `### ${s.name} \`${s.type}\`\n${s.responsibility}\n**Stack:** ${s.techStack}`).join('\n\n')}\n\n## Infrastructure\n\n${r.infrastructure}\n`
}

export function interviewToMarkdown(r: InterviewReport): string {
  return `# ${r.product} — ${r.level} Interview Prep\n\n## Focus Areas\n\n${r.focusAreas.map(f => `- ${f}`).join('\n')}\n\n## Questions\n\n${r.questions.map((q, i) => `### Q${i + 1} [${q.difficulty}] ${q.category}\n\n**${q.question}**\n\n**Answer Framework:**\n${q.answerFramework.map(a => `- ${a}`).join('\n')}\n\n**Follow-ups:**\n${q.followUps.map(f => `- ${f}`).join('\n')}`).join('\n\n')}\n\n## Tradeoff Questions\n\n${r.tradeoffQuestions.map(t => `**${t.question}**\n${t.framework}`).join('\n\n')}\n\n## Common Mistakes\n\n${r.commonMistakes.map(m => `- ${m}`).join('\n')}\n`
}

export function revisionToMarkdown(r: RevisionReport): string {
  return `# ${r.product} — ${r.duration}-Min Revision\n\n> ${r.oneLiner}\n\n## Core Decisions\n\n${r.coreDecisions.map(d => `- ${d}`).join('\n')}\n\n## Key Services\n\n${r.keyServices.map(s => `- **${s.name}** — ${s.note}`).join('\n')}\n\n## Storage Choices\n\n- **DB:** ${r.databaseChoice.choice} — ${r.databaseChoice.reason}\n- **Cache:** ${r.cachingChoice.choice} — ${r.cachingChoice.reason}\n- **Messaging:** ${r.messagingChoice.choice} — ${r.messagingChoice.reason}\n\n## Scaling\n\n${r.scalingStrategies.map(s => `- ${s}`).join('\n')}\n\n## Likely Questions\n\n${r.likelyQuestions.map(q => `**${q.question}**\n${q.answer}`).join('\n\n')}\n\n## Takeaways\n\n${r.finalTakeaways.map(t => `- ${t}`).join('\n')}\n`
}

export function compareToMarkdown(r: CompareReport): string {
  const [a, b] = r.items
  return `# ${r.itemA} vs ${r.itemB}\n\n> ${r.summary}\n\n## ${r.itemA}\n\n**Advantages:**\n${a.advantages.map(x => `- ${x}`).join('\n')}\n\n**Disadvantages:**\n${a.disadvantages.map(x => `- ${x}`).join('\n')}\n\n## ${r.itemB}\n\n**Advantages:**\n${b.advantages.map(x => `- ${x}`).join('\n')}\n\n**Disadvantages:**\n${b.disadvantages.map(x => `- ${x}`).join('\n')}\n\n## Decision Matrix\n\n| Criterion | ${r.itemA} | ${r.itemB} | Winner |\n|-----------|---|---|---|\n${r.decisionMatrix.map(row => `| ${row.criterion} | ${row.itemA} | ${row.itemB} | **${row.winner}** |`).join('\n')}\n\n## Verdict\n\n${r.verdict}\n`
}

export function customToMarkdown(r: CustomReport): string {
  return `# ${r.systemName}\n\n> ${r.oneLiner}\n\n## Requirements\n\n**Functional:**\n${r.functionalRequirements.map(x => `- ${x}`).join('\n')}\n\n**Non-Functional:**\n${r.nonFunctionalRequirements.map(x => `- ${x}`).join('\n')}\n\n## Services\n\n${r.services.map(s => `### ${s.name}\n${s.responsibility}\n**Stack:** ${s.techStack}`).join('\n\n')}\n\n## Architecture Decisions\n\n- **Database:** ${r.databaseDesign}\n- **Caching:** ${r.cachingStrategy}\n- **Messaging:** ${r.messagingStrategy}\n- **API:** ${r.apiDesign}\n- **Scaling:** ${r.scalingStrategy}\n\n## Estimation\n\n| Metric | Value |\n|--------|-------|\n| Users | ${r.estimate.users} |\n| Requests/Day | ${r.estimate.requestsPerDay} |\n| Storage | ${r.estimate.storageGB} |\n| Cost | ${r.estimate.costEstimate} |\n\n## Tradeoffs\n\n${r.tradeoffs.map(t => `**${t.decision}**\n${t.rationale}`).join('\n\n')}\n\n## Interview Angles\n\n${r.interviewAngles.map(a => `- ${a}`).join('\n')}\n`
}
