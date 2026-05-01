import { Project } from "../schema";
import { generateExecSummary } from "./exec-summary";
import { generatePRD } from "./prd";
import { generateSOW } from "./sow";
import { generateTechSpec } from "./tech-spec";
import { generateADRPack } from "./adr";
import { generateRTM } from "./rtm";
import { generateTestStrategy } from "./test-strategy";
import { generateLaunchOps } from "./launch-ops";
import { generateMarketingBrief } from "./marketing";
import { generateDataInterfaceSpec } from "./data-interface";
import { generateRiskRegister } from "./risk-register";

export interface Artifact {
  key: string;
  title: string;
  filename: string;
  description: string;
  body: string;
}

export function generateBundle(project: Project): Artifact[] {
  return [
    {
      key: "exec-summary",
      title: "Executive summary",
      filename: "01-executive-summary.md",
      description: "One-page business case, audience, success criteria.",
      body: generateExecSummary(project),
    },
    {
      key: "prd",
      title: "Product requirements (PRD)",
      filename: "02-prd.md",
      description: "Goals, personas, requirements with acceptance criteria.",
      body: generatePRD(project),
    },
    {
      key: "sow",
      title: "Statement of work (SOW)",
      filename: "03-sow.md",
      description: "Scope, deliverables, milestones, acceptance.",
      body: generateSOW(project),
    },
    {
      key: "tech-spec",
      title: "Technical design spec",
      filename: "04-tech-spec.md",
      description: "Stack, contracts, rollout, monitoring, recovery.",
      body: generateTechSpec(project),
    },
    {
      key: "adr",
      title: "ADR pack",
      filename: "05-adr-pack.md",
      description: "Decisions with context, alternatives, consequences.",
      body: generateADRPack(project),
    },
    {
      key: "data-interface",
      title: "Data & interface spec",
      filename: "06-data-interface-spec.md",
      description: "Entities, integrations, retention, residency.",
      body: generateDataInterfaceSpec(project),
    },
    {
      key: "rtm",
      title: "Requirements traceability matrix",
      filename: "07-rtm.md",
      description: "Each requirement linked to design and tests.",
      body: generateRTM(project),
    },
    {
      key: "test-strategy",
      title: "Test strategy",
      filename: "08-test-strategy.md",
      description: "Coverage targets, scenarios, acceptance gates.",
      body: generateTestStrategy(project),
    },
    {
      key: "launch-ops",
      title: "Launch & operations plan",
      filename: "09-launch-ops.md",
      description: "SLOs, runbook, rollback, on-call posture.",
      body: generateLaunchOps(project),
    },
    {
      key: "marketing",
      title: "Marketing & GTM brief",
      filename: "10-marketing-brief.md",
      description: "Positioning, segments, pricing, launch geography.",
      body: generateMarketingBrief(project),
    },
    {
      key: "risk-register",
      title: "Risk register & governance",
      filename: "11-risk-register.md",
      description: "Risks, assumptions, open questions, compliance packs.",
      body: generateRiskRegister(project),
    },
  ];
}
