import { Project } from "../schema";
import { fallback, header, inferCornerCases } from "./util";

export function generateTestStrategy(p: Project): string {
  const corners = inferCornerCases(p);
  const out: string[] = [
    header(p, `Test strategy — ${p.name || "Untitled"}`, "Test strategy"),
    `## 1. Approach`,
    ``,
    `Verification is requirement-anchored: every requirement ID has at least one acceptance scenario, and every SLO has at least one synthetic or load check.`,
    ``,
    `## 2. Coverage targets`,
    ``,
    `- All **must** requirements: 100% acceptance-scenario coverage before launch.`,
    `- All **should** requirements: covered or explicitly waived by the owner.`,
    `- Critical user journeys: end-to-end automated coverage.`,
    `- Accessibility: keyboard-only and screen-reader passes against ${p.experience.accessibility || "WCAG 2.2 AA"}.`,
    ``,
    `## 3. Acceptance scenarios by requirement`,
    ``,
  ];

  if (p.functional.requirements.length === 0) {
    out.push(`_No requirements yet — populate the PRD requirements section to generate scenarios._`, "");
  } else {
    p.functional.requirements.forEach((r) => {
      out.push(
        `### ${r.id} — ${r.title || "Untitled"}`,
        ``,
        `**Acceptance.** ${fallback(r.acceptance, "Capture concise, testable conditions in the PRD.")}`,
        ``,
      );
    });
  }

  out.push(`## 4. SLO verification`, ``);
  if (p.nonfunctional.slos.length === 0) {
    out.push(`_No SLOs captured. Define per-surface SLOs to ground performance and availability checks._`, "");
  } else {
    p.nonfunctional.slos.forEach((s) => {
      out.push(`- **${s.id}** Verify ${s.metric} on ${s.surface} meets ${s.target} via load + synthetic probes.`);
    });
    out.push("");
  }

  out.push(`## 5. Edge cases and corner cases`, ``);
  out.push(corners.map((c) => `- ${c}`).join("\n"));
  out.push("");

  out.push(
    `## 6. Quality gates`,
    ``,
    `- No unresolved **must** requirement.`,
    `- No open **high impact / high likelihood** risks without an accepted mitigation.`,
    `- All SLOs green on staging soak prior to general availability.`,
  );

  return out.join("\n");
}
