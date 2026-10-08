import fs from "fs";
import { products } from "../lib/products";

const Products: Record<string, Record<string, string>> = {};

for (const p of products) {
  const o: Record<string, string> = {
    name: p.name,
    kicker: p.kicker,
    headline: p.headline,
    lede: p.lede,
    summary: p.summary,
    cta: p.cta,
  };
  p.outcomes.forEach((v, i) => (o[`out${i}`] = v));
  p.features.forEach((f, i) => {
    o[`feat${i}Title`] = f.title;
    o[`feat${i}Text`] = f.text;
  });
  p.steps.forEach((s, i) => {
    o[`step${i}Title`] = s.title;
    o[`step${i}Text`] = s.text;
  });
  Products[p.slug] = o;
}

fs.writeFileSync("scripts/_products-en.json", JSON.stringify({ Products }, null, 2));
console.log("products", Object.keys(Products).length);
