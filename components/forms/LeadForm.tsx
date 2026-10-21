"use client";

import { useEffect, useRef } from "react";

export function LeadForm() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The provider scans existing iframes, so initialize it on every page visit.
    const script = document.createElement("script");
    script.src = "https://api.sparkai.ae/js/form_embed.js";
    script.async = true;
    containerRef.current?.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <div ref={containerRef} className="panel overflow-hidden">
      <iframe
        src="https://api.sparkai.ae/widget/form/76vS45qszharbr4wthpi"
        id="inline-76vS45qszharbr4wthpi"
        title="Briefing form: Tell us where to start"
        style={{ display: "block", width: "100%", height: "796px", border: "none", borderRadius: "8px" }}
        data-layout='{"id":"INLINE"}'
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Briefing formTell us where to start"
        data-height="796"
        data-layout-iframe-id="inline-76vS45qszharbr4wthpi"
        data-form-id="76vS45qszharbr4wthpi"
        data-cookie-consent="true"
        data-cookie-consent-provider="auto"
      />
    </div>
  );
}
