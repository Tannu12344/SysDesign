# AI System Design Explorer

A Staff Engineer-level system design exploration platform. Type any product name (Uber, Netflix, WhatsApp) and get a complete architecture breakdown.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up your API key
cp .env.example .env.local
# Edit .env.local and add your Anthropic API key

# 3. Run the dev server
npm run dev
```

Open http://localhost:5173

## Getting an API Key

1. Go to https://console.anthropic.com/
2. Create an account (free tier available)
3. Generate an API key
4. Add it to `.env.local` as `VITE_ANTHROPIC_API_KEY`

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx         — Left nav + history panel
│   │   └── TopBar.tsx          — Search bar + quick chips
│   ├── explorer/
│   │   ├── ArchitectureReport.tsx  — Full report renderer
│   │   ├── ServiceCard.tsx         — Individual service card
│   │   ├── EmptyState.tsx          — Initial empty screen
│   │   └── LoadingState.tsx        — Loading animation
│   └── ui/
│       ├── ErrorBanner.tsx     — Error display with retry
│       └── PlaceholderPage.tsx — Coming-soon pages
├── hooks/
│   ├── useClaudeAPI.ts         — Claude API call wrapper
│   └── useHistory.ts           — localStorage history manager
├── prompts/
│   └── architecturePrompt.ts   — System prompt + product list
├── types/
│   └── report.ts               — TypeScript interfaces
├── styles/
│   └── globals.css             — Design system + CSS variables
└── App.tsx                     — Root component + routing
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
- Claude claude-sonnet-4-20250514 via Anthropic API
- localStorage for history persistence
