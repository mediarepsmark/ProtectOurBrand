"use client";

import { ArrowLeft, ArrowRight, CalendarCheck, CircleCheck, Mail } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { SchedulingPicker } from "@/components/sections/SchedulingPicker";
import { formDisclaimer } from "@/content/site";
import { cn } from "@/lib/utils";

type IntakeData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  brandNames: string;
  socialHandles: string;
  marketplaces: string;
  knownUrls: string;
  mainConcern: string;
  budget: string;
  urgency: string;
  message: string;
  consent: boolean;
};

const initialData: IntakeData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  website: "",
  brandNames: "",
  socialHandles: "",
  marketplaces: "",
  knownUrls: "",
  mainConcern: "",
  budget: "",
  urgency: "",
  message: "",
  consent: false
};

const steps = [
  {
    title: "Your details",
    description: "Who should receive the scan summary and scheduling confirmation?",
    fields: ["name", "company", "email", "website"] as Array<keyof IntakeData>
  },
  {
    title: "Brand footprint",
    description: "Tell us what names, handles, marketplaces, and assets should be reviewed.",
    fields: ["brandNames"] as Array<keyof IntakeData>
  },
  {
    title: "Known abuse",
    description: "Share the threat type and any URLs where abuse is already visible.",
    fields: ["mainConcern"] as Array<keyof IntakeData>
  },
  {
    title: "Scope and booking",
    description: "Set urgency and submit the intake. We will use this to prepare the review and scheduling path.",
    fields: ["budget", "urgency", "message", "consent"] as Array<keyof IntakeData>
  },
  {
    title: "Pick a review window",
    description: "Choose your preferred review date and time, then submit.",
    fields: [] as Array<keyof IntakeData>
  }
];

const fieldLabels: Record<keyof IntakeData, string> = {
  name: "Name",
  company: "Company",
  email: "Email",
  phone: "Phone",
  website: "Website",
  brandNames: "Brand names to monitor",
  socialHandles: "Social handles",
  marketplaces: "Marketplaces or platforms",
  knownUrls: "Known infringing URLs",
  mainConcern: "Main concern",
  budget: "Monthly budget range",
  urgency: "Urgency",
  message: "Message",
  consent: "Consent"
};

export function ThreatScanIntakeForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<IntakeData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof IntakeData, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitted" | "missing" | "error">("idle");
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "error">("idle");

  const current = steps[currentStep];
  const completion = useMemo(() => Math.round(((currentStep + 1) / steps.length) * 100), [currentStep]);

  useEffect(() => {
    const intakeStatus = new URLSearchParams(window.location.search).get("intake");
    if (intakeStatus === "submitted" || intakeStatus === "missing") {
      setStatus(intakeStatus);
    }
  }, []);

  useEffect(() => {
    if (status === "submitted") {
      document.getElementById("brand-threat-scan")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  function updateField(field: keyof IntakeData, value: string | boolean) {
    setData((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  }

  function validateStep(stepIndex: number) {
    const nextErrors: Partial<Record<keyof IntakeData, string>> = {};

    for (const field of steps[stepIndex].fields) {
      if (field === "consent") {
        if (!data.consent) nextErrors.consent = "Please confirm before continuing.";
        continue;
      }

      if (typeof data[field] === "string" && data[field].trim().length === 0) {
        nextErrors[field] = `${fieldLabels[field]} is required.`;
      }
    }

    if (stepIndex === 0 && data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function goNext() {
    if (validateStep(currentStep)) setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
  }

  function goBack() {
    setCurrentStep((step) => Math.max(step - 1, 0));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateStep(currentStep)) return;

    setSubmitState("submitting");
    const form = event.currentTarget;
    const body = new FormData(form);
    const preferredReviewDate = (document.querySelector("[name='preferredReviewDate']") as HTMLInputElement | null)?.value;
    const preferredReviewWindow = (document.querySelector("[name='preferredReviewWindow']") as HTMLInputElement | null)?.value;
    body.set("_ajax", "1");
    if (preferredReviewDate) body.set("preferredReviewDate", preferredReviewDate);
    if (preferredReviewWindow) body.set("preferredReviewWindow", preferredReviewWindow);

    try {
      const response = await fetch(form.action, { method: "POST", body });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        setSubmitState("error");
        return;
      }
      if (result.redirect) {
        window.location.href = result.redirect;
        return;
      }
      setStatus("submitted");
      setSubmitState("idle");
    } catch {
      setSubmitState("error");
    }
  }

  if (status === "submitted") {
    return (
      <div id="brand-threat-scan" className="mt-6 scroll-mt-28 rounded-md border border-cyan/30 bg-cyan/10 p-6">
        <div className="flex items-start gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-blue shadow-sm">
            <CalendarCheck aria-hidden="true" className="size-6" />
          </span>
          <div>
            <h3 className="text-xl font-bold text-ink">Your threat scan intake was received.</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              The details were submitted to support@protectourbrand.com. If you selected a preferred review date or time window, it was included with your intake.
            </p>
            <a
              href="mailto:support@protectourbrand.com"
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slateLine bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-cyan hover:bg-cyan/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              <Mail aria-hidden="true" className="size-4" />
              Email Support
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form id="brand-threat-scan" action="/api/brand-threat-scan.php" method="post" className="mt-6 grid scroll-mt-28 gap-6" aria-describedby="brand-scan-disclaimer" onSubmit={handleSubmit}>
      <input type="hidden" name="source_page" value="ProtectOurBrand Brand Threat Scan" />

      {status === "missing" ? (
        <div className="rounded-md border border-amber/40 bg-amber/10 p-4 text-sm font-semibold leading-6 text-slate-800">
          Please complete the required fields before submitting the intake.
        </div>
      ) : null}

      <div>
        <div className="flex items-center justify-between gap-4 text-sm font-semibold">
          <span className="text-cyan">Step {currentStep + 1} of {steps.length}</span>
          <span className="text-slate-500">{completion}% complete</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-blue transition-all" style={{ width: `${completion}%` }} />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-ink">{current.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{current.description}</p>
      </div>

      <div className={cn("gap-5", currentStep === 0 ? "grid" : "hidden")}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" id="name" value={data.name} error={errors.name} onChange={(value) => updateField("name", value)} autoComplete="name" />
          <Field label="Company" id="company" value={data.company} error={errors.company} onChange={(value) => updateField("company", value)} autoComplete="organization" />
          <Field label="Email" id="email" type="email" value={data.email} error={errors.email} onChange={(value) => updateField("email", value)} autoComplete="email" />
          <Field label="Website" id="website" value={data.website} error={errors.website} onChange={(value) => updateField("website", value)} autoComplete="url" />
        </div>
        <Field label="Phone" id="phone" type="tel" value={data.phone} error={errors.phone} onChange={(value) => updateField("phone", value)} autoComplete="tel" required={false} />
      </div>

      <div className={cn("gap-5", currentStep === 1 ? "grid" : "hidden")}>
        <Field label="Brand names to monitor" id="brandNames" value={data.brandNames} error={errors.brandNames} onChange={(value) => updateField("brandNames", value)} />
        <Field label="Social handles" id="socialHandles" value={data.socialHandles} error={errors.socialHandles} onChange={(value) => updateField("socialHandles", value)} required={false} />
        <Field label="Marketplaces or platforms" id="marketplaces" value={data.marketplaces} error={errors.marketplaces} onChange={(value) => updateField("marketplaces", value)} required={false} />
      </div>

      <div className={cn("gap-5", currentStep === 2 ? "grid" : "hidden")}>
        <Select label="Main concern" id="mainConcern" value={data.mainConcern} error={errors.mainConcern} onChange={(value) => updateField("mainConcern", value)} options={["Stolen creative", "Fake profile", "Counterfeit listing", "Clone website", "Rogue domain", "Fake ads", "Marketplace abuse", "Not sure yet"]} />
        <Field label="Known infringing URLs" id="knownUrls" as="textarea" value={data.knownUrls} error={errors.knownUrls} onChange={(value) => updateField("knownUrls", value)} required={false} />
      </div>

      <div className={cn("gap-5", currentStep === 3 ? "grid" : "hidden")}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Select label="Monthly budget range" id="budget" value={data.budget} error={errors.budget} onChange={(value) => updateField("budget", value)} options={["Under $1,000", "$1,000 - $3,000", "$3,000 - $7,500", "$7,500+", "Not sure yet"]} />
          <Select label="Urgency" id="urgency" value={data.urgency} error={errors.urgency} onChange={(value) => updateField("urgency", value)} options={["Active abuse now", "High priority", "Planning monitoring", "Exploratory"]} />
        </div>
        <Field label="Message" id="message" as="textarea" value={data.message} error={errors.message} onChange={(value) => updateField("message", value)} />
        <label className="flex gap-3 rounded-md border border-slateLine bg-slate-50 p-4 text-sm leading-6 text-slate-700">
          <input
            type="checkbox"
            name="consent"
            value="Yes"
            checked={data.consent}
            onChange={(event) => updateField("consent", event.target.checked)}
            className="mt-1 size-4 rounded border-slateLine text-blue focus:ring-cyan"
          />
          <span>
            I understand this intake does not guarantee removal and agree to be contacted about the threat assessment.
            {errors.consent ? <span className="mt-1 block font-semibold text-amber">{errors.consent}</span> : null}
          </span>
        </label>
      </div>

      <div className={cn("gap-5", currentStep === 4 ? "grid" : "hidden")}>
        <SchedulingPicker formId="brand-threat-scan" />
      </div>

      <p id="brand-scan-disclaimer" className="text-sm leading-6 text-slate-600">{formDisclaimer}</p>

      {submitState === "error" ? (
        <div className="rounded-md border border-amber/40 bg-amber/10 p-4 text-sm font-semibold leading-6 text-slate-800">
          The intake could not be submitted. Please try again or email support@protectourbrand.com with your details.
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        {currentStep > 0 ? (
          <Button type="button" variant="secondary" onClick={goBack} disabled={submitState === "submitting"}>
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back
          </Button>
        ) : null}
        {currentStep < steps.length - 1 ? (
          <Button type="button" className="sm:ml-auto" onClick={goNext}>
            Continue
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        ) : (
          <Button type="submit" className="sm:ml-auto" disabled={submitState === "submitting"}>
            {submitState === "submitting" ? "Submitting Intake..." : "Submit Intake & Request Review Time"}
            <CircleCheck aria-hidden="true" className="size-4" />
          </Button>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  value,
  error,
  onChange,
  type = "text",
  required = true,
  as,
  autoComplete
}: {
  label: string;
  id: keyof IntakeData;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  as?: "textarea";
  autoComplete?: string;
}) {
  const inputClass =
    "mt-2 w-full rounded-md border border-slateLine bg-white px-4 py-3 text-ink outline-none placeholder:text-slate-500 focus:border-cyan focus:ring-2 focus:ring-cyan/30";

  return (
    <label className="block text-sm font-semibold text-slate-800" htmlFor={id}>
      {label}
      {required ? <span className="text-amber"> *</span> : null}
      {as === "textarea" ? (
        <textarea id={id} name={id} value={value} onChange={(event) => onChange(event.target.value)} rows={5} className={inputClass} />
      ) : (
        <input id={id} name={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} autoComplete={autoComplete} className={inputClass} />
      )}
      {error ? <span className="mt-1 block text-sm text-amber">{error}</span> : null}
    </label>
  );
}

function Select({
  label,
  id,
  value,
  error,
  onChange,
  options
}: {
  label: string;
  id: keyof IntakeData;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block text-sm font-semibold text-slate-800" htmlFor={id}>
      {label}
      <span className="text-amber"> *</span>
      <select id={id} name={id} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-md border border-slateLine bg-white px-4 py-3 text-ink outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/30">
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <span className="mt-1 block text-sm text-amber">{error}</span> : null}
    </label>
  );
}
