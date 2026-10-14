"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { matchChatTopic, suggestionKeys, topicLinks, type ChatTopic } from "@/lib/chat";
import { site as defaultSite } from "@/lib/site";
import { submitLead } from "@/lib/submit-lead";
import { Button } from "@/components/ui/Button";
import { useCt } from "@/components/i18n/ContentI18n";

type Message = {
  from: "you" | "spark";
  text: string;
  links?: { href: string; label: string; external?: boolean }[];
};

type ChatWidgetProps = {
  address?: string;
  whatsapp?: string;
};

export const ChatWidget = ({
  address = defaultSite.address,
  whatsapp = defaultSite.whatsapp,
}: ChatWidgetProps) => {
  const t = useTranslations("AskSpark");
  const ct = useCt();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showLead, setShowLead] = useState(false);
  const [leadStatus, setLeadStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [lastTopic, setLastTopic] = useState<ChatTopic>("default");
  const [lastUserText, setLastUserText] = useState("");
  const logRef = useRef<HTMLDivElement>(null);

  const buildReply = (topic: ChatTopic): Message => ({
    from: "spark",
    text: t(`replies.${topic}`, { address: ct(address) }),
    links: topicLinks[topic].map((link) => ({
      href: link.href === defaultSite.whatsapp ? whatsapp : link.href,
      label: t(`links.${link.labelKey}`),
      external: link.external,
    })),
  });

  const suggestions = useMemo(
    () => suggestionKeys.map((key) => ({ key, label: t(`suggestions.${key}`) })),
    [t],
  );

  const [messages, setMessages] = useState<Message[]>(() => [
    { from: "spark", text: t("greeting") },
  ]);

  useEffect(() => {
    setMessages([{ from: "spark", text: t("greeting") }]);
  }, [t]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, showLead]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const topic = matchChatTopic(trimmed);
    setLastTopic(topic);
    setLastUserText(trimmed);
    setMessages((current) => [...current, { from: "you", text: trimmed }, buildReply(topic)]);
    setInput("");
    if (topic === "pricing" || topic === "whatsapp" || topic === "cases") {
      setShowLead(true);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    send(input);
  };

  const onLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setLeadStatus("sending");
    const ok = await submitLead({
      name: String(data.name || ""),
      email: String(data.email || ""),
      phone: String(data.phone || ""),
      message: lastUserText || "Chatbot inquiry",
      intent: `Chatbot · ${lastTopic}`,
      source: "chatbot",
    });
    if (ok || !process.env.NEXT_PUBLIC_CMS_API_URL) {
      setLeadStatus("sent");
      setMessages((current) => [...current, { from: "spark", text: t("leadThanks") }]);
      setShowLead(false);
    } else {
      setLeadStatus("error");
    }
  };

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] end-[max(1rem,env(safe-area-inset-right))] z-30 flex flex-col items-end gap-3 rtl:items-start sm:bottom-20 sm:end-5">
      {open && (
        <div
          role="dialog"
          aria-label={t("ariaLabel")}
          className="flex max-h-[min(72dvh,32rem)] w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-xl border border-border bg-bg shadow-[var(--shadow-md)]"
        >
          <div className="flex items-center justify-between gap-3 border-b border-border bg-surface px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="relative inline-flex h-8 w-8 shrink-0 overflow-hidden rounded-full border border-border bg-bg">
                <Image
                  src="/assets/brand/spark-mark.png"
                  alt=""
                  fill
                  className="object-contain p-1"
                  sizes="32px"
                />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{t("title")}</p>
                <p className="text-[0.7rem] text-muted">{t("subtitle")}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-muted hover:bg-bg hover:text-ink"
              aria-label={t("close")}
            >
              <span aria-hidden className="text-lg leading-none">
                ×
              </span>
            </button>
          </div>

          <div ref={logRef} className="max-h-[38dvh] overflow-y-auto p-4 sm:max-h-80" role="log" aria-live="polite">
            <ul className="grid gap-3">
              {messages.map((message, index) => (
                <li
                  key={`${message.from}-${index}`}
                  className={`max-w-[92%] rounded-lg px-3.5 py-2.5 text-sm leading-6 ${
                    message.from === "you"
                      ? "ms-auto bg-brand text-on-brand"
                      : "bg-surface text-ink"
                  }`}
                >
                  <span className="sr-only">
                    {message.from === "you" ? t("youSaid") : t("sparkSaid")}
                  </span>
                  {message.text}
                  {message.links && message.from === "spark" && (
                    <span className="mt-2 flex flex-wrap gap-1.5">
                      {message.links.map((link) =>
                        link.external ? (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full border border-border bg-bg px-2.5 py-1 text-[0.7rem] font-semibold text-ink hover:border-brand/40"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="rounded-full border border-border bg-bg px-2.5 py-1 text-[0.7rem] font-semibold text-ink hover:border-brand/40"
                          >
                            {link.label}
                          </Link>
                        ),
                      )}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border p-3">
            {showLead ? (
              <form onSubmit={onLeadSubmit} className="mb-3 grid gap-2 rounded-lg border border-border bg-surface p-3">
                <p className="text-xs font-semibold text-ink">{t("leadTitle")}</p>
                <input
                  name="name"
                  required
                  placeholder={t("leadName")}
                  className="h-9 rounded-md border border-border-strong bg-bg px-2.5 text-sm outline-none focus:border-brand"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder={t("leadEmail")}
                  className="h-9 rounded-md border border-border-strong bg-bg px-2.5 text-sm outline-none focus:border-brand"
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder={t("leadPhone")}
                  className="h-9 rounded-md border border-border-strong bg-bg px-2.5 text-sm outline-none focus:border-brand"
                />
                {leadStatus === "error" ? (
                  <p className="text-[0.7rem] text-red-600">{t("leadError")}</p>
                ) : null}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={leadStatus === "sending"}
                    className="inline-flex h-10 items-center justify-center rounded-md bg-ink px-5 text-sm font-semibold text-on-brand disabled:opacity-60"
                  >
                    {leadStatus === "sending" ? t("leadSending") : t("leadSubmit")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLead(false)}
                    className="text-xs font-medium text-muted hover:text-ink"
                  >
                    {t("leadCancel")}
                  </button>
                </div>
              </form>
            ) : leadStatus !== "sent" ? (
              <button
                type="button"
                onClick={() => setShowLead(true)}
                className="mb-3 w-full rounded-md border border-border px-3 py-2 text-left text-[0.75rem] font-semibold text-ink-2 hover:border-brand/40 hover:text-ink"
              >
                {t("leadCta")}
              </button>
            ) : null}

            <ul className="mb-3 flex flex-wrap gap-1.5">
              {suggestions.map((suggestion) => (
                <li key={suggestion.key}>
                  <button
                    type="button"
                    onClick={() => send(suggestion.label)}
                    className="min-h-11 rounded-full border border-border px-3 py-2 text-[0.75rem] font-medium text-ink-2 hover:border-brand/40 hover:text-ink"
                  >
                    {suggestion.label}
                  </button>
                </li>
              ))}
            </ul>

            <form onSubmit={onSubmit} className="flex gap-2">
              <label htmlFor="spark-tech-widget-input" className="sr-only">
                {t("label")}
              </label>
              <input
                id="spark-tech-widget-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={t("placeholder")}
                className="h-11 min-w-0 flex-1 rounded-md border border-border-strong bg-bg px-3 text-sm text-ink placeholder:text-muted/70 outline-none focus:border-brand"
              />
              <Button type="submit" size="md">
                {t("send")}
              </Button>
            </form>

            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-[0.7rem] font-semibold text-muted hover:text-ink"
            >
              {t("preferWhatsApp")}
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="inline-flex h-12 w-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-2 text-sm font-semibold text-on-brand shadow-[0_10px_28px_-14px_rgba(61,69,224,0.55)] transition duration-[var(--t-micro)] hover:-translate-y-0.5 sm:w-auto sm:px-4"
      >
        <span className="relative inline-flex h-5 w-5 overflow-hidden rounded-full bg-white/20">
          <Image
            src="/assets/brand/spark-mark.png"
            alt=""
            fill
            className="object-contain p-0.5"
            sizes="20px"
          />
        </span>
        <span className="max-sm:sr-only">{open ? t("close") : t("open")}</span>
      </button>
    </div>
  );
};
