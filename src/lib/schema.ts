// Canonical project schema. Every artifact is generated from this object.
// IDs assigned at creation time persist across all generated documents so
// requirements, ADRs, risks, and tests can be traced end-to-end.

export type SurfaceKind =
  | "public-website"
  | "internal-console"
  | "native-mobile"
  | "cross-platform-mobile"
  | "kiosk"
  | "partner-portal"
  | "api-only"
  | "other";

export type Vertical =
  | "healthcare"
  | "financial-services"
  | "retail"
  | "hospitality"
  | "public-sector"
  | "education"
  | "logistics"
  | "saas-internal"
  | "other";

export type Geo =
  | "canada"
  | "united-states"
  | "european-union"
  | "united-kingdom"
  | "global"
  | "other";

export type Confidence = "low" | "medium" | "high";

export interface Stakeholder {
  id: string;
  role: string;     // e.g. "Solution architect"
  name?: string;
  responsibility: string;
}

export interface Persona {
  id: string;
  name: string;     // e.g. "Branch teller"
  jtbd: string;     // top job-to-be-done
  pains: string;
  channel: SurfaceKind | "any";
}

export interface Requirement {
  id: string;       // FR-001, NFR-001
  kind: "functional" | "nonfunctional";
  title: string;
  description: string;
  acceptance: string;     // testable completion conditions
  priority: "must" | "should" | "could" | "wont";
  sourcePersona?: string; // persona id
}

export interface Decision {
  id: string;       // ADR-001
  title: string;
  context: string;
  decision: string;
  alternatives: string;
  consequences: string;
  status: "proposed" | "accepted" | "deprecated";
  confidence: Confidence;
}

export interface Risk {
  id: string;       // RISK-001
  description: string;
  likelihood: "low" | "medium" | "high";
  impact: "low" | "medium" | "high";
  mitigation: string;
}

export interface Assumption {
  id: string;       // ASM-001
  text: string;
  validated: boolean;
}

export interface OpenQuestion {
  id: string;       // Q-001
  text: string;
  owner?: string;
}

export interface Integration {
  id: string;       // INT-001
  system: string;
  direction: "inbound" | "outbound" | "bidirectional";
  protocol: string;        // REST, gRPC, webhook, file, queue
  dataClass: string;       // e.g. "PII", "PHI", "transactional"
  notes?: string;
}

export interface Entity {
  id: string;       // ENT-001
  name: string;
  description: string;
  sensitive: boolean;
  retention: string;       // e.g. "30 days", "7 years"
}

export interface SLO {
  id: string;       // SLO-001
  surface: string;         // e.g. "intake save", "artifact generation"
  metric: string;          // e.g. "p95 latency"
  target: string;          // e.g. "< 300ms"
}

// --- Domain blocks --------------------------------------------------------

export interface ProblemFraming {
  problem: string;
  audience: string;
  whyNow: string;
  successCriteria: string;
  outOfScope: string;
  businessCase: string;
  priority: "P0" | "P1" | "P2" | "P3";
}

export interface MarketContext {
  buyer: string;
  endUser: string;
  operator: string;
  alternatives: string;
  differentiation: string;
  marketSize: string;
  pricing: string;
  geo: Geo[];
  vertical: Vertical;
}

export interface ExperienceSurface {
  surfaces: SurfaceKind[];
  authMode: "public" | "authenticated" | "mixed";
  primaryDevice: "mobile-first" | "desktop-first" | "responsive" | "kiosk";
  offline: boolean;
  localization: string;     // comma list of locales
  accessibility: string;    // e.g. "WCAG 2.2 AA"
  notifications: string[];  // ["email", "sms", "push"]
  timingModel: "appointment" | "real-time-queue" | "both" | "neither";
}

export interface Functional {
  personas: Persona[];
  requirements: Requirement[];
  businessRules: string;
  edgeCases: string;
}

export interface NonFunctional {
  availabilityTarget: string; // e.g. "99.9%"
  rto: string;                // recovery time objective
  rpo: string;                // recovery point objective
  performance: string;        // e.g. "p95 < 500ms for read paths"
  privacyPosture: string;
  auditability: string;
  costBoundary: string;
  supportModel: string;
  slos: SLO[];
}

export interface DataAndTech {
  entities: Entity[];
  integrations: Integration[];
  dataResidency: string;
  frontend: string;
  backend: string;
  database: string;
  authStrategy: string;
  cicd: string;
  hosting: string;
  buildVsBuy: string;
}

export interface GoToMarket {
  packaging: "saas" | "enterprise" | "managed-service" | "internal-only" | "other";
  segments: string;
  buyerObjections: string;
  salesMotion: string;
  channelStrategy: string;
  launchGeography: string;
  complianceGating: string;
}

export interface Governance {
  owner: string;
  approvers: string;
  dependencies: string;
  thirdParties: string;
  legalReviews: string;
  procurementReviews: string;
  unvalidatedAssumptions: string;
  decisionConfidence: Confidence;
}

// --- Top-level project ----------------------------------------------------

export interface Project {
  id: string;
  name: string;
  oneLiner: string;
  createdAt: string;
  updatedAt: string;

  problem: ProblemFraming;
  market: MarketContext;
  experience: ExperienceSurface;
  functional: Functional;
  nonfunctional: NonFunctional;
  dataTech: DataAndTech;
  gtm: GoToMarket;
  governance: Governance;

  stakeholders: Stakeholder[];
  decisions: Decision[];
  risks: Risk[];
  assumptions: Assumption[];
  openQuestions: OpenQuestion[];

  // wizard progress: keys are step ids, value is "complete"
  progress: Record<string, "complete" | "in-progress">;
}

export type DomainKey =
  | "basics"
  | "problem"
  | "market"
  | "experience"
  | "functional"
  | "nonfunctional"
  | "dataTech"
  | "gtm"
  | "governance";

export const DOMAIN_ORDER: DomainKey[] = [
  "basics",
  "problem",
  "market",
  "experience",
  "functional",
  "nonfunctional",
  "dataTech",
  "gtm",
  "governance",
];

export const DOMAIN_LABEL: Record<DomainKey, string> = {
  basics: "Project basics",
  problem: "Problem & objectives",
  market: "Customer & market",
  experience: "Experience surface",
  functional: "Functional requirements",
  nonfunctional: "Quality attributes",
  dataTech: "Data, integrations & tech",
  gtm: "Commercial model",
  governance: "Delivery & governance",
};

export const DOMAIN_BLURB: Record<DomainKey, string> = {
  basics: "Name the initiative and capture a one-liner.",
  problem: "What problem, for whom, why now, what success looks like.",
  market: "Buyers, end users, alternatives, differentiation, pricing context.",
  experience: "Surfaces, devices, channels, timing model, accessibility.",
  functional: "Personas, requirements with acceptance criteria, edge cases.",
  nonfunctional: "Availability, recovery, performance, privacy, SLOs.",
  dataTech: "Entities, integrations, stack choices, build vs. buy.",
  gtm: "Packaging, segments, sales motion, launch geography.",
  governance: "Owners, approvers, dependencies, decision confidence.",
};
