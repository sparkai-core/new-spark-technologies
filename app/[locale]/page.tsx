import { Hero } from "@/components/home/Hero";
import {
  ClaritySection,
  SolutionsModulesSection,
  StoriesSection,
  SuitesSection,
  TrustSection,
  TrustedByBand,
} from "@/components/home/AppsFlyerSections";
import { HomeFinalCta } from "@/components/home/HomeSections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedByBand />
      <SolutionsModulesSection />
      <ClaritySection />
      <SuitesSection />
      <StoriesSection />
      <TrustSection />
      <HomeFinalCta />
    </>
  );
}
