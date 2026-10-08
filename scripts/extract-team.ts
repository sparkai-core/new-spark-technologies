import fs from "fs";
import { team } from "../lib/site";

const TeamContent: Record<string, string> = {};

function slug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const people = [...team.leadership, ...team.delivery];
for (const p of people) {
  const id = slug(p.name);
  TeamContent[`${id}Role`] = p.role;
  TeamContent[`${id}Bio`] = p.bio;
  TeamContent[`${id}Location`] = p.location;
  TeamContent[`${id}Group`] = p.group;
  p.tags.forEach((t, i) => (TeamContent[`${id}Tag${i}`] = t));
  if ("quote" in p && p.quote) TeamContent[`${id}Quote`] = p.quote;
  if ("focus" in p && Array.isArray(p.focus)) {
    p.focus.forEach((f, i) => (TeamContent[`${id}Focus${i}`] = f));
  }
}

team.principles.forEach((v, i) => (TeamContent[`principle${i}`] = v));
team.stats.forEach((s, i) => {
  TeamContent[`stat${i}Value`] = s.value;
  TeamContent[`stat${i}Label`] = s.label;
});
team.locations.active.forEach((v, i) => (TeamContent[`locActive${i}`] = v));

fs.writeFileSync("scripts/_team-en.json", JSON.stringify(TeamContent, null, 2));
console.log("keys", Object.keys(TeamContent).length);
