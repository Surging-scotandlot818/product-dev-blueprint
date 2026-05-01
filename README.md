# Product Dev Blueprint

A schema-first product-definition system. Run a guided, role-aware intake, build one canonical project schema, and render a complete artifact bundle from that single source of truth.

## What it produces

Every project generates a draft bundle of:

| # | Artifact | Description |
|---|---|---|
| 01 | Executive summary | One-page business case, audience, success criteria |
| 02 | PRD | Goals, personas, requirements with acceptance criteria |
| 03 | SOW | Scope, deliverables, milestones, acceptance |
| 04 | Technical design spec | Stack, contracts, rollout, monitoring, recovery |
| 05 | ADR pack | Decisions with context, alternatives, consequences |
| 06 | Data & interface spec | Entities, integrations, retention, residency |
| 07 | Requirements traceability matrix | Each requirement linked to design and tests |
| 08 | Test strategy | Coverage targets, scenarios, acceptance gates |
| 09 | Launch & operations plan | SLOs, runbook, rollback, on-call posture |
| 10 | Marketing & GTM brief | Positioning, segments, pricing, launch geography |
| 11 | Risk register & governance | Risks, assumptions, open questions, compliance packs |

Stable IDs (`FR-001`, `NFR-001`, `ADR-001`, `RISK-001`, `ASM-001`, `Q-001`, `INT-001`, `ENT-001`, `SLO-001`) are assigned at creation and persist across every document.

## How it works

1. **Guided intake** — eight role-aware domains (problem, market, experience, functional, quality attributes, data & tech, commercial, governance) with conditional questions, autosave, and progress tracking.
2. **Canonical schema** — every answer writes to one `Project` object (see [`src/lib/schema.ts`](src/lib/schema.ts)).
3. **Schema-first generation** — deterministic generators (under [`src/lib/generators/`](src/lib/generators)) read from the schema and render markdown. Change one answer and every relevant document updates consistently.
4. **Bundle export** — download all artifacts plus the raw `project.json` as a single zip.

The platform infers context-specific corner cases (e.g. virtual-queue UX cases when the timing model is real-time) and activates compliance packs (PIPEDA, HIPAA, PHIPA, OSFI, PCI DSS, GDPR, OWASP ASVS, OWASP LLM Top 10, NIST AI RMF) by vertical and geography.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Zustand with `localStorage` persistence (single-user demo — no backend required)
- `react-markdown` + `remark-gfm` for rendering, `jszip` for bundle export

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run typecheck
```

## Project structure

```
src/
  app/
    page.tsx                          # Landing
    projects/
      page.tsx                        # Dashboard
      new/page.tsx                    # Create
      [id]/page.tsx                   # Overview
      [id]/intake/page.tsx            # Wizard
      [id]/artifacts/page.tsx         # Generated docs + export
  components/
    ui.tsx                            # Buttons, inputs, cards, badges
    wizard/
      WizardShell.tsx                 # Step navigation + progress
      steps.tsx                       # All eight domain forms
  lib/
    schema.ts                         # Canonical Project type
    store.ts                          # Zustand store
    ids.ts                            # Stable ID allocation
    export.ts                         # Zip bundle download
    generators/                       # Markdown renderers per artifact
```

## Notes

Generated documents are **drafts**. Human review is mandatory for high-consequence outputs — the platform surfaces what was user-entered vs. what was inferred, with assumptions and unresolved questions pinned for approval before export.

This is an MVP of a much larger vision documented in [`deep-research-report.md`](deep-research-report.md). Future layers in that report include collaboration workflows, an LLM orchestration layer with structured outputs and prompt caching, repository-grade exports, sector-specific compliance packs, and traceability across review and approvals.
