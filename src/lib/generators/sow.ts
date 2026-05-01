import { Project } from "../schema";
import { fallback, header } from "./util";

export function generateSOW(p: Project): string {
  const fr = p.functional.requirements.filter((r) => r.kind === "functional");
  const out: string[] = [
    header(p, `Statement of work — ${p.name || "Untitled"}`, "SOW"),
    `## 1. Engagement summary`,
    ``,
    fallback(p.oneLiner),
    ``,
    `## 2. Scope`,
    ``,
    `### In scope`,
    ``,
    fr.length === 0
      ? "_No functional scope captured yet — populate the PRD requirements section._"
      : fr.map((r) => `- ${r.id} — ${r.title || "Untitled"} _(priority: ${r.priority})_`).join("\n"),
    ``,
    `### Out of scope`,
    ``,
    fallback(p.problem.outOfScope, "Be explicit about exclusions before this SOW is signed."),
    ``,
    `## 3. Deliverables`,
    ``,
    `1. Working software meeting all **must** and **should** requirements above.`,
    `2. Architecture decision record pack covering all major design choices.`,
    `3. Requirements traceability matrix linking requirements → design → tests.`,
    `4. Test strategy and acceptance criteria evidence.`,
    `5. Launch and operations plan including SLOs, runbook, and rollback.`,
    `6. Marketing or commercialization brief (if external-facing).`,
    ``,
    `## 4. Milestones`,
    ``,
    `Milestones are sized by the team during planning. The minimum gates are:`,
    ``,
    `- **M1 — Discovery sign-off.** Schema-complete intake; assumptions and risks reviewed.`,
    `- **M2 — Design sign-off.** ADRs accepted; data and interface spec reviewed; SLOs agreed.`,
    `- **M3 — Build complete.** All **must** requirements pass acceptance criteria in staging.`,
    `- **M4 — Launch readiness.** Runbook, on-call, rollback rehearsed; compliance gating cleared.`,
    `- **M5 — Launch and stabilization.** SLO attainment monitored against error budgets.`,
    ``,
    `## 5. Acceptance`,
    ``,
    `Each requirement is accepted when its acceptance criteria pass in the agreed environment with sign-off from the owner and approvers below.`,
    ``,
    `- **Owner.** ${fallback(p.governance.owner)}`,
    `- **Approvers.** ${fallback(p.governance.approvers)}`,
    ``,
    `## 6. Assumptions`,
    ``,
    p.assumptions.length === 0
      ? fallback(p.governance.unvalidatedAssumptions)
      : p.assumptions.map((a) => `- **${a.id}** ${a.text} ${a.validated ? "✅" : "⚠️"}`).join("\n"),
    ``,
    `## 7. Dependencies and third parties`,
    ``,
    `- **Dependencies.** ${fallback(p.governance.dependencies)}`,
    `- **Third parties.** ${fallback(p.governance.thirdParties)}`,
    `- **Legal review.** ${fallback(p.governance.legalReviews)}`,
    `- **Procurement review.** ${fallback(p.governance.procurementReviews)}`,
    ``,
    `## 8. Commercial and compliance gating`,
    ``,
    `- **Packaging.** ${p.gtm.packaging}`,
    `- **Launch geography.** ${fallback(p.gtm.launchGeography)}`,
    `- **Compliance gating.** ${fallback(p.gtm.complianceGating)}`,
    ``,
    `## 9. Risks`,
    ``,
    p.risks.length === 0
      ? "_No risks captured yet._"
      : p.risks
          .map(
            (r) =>
              `- **${r.id}** ${fallback(r.description)} _(L: ${r.likelihood}, I: ${r.impact})._ Mitigation: ${fallback(r.mitigation)}`,
          )
          .join("\n"),
    ``,
  ];

  return out.join("\n");
}
