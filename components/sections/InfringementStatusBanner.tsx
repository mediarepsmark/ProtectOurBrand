"use client";

import { useEffect, useState } from "react";

export function InfringementStatusBanner() {
  const [status, setStatus] = useState<"idle" | "submitted" | "missing" | "error">("idle");

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("intake");
    if (value === "submitted" || value === "missing" || value === "error") {
      setStatus(value);
    }
  }, []);

  useEffect(() => {
    if (status !== "idle") {
      document.getElementById("submit-infringement")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  if (status === "submitted") {
    return (
      <div className="mb-5 rounded-md border border-cyan/30 bg-cyan/10 p-4 text-sm font-semibold leading-6 text-ink">
        Your infringement report was received. Our team will review the evidence and follow up.
      </div>
    );
  }

  if (status === "missing") {
    return (
      <div className="mb-5 rounded-md border border-amber/40 bg-amber/10 p-4 text-sm font-semibold leading-6 text-slate-800">
        Please complete the required fields before submitting the report.
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mb-5 rounded-md border border-amber/40 bg-amber/10 p-4 text-sm font-semibold leading-6 text-slate-800">
        The report could not be submitted. Please try again or email support@protectourbrand.com.
      </div>
    );
  }

  return null;
}
