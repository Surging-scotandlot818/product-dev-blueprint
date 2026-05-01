import { Project } from "../schema";
import { fallback, header } from "./util";

export function generateADRPack(p: Project): string {
  const out: string[] = [
    header(p, `Architecture decisions — ${p.name || "Untitled"}`, "ADR pack"),
    `> Each entry follows: **Context → Decision → Alternatives → Consequences**, with status and confidence.`,
    ``,
  ];

  if (p.decisions.length === 0) {
    out.push(
      `_No decisions recorded yet. Record decisions for at least: stack choice, data residency, auth strategy, third-party integrations, rollout posture, and cost model._`,
    );
    return out.join("\n");
  }

  p.decisions.forEach((d) => {
    out.push(
      `## ${d.id} — ${d.title || "Untitled decision"}`,
      ``,
      `**Status.** ${d.status}    **Confidence.** ${d.confidence}`,
      ``,
      `### Context`,
      ``,
      fallback(d.context),
      ``,
      `### Decision`,
      ``,
      fallback(d.decision),
      ``,
      `### Alternatives considered`,
      ``,
      fallback(d.alternatives),
      ``,
      `### Consequences`,
      ``,
      fallback(d.consequences),
      ``,
      `---`,
      ``,
    );
  });

  return out.join("\n");
}
