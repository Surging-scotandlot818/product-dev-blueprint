"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Project, DomainKey } from "./schema";
import { uid } from "./ids";

interface State {
  projects: Record<string, Project>;
  order: string[];
  createProject: (name: string, oneLiner: string) => string;
  deleteProject: (id: string) => void;
  updateProject: (id: string, patch: Partial<Project>) => void;
  patchDomain: <K extends keyof Project>(id: string, key: K, value: Project[K]) => void;
  markStep: (id: string, step: DomainKey, status: "complete" | "in-progress") => void;
  duplicateProject: (id: string) => string | null;
}

export function emptyProject(name: string, oneLiner: string): Project {
  const now = new Date().toISOString();
  return {
    id: uid(),
    name,
    oneLiner,
    createdAt: now,
    updatedAt: now,
    problem: {
      problem: "",
      audience: "",
      whyNow: "",
      successCriteria: "",
      outOfScope: "",
      businessCase: "",
      priority: "P2",
    },
    market: {
      buyer: "",
      endUser: "",
      operator: "",
      alternatives: "",
      differentiation: "",
      marketSize: "",
      pricing: "",
      geo: [],
      vertical: "other",
    },
    experience: {
      surfaces: [],
      authMode: "authenticated",
      primaryDevice: "responsive",
      offline: false,
      localization: "",
      accessibility: "WCAG 2.2 AA",
      notifications: [],
      timingModel: "neither",
    },
    functional: {
      personas: [],
      requirements: [],
      businessRules: "",
      edgeCases: "",
    },
    nonfunctional: {
      availabilityTarget: "99.9%",
      rto: "4 hours",
      rpo: "1 hour",
      performance: "p95 < 500ms for read paths",
      privacyPosture: "",
      auditability: "",
      costBoundary: "",
      supportModel: "",
      slos: [],
    },
    dataTech: {
      entities: [],
      integrations: [],
      dataResidency: "",
      frontend: "",
      backend: "",
      database: "",
      authStrategy: "",
      cicd: "",
      hosting: "",
      buildVsBuy: "",
    },
    gtm: {
      packaging: "saas",
      segments: "",
      buyerObjections: "",
      salesMotion: "",
      channelStrategy: "",
      launchGeography: "",
      complianceGating: "",
    },
    governance: {
      owner: "",
      approvers: "",
      dependencies: "",
      thirdParties: "",
      legalReviews: "",
      procurementReviews: "",
      unvalidatedAssumptions: "",
      decisionConfidence: "medium",
    },
    stakeholders: [],
    decisions: [],
    risks: [],
    assumptions: [],
    openQuestions: [],
    progress: {},
  };
}

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      projects: {},
      order: [],
      createProject: (name, oneLiner) => {
        const project = emptyProject(name || "Untitled project", oneLiner || "");
        set((s) => ({
          projects: { ...s.projects, [project.id]: project },
          order: [project.id, ...s.order],
        }));
        return project.id;
      },
      deleteProject: (id) => {
        set((s) => {
          const { [id]: _, ...rest } = s.projects;
          return { projects: rest, order: s.order.filter((x) => x !== id) };
        });
      },
      updateProject: (id, patch) => {
        set((s) => {
          const cur = s.projects[id];
          if (!cur) return s;
          const next = { ...cur, ...patch, updatedAt: new Date().toISOString() };
          return { projects: { ...s.projects, [id]: next } };
        });
      },
      patchDomain: (id, key, value) => {
        set((s) => {
          const cur = s.projects[id];
          if (!cur) return s;
          const next = { ...cur, [key]: value, updatedAt: new Date().toISOString() } as Project;
          return { projects: { ...s.projects, [id]: next } };
        });
      },
      markStep: (id, step, status) => {
        const cur = get().projects[id];
        if (!cur) return;
        const progress = { ...cur.progress, [step]: status };
        get().updateProject(id, { progress });
      },
      duplicateProject: (id) => {
        const cur = get().projects[id];
        if (!cur) return null;
        const copy: Project = {
          ...cur,
          id: uid(),
          name: `${cur.name} (copy)`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((s) => ({
          projects: { ...s.projects, [copy.id]: copy },
          order: [copy.id, ...s.order],
        }));
        return copy.id;
      },
    }),
    {
      name: "pdb-store-v1",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
