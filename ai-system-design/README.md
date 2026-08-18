# AI System Design Explorer

A Staff Engineer-level system design exploration platform. Type any product name (Uber, Netflix, WhatsApp) and get a complete architecture breakdown.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up your API key
cp .env.example .env.local
# Edit .env.local and add your Groq API key

# 3. Run the dev server
npm run dev

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx         — Left navigation + history panel
│   │   └── TopBar.tsx          — Search bar + quick chips
│   ├── explorer/
│   │   ├── ArchitectureReport.tsx  — Architecture report renderer
│   │   ├── ServiceCard.tsx         — Individual service card
│   │   ├── EmptyState.tsx          — Initial empty screen
│   │   └── LoadingState.tsx        — Loading animation
│   ├── tabs/
│   │   ├── DeepExplorer.tsx    — Deep system design exploration
│   │   ├── TabBar.tsx          — Deep-dive navigation
│   │   └── ...                 — Database, caching, API, scaling, etc.
│   ├── interview/              — Interview Mode
│   ├── revision/               — Revision Mode
│   ├── compare/                — Compare Mode
│   ├── custom/                 — Custom Design Mode
│   ├── history/                — History dashboard
│   ├── saved/                  — Saved reports
│   ├── settings/               — Application settings
│   └── ui/                     — Shared UI components
├── hooks/
│   ├── useClaudeAPI.ts         — AI API call wrapper
│   ├── useGeminiCall.ts        — Deep exploration API calls
│   ├── useHistory.ts           — localStorage history manager
│   ├── useSavedReports.ts      — Saved reports manager
│   ├── useSettings.ts          — Settings manager
│   └── useTabCache.ts          — Deep Explorer tab cache
├── prompts/
│   ├── architecturePrompt.ts   — Architecture system prompt
│   └── tabPrompts.ts           — Deep-dive tab prompts
├── types/
│   ├── report.ts               — Architecture and tab interfaces
│   └── phase4.ts               — Compare and Custom mode types
├── utils/
│   └── exportUtils.ts          — Markdown export utilities
├── styles/
│   └── globals.css             — Design system + CSS variables
└── App.tsx                     — Root component + navigation
```

## Phases

- **Phase 1** (current): Architecture Explorer — overview, requirements, services, infrastructure
- **Phase 2**: 10 deep-dive tabs — Database, Caching, Kafka, APIs, Real-Time, Scaling, Security, Failures, Engineering Decisions
- **Phase 3**: Interview Mode + Revision Mode
- **Phase 4**: Compare Systems + Custom Design Mode
- **Phase 5**: History dashboard, export to Markdown, settings

## Tech Stack

- React 18 + TypeScript
- Vite 5
- CSS Modules (zero runtime CSS-in-JS)
- Groq API
- localStorage for history and saved reports
- Tabler Icons
