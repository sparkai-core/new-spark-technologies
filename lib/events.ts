export type EventAppearance = {
  id: string;
  name: string;
  shortName: string;
  role: "Exhibitor" | "Participant" | "Speaker";
  status: "past" | "upcoming";
  city: string;
  country: string;
  year: string;
  dates?: string;
  image: string;
  summary: string;
  focus: string[];
  modules: string[];
};

export const events: EventAppearance[] = [
  {
    id: "ai-global-show-riyadh",
    name: "AI Global Show",
    shortName: "AI Global Show Riyadh",
    role: "Exhibitor",
    status: "past",
    city: "Riyadh",
    country: "Saudi Arabia",
    year: "2025",
    image: "/assets/events/ai-global-riyadh.jpg",
    summary:
      "Spark exhibited enterprise AI for industrial and operational environments — connecting with energy, manufacturing, and infrastructure leaders across the Kingdom and the wider GCC.",
    focus: [
      "Live demos of predictive maintenance and asset health",
      "Vision-based quality and inspection workflows",
      "Energy intelligence and workforce safety signals",
      "Meetings with operators evaluating AI pilots",
    ],
    modules: ["asset-reliability", "quality-inspection", "energy-fuel", "workforce-safety"],
  },
];

export const eventShowcase = [
  {
    title: "What we show on the floor",
    text: "Working module demos — not slide decks — so operators can see signal-to-action in minutes.",
  },
  {
    title: "Who we meet",
    text: "Reliability, HSE, digital, and operations leaders scoping pilots for plants, grids, and sites.",
  },
  {
    title: "What happens next",
    text: "A scoped briefing, data-source map, and a clear 4–8 week pilot path.",
  },
] as const;
