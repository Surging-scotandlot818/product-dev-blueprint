import Link from "next/link";

const ARTIFACTS = [
  { title: "Executive summary", body: "One-page business case, audience, and outcomes." },
  { title: "Product requirements (PRD)", body: "Goals, personas, features, acceptance criteria." },
  { title: "Statement of work (SOW)", body: "Scope, deliverables, milestones, measurable tasks." },
  { title: "Technical design spec", body: "Stack, contracts, rollout, monitoring, recovery." },
  { title: "ADR pack", body: "Decisions with context, alternatives, and consequences." },
  { title: "Requirements traceability matrix", body: "Every requirement linked to design and tests." },
  { title: "Test strategy", body: "Coverage targets, scenarios, acceptance gates." },
  { title: "Launch & operations plan", body: "SLOs, runbook, rollback, on-call posture." },
  { title: "Marketing & GTM brief", body: "Positioning, pricing, segments, launch geography." },
  { title: "Data & interface spec", body: "Entities, integrations, retention, residency." },
];

const DOMAINS = [
  ["Problem framing", "What's the problem, for whom, why now, what does success look like."],
  ["Market & customer", "Buyers, end users, alternatives, differentiation, pricing."],
  ["Experience surface", "Web, internal console, mobile, kiosk, partner portal — and how users wait or schedule."],
  ["Functional requirements", "Personas, requirements with acceptance criteria, edge cases."],
  ["Quality attributes", "Availability, RTO/RPO, performance, privacy, SLOs."],
  ["Data & integrations", "Entities, sensitive data, integrations, build vs. buy."],
  ["Commercial model", "Packaging, segments, sales motion, launch geography."],
  ["Delivery & governance", "Owners, approvers, dependencies, decision confidence."],
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <section className="pt-16 pb-12 lg:pt-24 lg:pb-20">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-accent-700 bg-accent-50 border border-accent-200 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
            Schema-first product definition
          </span>
          <h1 className="mt-5 text-4xl lg:text-5xl font-semibold tracking-tight text-ink-900 leading-[1.1]">
            From idea to a complete, reviewable, implementation-ready package.
          </h1>
          <p className="mt-5 text-lg text-ink-700 leading-relaxed">
            Most teams scatter PRDs, SOWs, technical specs, and GTM briefs across separate tools — and they drift.
            Product Dev Blueprint runs a guided, role-aware intake, builds one canonical project schema, and renders every
            artifact from that single source of truth.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/projects/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-ink-900 text-white text-sm font-medium hover:bg-ink-800"
            >
              Start a new project
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-ink-300 bg-white text-ink-800 text-sm font-medium hover:bg-ink-50"
            >
              See your projects
            </Link>
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-10 lg:gap-16 py-12">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Eight intake domains, one canonical schema</h2>
          <p className="mt-3 text-ink-700 leading-relaxed">
            Answer once. Every artifact updates consistently from the same project object — change the recovery target or
            launch geography and the PRD, SOW, technical spec, and marketing brief all reflect it.
          </p>
          <ul className="mt-6 space-y-3">
            {DOMAINS.map(([title, body]) => (
              <li key={title} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0" />
                <div>
                  <div className="text-sm font-medium text-ink-900">{title}</div>
                  <div className="text-sm text-ink-600">{body}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Generate the full bundle</h2>
          <p className="mt-3 text-ink-700 leading-relaxed">
            Stable IDs flow across documents — every requirement traces backward to a stakeholder need and forward to design,
            tests, and verification.
          </p>
          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            {ARTIFACTS.map((a) => (
              <div key={a.title} className="border border-ink-200 bg-white rounded-lg p-4">
                <div className="text-sm font-medium text-ink-900">{a.title}</div>
                <div className="text-xs text-ink-600 mt-1 leading-relaxed">{a.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="border border-ink-200 bg-white rounded-2xl p-8 lg:p-12">
          <h2 className="text-2xl font-semibold tracking-tight max-w-2xl">
            Built for cross-functional teams, with traceability and review baked in.
          </h2>
          <div className="mt-8 grid lg:grid-cols-3 gap-6">
            <div>
              <div className="text-sm font-medium text-ink-900">Role-aware intake</div>
              <p className="mt-1.5 text-sm text-ink-600 leading-relaxed">
                PM, architect, designer, ops, and commercial perspectives in one flow. Conditional questions branch by surface
                and vertical.
              </p>
            </div>
            <div>
              <div className="text-sm font-medium text-ink-900">Stable IDs, end to end</div>
              <p className="mt-1.5 text-sm text-ink-600 leading-relaxed">
                Requirements, ADRs, risks, and tests get IDs at creation and keep them across every generated document.
              </p>
            </div>
            <div>
              <div className="text-sm font-medium text-ink-900">Drafts, not decisions</div>
              <p className="mt-1.5 text-sm text-ink-600 leading-relaxed">
                Generated bundles surface what's user-entered vs. inferred, with assumptions and unresolved questions
                pinned for human approval before export.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
