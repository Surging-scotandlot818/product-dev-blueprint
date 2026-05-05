import Link from "next/link";

const WORKFLOW = [
  {
    n: "01",
    owner: "PM",
    title: "Frame the product bet",
    body: "Problem, target user, alternatives, buyer, success metrics, pricing, and scope boundaries.",
  },
  {
    n: "02",
    owner: "PM + Architect",
    title: "Score what matters",
    body: "Impact, effort, confidence, risk, evidence quality, compliance triggers, and delivery complexity.",
  },
  {
    n: "03",
    owner: "Architect",
    title: "Design the build path",
    body: "HLD, LLD, schema, APIs, auth, integrations, infra, observability, test strategy, and rollout gates.",
  },
  {
    n: "04",
    owner: "Engineering",
    title: "Package the handoff",
    body: "Implementation slices, acceptance criteria, risk register, validation plan, and coding-agent prompts.",
  },
];

const SCORECARD = [
  { label: "Customer evidence", value: "Medium", pct: "58%", color: "bg-amber-500" },
  { label: "MVP clarity", value: "Strong", pct: "82%", color: "bg-emerald-500" },
  { label: "Technical risk", value: "Needs review", pct: "44%", color: "bg-red-500" },
  { label: "Enterprise readiness", value: "Planned", pct: "68%", color: "bg-accent-500" },
];

const SCENARIO_LANES = [
  "Market timing",
  "Buyer urgency",
  "User workflow",
  "Data sensitivity",
  "OAuth / SSO",
  "Schema design",
  "LLD boundaries",
  "Failure modes",
  "Cost and scale",
  "Compliance",
  "Observability",
  "Release gates",
];

const OUTPUT_GROUPS = [
  {
    title: "Decision brief",
    owner: "Product Manager",
    items: ["Readiness score", "Critical unknowns", "Validation experiments", "Go / no-go recommendation"],
  },
  {
    title: "Product definition",
    owner: "Product Manager",
    items: ["PRD", "Personas", "User stories", "MVP scope", "KPIs"],
  },
  {
    title: "Technical blueprint",
    owner: "Solution Architect",
    items: ["HLD", "LLD", "Schema model", "API contracts", "Security posture"],
  },
  {
    title: "Build package",
    owner: "Engineering",
    items: ["Implementation slices", "Test plan", "Risk register", "Coding-agent prompts"],
  },
];

const REVIEW_COLUMNS = [
  {
    title: "PM questions",
    body: "Clarify why this should exist, who will use it, which market signals matter, and what validates the MVP.",
  },
  {
    title: "Architect questions",
    body: "Clarify data model, integration contracts, identity, tenancy, scaling, security, and operational requirements.",
  },
  {
    title: "Developer handoff",
    body: "Turn the answers into traceable artifacts that Cursor, Codex, or an engineering team can execute from.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="border-b border-ink-200 dark:border-ink-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 lg:py-16">
          <div className="grid min-w-0 lg:grid-cols-[0.78fr_1.22fr] gap-8 lg:gap-10 items-stretch">
            <div className="min-w-0 flex flex-col justify-between rounded-lg border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 p-5 sm:p-7">
              <div>
                <span className="inline-flex items-center text-xs font-medium text-accent-700 dark:text-accent-200 bg-accent-50 dark:bg-accent-900/30 border border-accent-200 dark:border-accent-700/40 px-2.5 py-1 rounded-full">
                  Product discovery to build handoff
                </span>
                <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink-900 dark:text-ink-50 leading-[1.03] break-words">
                  Product Dev Blueprint
                </h1>
                <p className="mt-4 text-base sm:text-lg text-ink-700 dark:text-ink-300 leading-relaxed break-words">
                  Pressure-test an idea, separate product and architecture ownership, and generate a build-ready
                  plan before engineering starts writing code.
                </p>
              </div>
              <div className="mt-7 flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <Link
                  href="/projects/new"
                  className="inline-flex w-full sm:w-auto justify-center items-center px-5 py-2.5 rounded-md bg-ink-900 text-white text-sm font-medium hover:bg-ink-800 dark:bg-ink-50 dark:text-ink-900 dark:hover:bg-white"
                >
                  Start blueprint
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex w-full sm:w-auto justify-center items-center px-5 py-2.5 rounded-md border border-ink-300 bg-white text-ink-800 text-sm font-medium hover:bg-ink-50 dark:bg-ink-900 dark:border-ink-700 dark:text-ink-100 dark:hover:bg-ink-800"
                >
                  Open projects
                </Link>
              </div>
              <div className="mt-7 grid grid-cols-3 gap-2 text-xs text-ink-600 dark:text-ink-400">
                <div className="rounded-md border border-ink-200 dark:border-ink-800 p-2">
                  <div className="font-semibold text-ink-900 dark:text-ink-50">PM</div>
                  <div>Market and scope</div>
                </div>
                <div className="rounded-md border border-ink-200 dark:border-ink-800 p-2">
                  <div className="font-semibold text-ink-900 dark:text-ink-50">SA</div>
                  <div>HLD and LLD</div>
                </div>
                <div className="rounded-md border border-ink-200 dark:border-ink-800 p-2">
                  <div className="font-semibold text-ink-900 dark:text-ink-50">Dev</div>
                  <div>Build package</div>
                </div>
              </div>
            </div>

            <div className="min-w-0 rounded-lg border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 overflow-hidden">
              <div className="border-b border-ink-200 dark:border-ink-800 px-4 sm:px-5 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <div className="text-xs uppercase tracking-wider text-ink-500 dark:text-ink-400">
                    Readiness workspace
                  </div>
                  <div className="text-sm font-semibold text-ink-900 dark:text-ink-50">
                    AI support agent - enterprise RAG
                  </div>
                </div>
                <div className="text-xs rounded-full border border-emerald-200 dark:border-emerald-700/50 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 text-emerald-700 dark:text-emerald-200">
                  4 output bundles
                </div>
              </div>

              <div className="grid min-w-0 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="border-b lg:border-b-0 lg:border-r border-ink-200 dark:border-ink-800 p-4 sm:p-5">
                  <div className="text-sm font-semibold text-ink-900 dark:text-ink-50">Decision scorecard</div>
                  <div className="mt-4 space-y-4">
                    {SCORECARD.map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between gap-3 text-xs">
                          <span className="text-ink-600 dark:text-ink-400">{item.label}</span>
                          <span className="font-medium text-ink-900 dark:text-ink-100">{item.value}</span>
                        </div>
                        <div className="mt-1.5 h-1.5 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden">
                          <div className={`h-full rounded-full ${item.color}`} style={{ width: item.pct }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-md border border-amber-200 dark:border-amber-700/40 bg-amber-50 dark:bg-amber-900/20 p-3">
                    <div className="text-xs font-semibold text-amber-900 dark:text-amber-100">Next decision</div>
                    <p className="mt-1 text-xs leading-relaxed text-amber-900/80 dark:text-amber-100/80">
                      Validate support deflection with a constrained eval set before expanding integrations.
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="text-sm font-semibold text-ink-900 dark:text-ink-50">Scenario coverage</div>
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SCENARIO_LANES.map((lane) => (
                      <span
                        key={lane}
                        className="rounded-md border border-ink-200 dark:border-ink-800 bg-ink-50 dark:bg-ink-950 px-2.5 py-2 text-xs text-ink-700 dark:text-ink-300 break-words"
                      >
                        {lane}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 border border-ink-200 dark:border-ink-800 rounded-md overflow-hidden">
                    {OUTPUT_GROUPS.map((group) => (
                      <div
                        key={group.title}
                        className="border-b last:border-b-0 border-ink-200 dark:border-ink-800 p-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <div className="text-sm font-semibold text-ink-900 dark:text-ink-50">{group.title}</div>
                          <div className="text-[11px] uppercase tracking-wider text-ink-500 dark:text-ink-400">
                            {group.owner}
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {group.items.map((item) => (
                            <span
                              key={item}
                              className="rounded border border-ink-200 dark:border-ink-800 px-2 py-0.5 text-[11px] text-ink-600 dark:text-ink-400"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-ink-200 dark:border-ink-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink-900 dark:text-ink-50">
              Built around decisions, not document count.
            </h2>
            <p className="mt-3 text-ink-700 dark:text-ink-300 leading-relaxed">
              The default output is a focused readiness report. Supporting artifacts are grouped by the decision they
              help answer, so developers are not handed a pile of disconnected documents.
            </p>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {OUTPUT_GROUPS.map((group) => (
              <div key={group.title} className="border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 rounded-lg p-5">
                <div className="text-[11px] uppercase tracking-wider text-accent-600 dark:text-accent-300">
                  {group.owner}
                </div>
                <div className="mt-2 text-base font-semibold text-ink-900 dark:text-ink-50">{group.title}</div>
                <ul className="mt-3 space-y-1.5 text-sm text-ink-600 dark:text-ink-400">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-ink-200 dark:border-ink-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-8 lg:gap-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink-900 dark:text-ink-50">
                Clear ownership during intake.
              </h2>
              <p className="mt-3 text-ink-700 dark:text-ink-300 leading-relaxed">
                Product and architecture questions stay separate enough for the right person to answer, while the final
                blueprint stays connected through shared IDs and acceptance criteria.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {REVIEW_COLUMNS.map((column) => (
                <div key={column.title} className="rounded-lg border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 p-4">
                  <div className="text-sm font-semibold text-ink-900 dark:text-ink-50">{column.title}</div>
                  <p className="mt-2 text-sm text-ink-600 dark:text-ink-400 leading-relaxed">{column.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WORKFLOW.map((step) => (
              <div key={step.n} className="border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 rounded-lg p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs font-mono text-accent-600 dark:text-accent-300">{step.n}</div>
                  <div className="text-[11px] uppercase tracking-wider text-ink-500 dark:text-ink-400">{step.owner}</div>
                </div>
                <div className="mt-2 text-base font-semibold text-ink-900 dark:text-ink-50">{step.title}</div>
                <p className="mt-1.5 text-sm text-ink-600 dark:text-ink-400 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <div className="border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 rounded-lg p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink-900 dark:text-ink-50">
                  Start with a template or a blank idea.
                </h2>
                <p className="mt-3 text-ink-700 dark:text-ink-300 max-w-2xl">
                  Pick a realistic scenario, review PM and architect questions, then generate the readiness blueprint.
                </p>
              </div>
              <Link
                href="/projects/new"
                className="inline-flex w-full sm:w-auto justify-center items-center px-5 py-2.5 rounded-md bg-ink-900 text-white text-sm font-medium hover:bg-ink-800 dark:bg-ink-50 dark:text-ink-900 dark:hover:bg-white"
              >
                Choose starting point
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
