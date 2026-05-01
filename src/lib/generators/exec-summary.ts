import { Project } from "../schema";
import { header, fallback, fmtDate } from "./util";

export function generateExecSummary(p: Project): string {
  const parts = [
    header(p, `Executive summary — ${p.name || "Untitled project"}`, "Executive summary"),

    `## One-liner`,
    ``,
    p.oneLiner ? p.oneLiner : "_No one-liner captured._",
    ``,
    `## Why now`,
    ``,
    fallback(p.problem.whyNow, "Capture what changed in the market or environment that makes this urgent."),
    ``,
    `## Audience`,
    ``,
    fallback(p.problem.audience),
    ``,
    `## What success looks like`,
    ``,
    fallback(p.problem.successCriteria),
    ``,
    `## Business case`,
    ``,
    fallback(p.problem.businessCase),
    ``,
    `## Out of scope`,
    ``,
    fallback(p.problem.outOfScope, "No exclusions captured yet — be explicit before approval."),
    ``,
    `## Priority`,
    ``,
    `**${p.problem.priority}** — confidence: **${p.governance.decisionConfidence}**`,
    ``,
    `## Key stakeholders`,
    ``,
    p.stakeholders.length === 0
      ? "_No stakeholders captured yet._"
      : p.stakeholders
          .map((s) => `- **${s.role}**${s.name ? ` — ${s.name}` : ""}: ${s.responsibility || "_responsibility TBD_"}`)
          .join("\n"),
    ``,
    `---`,
    ``,
    `_Generated ${fmtDate(p.updatedAt)} from project schema. This document is a draft. Approval required before publication._`,
  ];
  return parts.join("\n");
}
