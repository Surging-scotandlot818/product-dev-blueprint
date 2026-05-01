import { Project } from "../schema";
import { fallback, header, inferCompliancePacks } from "./util";

export function generateRiskRegister(p: Project): string {
  const packs = inferCompliancePacks(p);
  const out: string[] = [
    header(p, `Risk register and governance — ${p.name || "Untitled"}`, "Risk register"),
    `## 1. Risks`,
    ``,
  ];

  if (p.risks.length === 0) {
    out.push("_No risks captured yet._", "");
  } else {
    out.push(`| ID | Description | Likelihood | Impact | Mitigation |`);
    out.push(`|---|---|---|---|---|`);
    p.risks.forEach((r) => {
      out.push(
        `| ${r.id} | ${r.description || "_TBD_"} | ${r.likelihood} | ${r.impact} | ${r.mitigation || "_TBD_"} |`,
      );
    });
    out.push("");
  }

  out.push(`## 2. Assumptions`, ``);
  if (p.assumptions.length === 0) {
    out.push("_None captured._", "");
  } else {
    p.assumptions.forEach((a) => {
      out.push(`- **${a.id}** ${a.text} ${a.validated ? "✅ validated" : "⚠️ unvalidated"}`);
    });
    out.push("");
  }

  out.push(`## 3. Open questions`, ``);
  if (p.openQuestions.length === 0) {
    out.push("_None captured._", "");
  } else {
    p.openQuestions.forEach((q) => out.push(`- **${q.id}** ${q.text}${q.owner ? ` _(owner: ${q.owner})_` : ""}`));
    out.push("");
  }

  out.push(
    `## 4. Compliance packs activated for this project`,
    ``,
    packs.map((c) => `- ${c}`).join("\n"),
    ``,
    `## 5. Governance`,
    ``,
    `- **Owner.** ${fallback(p.governance.owner)}`,
    `- **Approvers.** ${fallback(p.governance.approvers)}`,
    `- **Decision confidence.** ${p.governance.decisionConfidence}`,
    `- **Unvalidated assumptions.** ${fallback(p.governance.unvalidatedAssumptions)}`,
  );

  return out.join("\n");
}
