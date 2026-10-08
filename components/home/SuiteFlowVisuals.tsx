"use client";

import { useEffect, useState } from "react";
import { ParallaxCard } from "@/components/ui/ParallaxCard";

type NodeKind = "state" | "action" | "result";

type FlowNode = {
  id: string;
  label: string;
  caption: string;
  kind: NodeKind;
};

type FlowDef = {
  title: string;
  subtitle: string;
  rows: FlowNode[][];
};

const FLOWS: Record<string, FlowDef> = {
  systems: {
    title: "Systems workflow",
    subtitle: "From site signal to closed work order",
    rows: [
      [
        { id: "1", label: "Sense", caption: "SCADA · IoT · cameras", kind: "state" },
        { id: "2", label: "Detect", caption: "Anomaly models", kind: "action" },
        { id: "3", label: "Rank risk", caption: "Criticality score", kind: "action" },
        { id: "4", label: "Decide", caption: "Ops policy", kind: "state" },
      ],
      [
        { id: "5", label: "Work order", caption: "CMMS / ERP", kind: "action" },
        { id: "6", label: "Execute", caption: "Crews & systems", kind: "result" },
        { id: "7", label: "Learn", caption: "Outcome feedback", kind: "state" },
      ],
    ],
  },
  products: {
    title: "Product path",
    subtitle: "Pick a function — connect — go live",
    rows: [
      [
        { id: "1", label: "Pick", caption: "Construction · HVAC · finance", kind: "state" },
        { id: "2", label: "Configure", caption: "Brand · data · rules", kind: "action" },
        { id: "3", label: "Connect", caption: "ERP · CRM · files", kind: "action" },
      ],
      [
        { id: "4", label: "Launch", caption: "Live in days", kind: "result" },
        { id: "5", label: "Operate", caption: "Team + AI", kind: "state" },
        { id: "6", label: "Expand", caption: "Add next product", kind: "result" },
      ],
    ],
  },
  industries: {
    title: "Industry coverage",
    subtitle: "Signals unify into one ops layer",
    rows: [
      [
        { id: "1", label: "Energy", caption: "Grid & corridors", kind: "state" },
        { id: "2", label: "Oil & Gas", caption: "Integrity & loading", kind: "state" },
        { id: "3", label: "Rail", caption: "Track & OHE", kind: "state" },
        { id: "4", label: "Manufacturing", caption: "Line & quality", kind: "state" },
      ],
      [
        { id: "5", label: "Unify", caption: "Cross-site signals", kind: "action" },
        { id: "6", label: "Ops layer", caption: "Detect → decide → act", kind: "result" },
      ],
    ],
  },
  platform: {
    title: "Platform stack",
    subtitle: "Governed layers from data to action",
    rows: [
      [
        { id: "1", label: "Data", caption: "Sensors · historians", kind: "state" },
        { id: "2", label: "Integrate", caption: "ERP · CMMS · APIs", kind: "action" },
        { id: "3", label: "Intelligence", caption: "Models · insights", kind: "state" },
      ],
      [
        { id: "4", label: "Policy", caption: "Approvals & controls", kind: "action" },
        { id: "5", label: "Agents", caption: "Execute workflows", kind: "result" },
        { id: "6", label: "Deploy", caption: "Cloud · on-prem · hybrid", kind: "state" },
      ],
    ],
  },
  agents: {
    title: "Agent loop",
    subtitle: "Inspection to control-room handoff",
    rows: [
      [
        { id: "1", label: "Signal", caption: "Vision · thermal · IoT", kind: "state" },
        { id: "2", label: "Reason", caption: "Next best action", kind: "action" },
        { id: "3", label: "Approve", caption: "Human gate", kind: "action" },
      ],
      [
        { id: "4", label: "Execute", caption: "Systems & workflows", kind: "result" },
        { id: "5", label: "Handoff", caption: "Field crew", kind: "state" },
        { id: "6", label: "Verify", caption: "Control room", kind: "result" },
      ],
    ],
  },
};

type SuiteFlowVisualProps = {
  suiteId?: string;
  steps?: { label: string; detail: string }[];
  active: boolean;
  kicker?: string;
};

function stepsToFlow(steps: { label: string; detail: string }[], title: string): FlowDef {
  const nodes: FlowNode[] = steps.map((s, i) => ({
    id: String(i + 1),
    label: s.label,
    caption: s.detail,
    kind: (i === steps.length - 1
      ? "result"
      : i % 2 === 0
        ? "state"
        : "action") as NodeKind,
  }));
  const mid = Math.ceil(nodes.length / 2);
  return {
    title,
    subtitle: "Module process path",
    rows: [nodes.slice(0, mid), nodes.slice(mid)],
  };
}

function flatNodes(flow: FlowDef): FlowNode[] {
  return flow.rows.flat();
}

export function SuiteFlowVisual({
  suiteId = "systems",
  steps: stepsProp,
  active,
  kicker,
}: SuiteFlowVisualProps) {
  const flow =
    stepsProp != null
      ? stepsToFlow(stepsProp, kicker ?? "Module workflow")
      : FLOWS[suiteId] ?? FLOWS.systems;

  const nodes = flatNodes(flow);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!active) return;
    setStep(0);
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % nodes.length);
    }, 1600);
    return () => window.clearInterval(id);
  }, [active, nodes.length]);

  let globalIndex = -1;

  return (
    <ParallaxCard
      className="suite-flow-board relative flex h-full min-h-[14rem] flex-col rounded-[0.9rem] border border-[#e6e8ef] bg-[#fafbfd] p-3.5 shadow-[0_1px_2px_rgba(15,17,21,0.04),0_18px_40px_-28px_rgba(15,17,21,0.28)] sm:min-h-[15.5rem] sm:p-4"
      contentClassName="relative flex h-full min-h-inherit flex-col"
    >
      <div className="suite-flow-dots absolute inset-0 rounded-[0.9rem]" aria-hidden />

      <header className="relative flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[0.58rem] font-medium uppercase tracking-[0.14em] text-[#6b7280]">
            Process map
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-x-2.5 gap-y-1" aria-hidden>
          <span className="inline-flex items-center gap-1 text-[0.58rem] font-medium text-[#6b7280]">
            <span className="h-1.5 w-1.5 rounded-sm bg-[#e8eaef] ring-1 ring-[#d5d9e2]" />
            State
          </span>
          <span className="inline-flex items-center gap-1 text-[0.58rem] font-medium text-[#6b7280]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2233ee]" />
            Action
          </span>
          <span className="inline-flex items-center gap-1 text-[0.58rem] font-medium text-[#6b7280]">
            <span className="h-1.5 w-1.5 rounded-sm bg-[#dfe4ff] ring-1 ring-[#b8c0f5]" />
            Result
          </span>
        </div>
      </header>

      <div className="relative mt-3.5 flex flex-1 flex-col justify-center gap-2">
        {flow.rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`grid grid-cols-2 gap-2 sm:flex sm:flex-nowrap sm:gap-0 ${rowIndex > 0 ? "sm:ps-6" : ""}`}
          >
            {row.map((node, nodeIndex) => {
              globalIndex += 1;
              const index = globalIndex;
              const isActive = index === step;
              const isDone = index < step;
              const isLastInRow = nodeIndex === row.length - 1;
              const isLastOverall = index === nodes.length - 1;

              return (
                <div key={node.id} className="contents sm:flex sm:items-center">
                  <button
                    type="button"
                    onClick={() => setStep(index)}
                    aria-current={isActive ? "step" : undefined}
                    className={`suite-flow-card ${
                      node.kind === "action"
                        ? "suite-flow-card-action"
                        : node.kind === "result"
                          ? "suite-flow-card-result"
                          : "suite-flow-card-state"
                    } ${isActive ? "is-active" : ""} ${isDone ? "is-done" : ""}`}
                  >
                    <span className="suite-flow-card-meta">
                      <span className="font-mono text-[0.52rem] tracking-[0.08em] opacity-70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {(isDone || node.kind === "result") && (
                        <span className="suite-flow-check" aria-hidden>
                          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" aria-hidden>
                            <path
                              d="M2.5 6.2 4.8 8.5 9.5 3.5"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      )}
                    </span>
                    <span className="suite-flow-card-label">{node.label}</span>
                    <span className="suite-flow-card-caption">{node.caption}</span>
                  </button>

                  {!isLastOverall && !isLastInRow ? (
                    <span
                      aria-hidden
                      className={`suite-flow-connector ${isDone || isActive ? "is-lit" : ""}`}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <footer className="relative mt-3.5 flex items-center justify-between gap-3 border-t border-[#e7e9ef] pt-2.5">
        <p className="min-w-0 text-[0.72rem] leading-4 text-[#4b5563]">
          <span className="font-mono text-[0.58rem] text-[#2233ee]">
            {String(step + 1).padStart(2, "0")}/{String(nodes.length).padStart(2, "0")}
          </span>
          <span className="mx-1.5 text-[#c5cad3]">|</span>
          <span className="font-semibold text-[#0f1115]">{nodes[step]?.label}</span>
          <span className="mx-1 text-[#9aa3b2]">·</span>
          <span className="truncate">{nodes[step]?.caption}</span>
        </p>
        <div className="hidden h-1 w-20 overflow-hidden rounded-full bg-[#eceef3] sm:block" aria-hidden>
          <div
            className="h-full rounded-full bg-[#2233ee] transition-[width] duration-500 ease-out"
            style={{ width: `${((step + 1) / nodes.length) * 100}%` }}
          />
        </div>
      </footer>
    </ParallaxCard>
  );
}
