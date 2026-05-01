import { Project } from "../schema";
import { fallback, header } from "./util";

export function generateMarketingBrief(p: Project): string {
  const externalFacing = p.gtm.packaging !== "internal-only";
  const out: string[] = [
    header(p, `Marketing and commercialization brief — ${p.name || "Untitled"}`, "GTM brief"),
  ];

  if (!externalFacing) {
    out.push(
      `> This initiative is marked **internal-only** in the commercial model. The brief below is included for completeness; for purely internal capabilities, focus on adoption and change management rather than external positioning.`,
      ``,
    );
  }

  out.push(
    `## 1. Positioning`,
    ``,
    `**Audience.** ${fallback(p.market.endUser)}  `,
    `**Buyer.** ${fallback(p.market.buyer)}  `,
    `**Operator.** ${fallback(p.market.operator)}  `,
    ``,
    `**Differentiation.** ${fallback(p.market.differentiation)}`,
    ``,
    `**Alternatives today.** ${fallback(p.market.alternatives)}`,
    ``,
    `## 2. Market context`,
    ``,
    `- **Vertical.** ${p.market.vertical}`,
    `- **Geographies.** ${p.market.geo.length === 0 ? "_Not selected_" : p.market.geo.join(", ")}`,
    `- **Demand / market size.** ${fallback(p.market.marketSize)}`,
    `- **Pricing posture.** ${fallback(p.market.pricing)}`,
    ``,
    `## 3. Segments and motion`,
    ``,
    `- **Segments.** ${fallback(p.gtm.segments)}`,
    `- **Sales motion.** ${fallback(p.gtm.salesMotion)}`,
    `- **Channel strategy.** ${fallback(p.gtm.channelStrategy)}`,
    `- **Buyer objections to plan for.** ${fallback(p.gtm.buyerObjections)}`,
    ``,
    `## 4. Launch geography and gating`,
    ``,
    `- **Launch geography.** ${fallback(p.gtm.launchGeography)}`,
    `- **Compliance gating.** ${fallback(p.gtm.complianceGating)}`,
    ``,
    `## 5. Why now`,
    ``,
    fallback(p.problem.whyNow),
    ``,
    `## 6. Proof points to develop`,
    ``,
    `- Outcome metrics tied to the success criteria: ${fallback(p.problem.successCriteria)}.`,
    `- Reference design partners aligned with the target segments.`,
    `- Public benchmarks relevant to the vertical (e.g. wait-time satisfaction, attendance lift).`,
  );

  return out.join("\n");
}
