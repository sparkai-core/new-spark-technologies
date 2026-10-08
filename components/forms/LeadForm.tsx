"use client";

import { useTranslations } from "next-intl";
import { useId, useState, type FormEvent } from "react";
import { submitLead } from "@/lib/submit-lead";

type LeadFormProps = {
  moduleOptions: { id: string; label: string }[];
  productOptions: { id: string; label: string }[];
  industryBriefingLabel: string;
  notSureLabel: string;
};

const fieldClass =
  "h-11 rounded-md border border-border bg-bg px-3 text-ink outline-none focus:border-brand";

export function LeadForm({
  moduleOptions,
  productOptions,
  industryBriefingLabel,
  notSureLabel,
}: LeadFormProps) {
  const t = useTranslations("Contact");
  const id = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");

    const module = String(payload.module || "");
    const product = String(payload.product || "");
    const message = [
      String(payload.message || ""),
      module ? `Module: ${module}` : "",
      product ? `Product: ${product}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.localStorage.setItem(
      "spark-tech-lead",
      JSON.stringify({ ...payload, at: new Date().toISOString() }),
    );

    const ok = await submitLead({
      name: String(payload.name || ""),
      email: String(payload.email || ""),
      phone: String(payload.phone || ""),
      company: String(payload.company || ""),
      message,
      intent: module || product || "Executive briefing",
      source: "website",
    });

    setStatus(ok || !process.env.NEXT_PUBLIC_CMS_API_URL ? "sent" : "error");
  };

  if (status === "sent") {
    return (
      <div className="panel grid gap-3 p-6 md:p-8">
        <h2 className="text-xl font-bold tracking-tight text-ink">{t("formTitle")}</h2>
        <p className="text-sm leading-6 text-ink-2">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="panel grid gap-4 p-6 md:p-8">
      <div>
        <p className="type-kicker">{t("formKicker")}</p>
        <h2 className="mt-2 text-xl font-bold tracking-tight text-ink">{t("formTitle")}</h2>
      </div>

      <label className="grid gap-1.5 text-sm">
        <span className="font-medium text-ink">{t("formName")}</span>
        <input id={`${id}-name`} name="name" required autoComplete="name" className={fieldClass} />
      </label>

      <label className="grid gap-1.5 text-sm">
        <span className="font-medium text-ink">{t("workEmail")}</span>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldClass}
        />
      </label>

      <label className="grid gap-1.5 text-sm">
        <span className="font-medium text-ink">{t("formPhone")}</span>
        <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" className={fieldClass} />
      </label>

      <label className="grid gap-1.5 text-sm">
        <span className="font-medium text-ink">{t("formCompany")}</span>
        <input id={`${id}-company`} name="company" autoComplete="organization" className={fieldClass} />
      </label>

      <label className="grid gap-1.5 text-sm">
        <span className="font-medium text-ink">{t("preferredModule")}</span>
        <select name="module" className={fieldClass} defaultValue="">
          <option value="" disabled>
            {t("selectFocus")}
          </option>
          {moduleOptions.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
          <option value={industryBriefingLabel}>{industryBriefingLabel}</option>
          <option value={notSureLabel}>{notSureLabel}</option>
        </select>
      </label>

      <label className="grid gap-1.5 text-sm">
        <span className="font-medium text-ink">{t("preferredProduct")}</span>
        <select name="product" className={fieldClass} defaultValue="">
          <option value="" disabled>
            {t("selectProduct")}
          </option>
          {productOptions.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
          <option value={notSureLabel}>{notSureLabel}</option>
        </select>
      </label>

      <label className="grid gap-1.5 text-sm">
        <span className="font-medium text-ink">{t("formMessage")}</span>
        <textarea
          name="message"
          rows={4}
          required
          className="rounded-md border border-border bg-bg px-3 py-2.5 text-ink outline-none focus:border-brand"
          placeholder={t("messagePlaceholder")}
        />
      </label>

      {status === "error" ? (
        <p className="text-sm text-red-600">Could not reach the inbox. Please try again or email us.</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-11 items-center justify-center rounded-md bg-gradient-to-r from-brand to-brand-2 px-5 text-sm font-semibold text-white disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : t("sendBriefing")}
      </button>
    </form>
  );
}
