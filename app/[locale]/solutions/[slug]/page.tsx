import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ModuleDetail } from "@/components/solutions/ModuleDetail";
import { getModule, modules } from "@/lib/modules";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return modules.map((m) => ({ slug: m.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const module = getModule(slug);
  const tu = await getTranslations("Ui");
  if (!module) return { title: tu("solutionFallback") };
  const tm = await getTranslations("Modules");
  return {
    title: tm(`${module.id}.short` as never),
    description: tm(`${module.id}.tagline` as never),
  };
}

export default async function SolutionModulePage({ params }: Props) {
  const { slug } = await params;
  const module = getModule(slug);
  if (!module) notFound();
  return <ModuleDetail module={module} />;
}
