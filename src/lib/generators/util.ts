import { Project } from "../schema";

export function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return iso;
  }
}

export function header(project: Project, title: string, kind: string): string {
  return [
    `# ${title}`,
    ``,
    `> **Project:** ${project.name || "_untitled_"}  `,
    `> **Document type:** ${kind}  `,
    `> **Last updated:** ${fmtDate(project.updatedAt)}  `,
    `> **Status:** Draft — human review required.`,
    ``,
  ].join("\n");
}

export function nonEmpty(s: string | undefined | null): boolean {
  return !!s && s.trim().length > 0;
}

export function fallback(s: string | undefined | null, label = "Not yet captured."): string {
  return nonEmpty(s) ? (s as string) : `_${label}_`;
}

export function bulletsFrom(text: string): string {
  return text
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => (l.startsWith("- ") || l.startsWith("* ") ? l : `- ${l}`))
    .join("\n");
}

export function inferCornerCases(project: Project): string[] {
  const cases: string[] = [];
  const surf = project.experience.surfaces;
  const tm = project.experience.timingModel;

  if (tm === "real-time-queue" || tm === "both") {
    cases.push(
      "Inaccurate wait-time estimates degrading user trust",
      "Multiple service desks with unequal service times",
      "Customers arriving much earlier or later than predicted",
      "Branch/location outages or unscheduled closures",
      "Staff overrides and manual queue resequencing",
      "Family or group bookings counted as a single party",
      "Cancellations and duplicate queue entries",
      "Walk-in vs. pre-booked customer prioritization",
    );
  }
  if (tm === "appointment" || tm === "both") {
    cases.push(
      "No-show handling and reslotting policies",
      "Time-zone and locale-based slot confusion",
      "Reschedule windows and cutoffs",
    );
  }
  if (project.experience.notifications.length === 0) {
    cases.push("Users with no notification preference set");
  }
  if (project.experience.offline) {
    cases.push("Connectivity loss mid-session and recovery on reconnect");
  }
  if (surf.includes("kiosk")) {
    cases.push("Idle kiosk timeout and personal-data wipe");
  }
  if (surf.includes("native-mobile") || surf.includes("cross-platform-mobile")) {
    cases.push("Users who cannot or will not install an app — fallback to web/SMS");
  }
  if (project.market.vertical === "healthcare") {
    cases.push("PHI segregation between queue tokens and clinical identifiers");
    cases.push("Reminders that must not contain protected health information in clear text");
  }
  if (project.market.vertical === "financial-services") {
    cases.push("Duplicate-account fraud signals interrupting flows");
    cases.push("Operational resilience failover and degraded-mode posture");
  }
  cases.push(
    "Accessibility accommodations (screen reader, keyboard-only, high contrast)",
    "Multilingual content and locale fallbacks",
    "Users with no phone or low-connectivity environments",
  );
  return Array.from(new Set(cases));
}

export function inferCompliancePacks(project: Project): string[] {
  const packs: string[] = [];
  const v = project.market.vertical;
  const geo = project.market.geo;

  if (v === "healthcare") {
    if (geo.includes("united-states")) packs.push("HIPAA Security Rule");
    if (geo.includes("canada")) packs.push("Ontario PHIPA + provincial health privacy");
  }
  if (v === "financial-services") {
    if (geo.includes("canada")) packs.push("OSFI technology & cyber-risk expectations");
    packs.push("PCI DSS scope check (only if payment account data is processed)");
  }
  if (geo.includes("canada")) packs.push("PIPEDA — private-sector commercial activity");
  if (geo.includes("european-union")) packs.push("GDPR");
  if (geo.includes("united-kingdom")) packs.push("UK GDPR + DPA 2018");
  packs.push("OWASP ASVS baseline for web application security");
  packs.push("OWASP LLM Top 10 — only if AI features are part of the product");
  packs.push("NIST AI RMF — govern, map, measure, manage");
  return packs;
}
