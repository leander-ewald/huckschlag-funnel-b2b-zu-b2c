"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import {
  Factory,
  Pill,
  ShoppingBag,
  Cog,
  UtensilsCrossed,
  Boxes,
  Package,
  Truck,
  Container,
  Warehouse,
  TrendingUp,
  ArrowRightLeft,
  Wrench,
  ClipboardList,
  AlertTriangle,
  Banknote,
  Eye,
  Scaling,
  Clock,
  MapPin,
  Globe,
  FileText,
  Building2,
  Users,
  Shuffle,
  HelpCircle,
  Wallet,
  BarChart3,
  User,
  Mail,
  Phone,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Star,
  ShieldCheck,
  Loader2,
  Lock,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   TYPES
   ══════════════════════════════════════════════════════════════ */
interface B2BFormData {
  industry: string;
  shipmentType: string[];
  volume: string;
  services: string[];
  challenges: string[];
  region: string;
  requirements: string;
  currentSetup: string;
  budget: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  position: string;
  privacy: boolean;
}

/* ══════════════════════════════════════════════════════════════
   OPTION DEFINITIONS — B2B Industrie & Kontraktlogistik
   ══════════════════════════════════════════════════════════════ */
const INDUSTRY_OPTIONS = [
  { value: "automotive", label: "Automotive & Zulieferer", icon: Cog },
  { value: "pharma", label: "Pharma & Healthcare", icon: Pill },
  { value: "handel", label: "Handel & Retail", icon: ShoppingBag },
  { value: "industrie", label: "Produktion & Industrie", icon: Factory },
  { value: "food", label: "Food & Beverage", icon: UtensilsCrossed },
  { value: "sonstiges", label: "Sonstiges", icon: Boxes },
];

const SHIPMENT_OPTIONS = [
  { value: "paletten", label: "Palettenware", desc: "Ganz- & Halbpaletten, Europaletten", icon: Boxes },
  { value: "stueckgut", label: "Stückgut", desc: "Einzelne Packstücke, Kartonagen", icon: Package },
  { value: "teilladung", label: "Teil- & Komplettladungen", desc: "LTL / FTL Transporte", icon: Truck },
  { value: "container", label: "Containerware", desc: "See- & Binnencontainer", icon: Container },
  { value: "sonderware", label: "Sonder- & Gefahrgut", desc: "Temperaturgeführt, ADR-Güter", icon: AlertTriangle },
];

const VOLUME_OPTIONS = [
  { value: "lt50", label: "<50 Paletten", icon: Package },
  { value: "50-200", label: "50 – 200 Paletten", icon: Boxes },
  { value: "200-1000", label: "200 – 1.000 Paletten", icon: Warehouse },
  { value: "gt1000", label: ">1.000 Paletten", icon: Truck },
];

const SERVICE_OPTIONS = [
  { value: "kontraktlogistik", label: "Kontraktlogistik", icon: ClipboardList },
  { value: "warehousing", label: "Warehousing & Lagerung", icon: Warehouse },
  { value: "distribution", label: "Distribution & Transport", icon: Truck },
  { value: "kommissionierung", label: "Kommissionierung", icon: ArrowRightLeft },
  { value: "vas", label: "Value-Added-Services", icon: Wrench },
  { value: "retouren", label: "Retourenmanagement", icon: ArrowRightLeft },
];

const CHALLENGE_OPTIONS = [
  { value: "kapazitaet", label: "Kapazitätsengpässe", icon: AlertTriangle },
  { value: "kosten", label: "Zu hohe Logistikkosten", icon: Banknote },
  { value: "transparenz", label: "Mangelnde Transparenz", icon: Eye },
  { value: "skalierung", label: "Skalierung schwierig", icon: Scaling },
  { value: "qualitaet", label: "Qualitätsprobleme", icon: Star },
  { value: "geschwindigkeit", label: "Zu langsame Prozesse", icon: Clock },
];

const REGION_OPTIONS = [
  { value: "regional", label: "Regional (NRW)", icon: MapPin },
  { value: "deutschland", label: "Deutschlandweit", icon: MapPin },
  { value: "dach", label: "DACH-Raum", icon: MapPin },
  { value: "eu", label: "EU-weit", icon: Globe },
  { value: "international", label: "International", icon: Globe },
];

const SETUP_OPTIONS = [
  { value: "eigene", label: "Eigene Logistik", icon: Building2 },
  { value: "extern", label: "Externer Dienstleister", icon: Users },
  { value: "mix", label: "Mix aus beidem", icon: Shuffle },
  { value: "aufbau", label: "Im Aufbau / Neu", icon: HelpCircle },
];

const BUDGET_OPTIONS = [
  { value: "lt5000", label: "<5.000 €", icon: Wallet },
  { value: "5000-20000", label: "5.000 – 20.000 €", icon: Banknote },
  { value: "20000-100000", label: "20.000 – 100.000 €", icon: TrendingUp },
  { value: "gt100000", label: ">100.000 €", icon: BarChart3 },
];

const TOTAL_QUESTIONS = 8;
const TOTAL_STEPS = TOTAL_QUESTIONS + 1; // +1 for contact form

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function B2BFunnelPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<B2BFormData>({
    industry: "",
    shipmentType: [],
    volume: "",
    services: [],
    challenges: [],
    region: "",
    requirements: "",
    currentSetup: "",
    budget: "",
    name: "",
    company: "",
    email: "",
    phone: "",
    position: "",
    privacy: false,
  });

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  const updateField = useCallback(
    <K extends keyof B2BFormData>(key: K, value: B2BFormData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const toggleMulti = useCallback((key: "shipmentType" | "services" | "challenges", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: (prev[key] as string[]).includes(value)
        ? (prev[key] as string[]).filter((v) => v !== value)
        : [...(prev[key] as string[]), value],
    }));
  }, []);

  const canProceed = (): boolean => {
    switch (step) {
      case 0: return !!formData.industry;
      case 1: return formData.shipmentType.length > 0;
      case 2: return !!formData.volume;
      case 3: return formData.services.length > 0;
      case 4: return formData.challenges.length > 0;
      case 5: return !!formData.region;
      case 6: return formData.requirements.trim().length > 0;
      case 7: return !!formData.currentSetup;
      case 8: {
        const hasRequired = !!formData.name && !!formData.company && !!formData.email && !!formData.phone;
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
        return hasRequired && emailValid && formData.privacy;
      }
      default: return false;
    }
  };

  const next = () => {
    if (step < TOTAL_STEPS - 1 && canProceed()) setStep(step + 1);
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!canProceed() || submitting) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/submit-b2b", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Übermittlung fehlgeschlagen");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    } finally {
      setSubmitting(false);
    }
  };

  const stepLabel = (): string => {
    if (step <= 6) return `Frage ${step + 1} von 7`;
    if (step === 7) return "Letzte Frage";
    return "Kontakt";
  };

  /* ── SUCCESS STATE ── */
  if (submitted) {
    return (
      <div className="min-h-[100dvh] bg-gradient-to-br from-blue to-blue-dark flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-dark mb-3">
            Vielen Dank f&uuml;r Ihre Anfrage!
          </h1>
          <p className="text-gray-600 mb-2">
            Ihre Anfrage ist bei uns eingegangen.
          </p>
          <p className="text-gray-600 mb-8">
            Ein Ansprechpartner meldet sich innerhalb von <strong>24 Stunden</strong> bei Ihnen.
          </p>
          <div className="bg-gray-100 rounded-xl p-5 text-left space-y-2 text-sm">
            <p><span className="text-gray-400">Name:</span> <strong>{formData.name}</strong></p>
            <p><span className="text-gray-400">Unternehmen:</span> <strong>{formData.company}</strong></p>
            <p><span className="text-gray-400">Telefon:</span> <strong>{formData.phone}</strong></p>
            <p><span className="text-gray-400">E-Mail:</span> <strong>{formData.email}</strong></p>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col items-center gap-3">
            <Image
              src="/huckschlag-logo.svg"
              alt="Spedition Huckschlag"
              width={160}
              height={32}
              className="h-8 w-auto opacity-60"
            />
            <p className="text-sm text-gray-400">Landstr. 2 &middot; 58730 Fr&ouml;ndenberg</p>
          </div>
        </div>
      </div>
    );
  }

  /* ── MAIN FUNNEL ── */
  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-blue to-blue-dark flex flex-col">
      {/* Header */}
      <header className="px-4 pt-5 pb-3 sm:pt-6 sm:pb-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/huckschlag-logo-white.svg"
              alt="Spedition Huckschlag"
              width={160}
              height={32}
              className="h-7 sm:h-8 w-auto"
              priority
            />
          </div>
          <div className="text-right">
            <p className="text-white/50 text-xs">{stepLabel()}</p>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="px-4">
        <div className="max-w-2xl mx-auto">
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green to-teal rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-6 sm:py-8">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
          <div className="p-4 sm:p-6 md:p-10">
            {step === 0 && <StepIndustry value={formData.industry} onChange={(v) => updateField("industry", v)} />}
            {step === 1 && <StepShipment selected={formData.shipmentType} onToggle={(v) => toggleMulti("shipmentType", v)} />}
            {step === 2 && <StepVolume value={formData.volume} onChange={(v) => updateField("volume", v)} />}
            {step === 3 && <StepServices selected={formData.services} onToggle={(v) => toggleMulti("services", v)} />}
            {step === 4 && <StepChallenges selected={formData.challenges} onToggle={(v) => toggleMulti("challenges", v)} />}
            {step === 5 && <StepRegion value={formData.region} onChange={(v) => updateField("region", v)} />}
            {step === 6 && <StepRequirements value={formData.requirements} onChange={(v) => updateField("requirements", v)} />}
            {step === 7 && <StepSetup value={formData.currentSetup} onChange={(v) => updateField("currentSetup", v)} />}
            {step === 8 && <StepContact formData={formData} updateField={updateField} />}
          </div>

          {/* Error message */}
          {error && (
            <div className="px-4 sm:px-8 md:px-10">
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
                {error}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="px-4 sm:px-8 md:px-10 pb-5 sm:pb-8 md:pb-10 flex items-center justify-between gap-3">
            <button
              onClick={prev}
              disabled={step === 0}
              className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-3 rounded-full text-sm font-medium transition-all min-h-[44px] ${
                step === 0
                  ? "text-gray-300 cursor-default"
                  : "text-gray-600 hover:text-dark hover:bg-gray-100"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Zur&uuml;ck
            </button>

            {step < TOTAL_STEPS - 1 ? (
              <button
                onClick={next}
                disabled={!canProceed()}
                className={`flex items-center gap-1.5 sm:gap-2 px-5 sm:px-7 py-3 rounded-full text-sm font-semibold transition-all min-h-[44px] ${
                  canProceed()
                    ? "bg-green text-white hover:bg-green-dark shadow-lg shadow-green/25 hover:shadow-green/40"
                    : "bg-gray-200 text-gray-400 cursor-default"
                }`}
              >
                Weiter
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed() || submitting}
                className={`flex items-center gap-1.5 sm:gap-2 px-5 sm:px-7 py-3 rounded-full text-sm font-semibold transition-all min-h-[44px] ${
                  canProceed() && !submitting
                    ? "bg-green text-white hover:bg-green-dark shadow-lg shadow-green/25 hover:shadow-green/40"
                    : "bg-gray-200 text-gray-400 cursor-default"
                }`}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Wird gesendet&hellip;
                  </>
                ) : (
                  <>
                    <span className="sm:hidden">Absenden</span>
                    <span className="hidden sm:inline">Jetzt Beratungstermin sichern</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <footer className="px-4 pb-5 sm:pb-6">
        <div className="max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-6 gap-y-2 text-xs text-white/40">
          <span className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            Sichere Verbindung
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            Kein Spam
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            Seit 40+ Jahren
          </span>
          <span className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            145 Mitarbeitende
          </span>
        </div>
      </footer>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   STEP COMPONENTS
   ══════════════════════════════════════════════════════════════ */

function StepIndustry({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <p className="text-green text-xs font-semibold uppercase tracking-wider mb-2">Frage 1 von 7</p>
      <h2 className="text-xl sm:text-2xl font-bold text-dark mb-2">In welcher Branche ist Ihr Unternehmen t&auml;tig?</h2>
      <p className="text-gray-400 text-sm mb-6">W&auml;hlen Sie Ihren Wirtschaftszweig.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {INDUSTRY_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          return (
            <OptionCard key={opt.value} selected={value === opt.value} onClick={() => onChange(opt.value)} icon={<Icon className="w-5 h-5" />} label={opt.label} />
          );
        })}
      </div>
    </div>
  );
}

function StepShipment({ selected, onToggle }: { selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div>
      <p className="text-green text-xs font-semibold uppercase tracking-wider mb-2">Frage 2 von 7</p>
      <h2 className="text-xl sm:text-2xl font-bold text-dark mb-2">Welche Art von G&uuml;tern m&uuml;ssen transportiert oder gelagert werden?</h2>
      <p className="text-gray-400 text-sm mb-6">Mehrfachauswahl m&ouml;glich.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SHIPMENT_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          return (
            <OptionCard key={opt.value} selected={selected.includes(opt.value)} onClick={() => onToggle(opt.value)} icon={<Icon className="w-5 h-5" />} label={opt.label} desc={opt.desc} multiSelect />
          );
        })}
      </div>
    </div>
  );
}

function StepVolume({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <p className="text-green text-xs font-semibold uppercase tracking-wider mb-2">Frage 3 von 7</p>
      <h2 className="text-xl sm:text-2xl font-bold text-dark mb-2">Wie hoch ist Ihr monatliches Logistikvolumen?</h2>
      <p className="text-gray-400 text-sm mb-6">Sch&auml;tzen Sie die Palettenstellpl&auml;tze oder Sendungen pro Monat.</p>
      <div className="grid grid-cols-2 gap-3">
        {VOLUME_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          return (
            <OptionCard key={opt.value} selected={value === opt.value} onClick={() => onChange(opt.value)} icon={<Icon className="w-5 h-5" />} label={opt.label} />
          );
        })}
      </div>
    </div>
  );
}

function StepServices({ selected, onToggle }: { selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div>
      <p className="text-green text-xs font-semibold uppercase tracking-wider mb-2">Frage 4 von 7</p>
      <h2 className="text-xl sm:text-2xl font-bold text-dark mb-2">Welche Logistikleistungen ben&ouml;tigen Sie?</h2>
      <p className="text-gray-400 text-sm mb-6">Mehrfachauswahl m&ouml;glich.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SERVICE_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          return (
            <OptionCard key={opt.value} selected={selected.includes(opt.value)} onClick={() => onToggle(opt.value)} icon={<Icon className="w-5 h-5" />} label={opt.label} multiSelect />
          );
        })}
      </div>
    </div>
  );
}

function StepChallenges({ selected, onToggle }: { selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div>
      <p className="text-green text-xs font-semibold uppercase tracking-wider mb-2">Frage 5 von 7</p>
      <h2 className="text-xl sm:text-2xl font-bold text-dark mb-2">Welche Herausforderungen haben Sie aktuell in der Logistik?</h2>
      <p className="text-gray-400 text-sm mb-6">Mehrfachauswahl m&ouml;glich.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CHALLENGE_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          return (
            <OptionCard key={opt.value} selected={selected.includes(opt.value)} onClick={() => onToggle(opt.value)} icon={<Icon className="w-5 h-5" />} label={opt.label} multiSelect />
          );
        })}
      </div>
    </div>
  );
}

function StepRegion({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <p className="text-green text-xs font-semibold uppercase tracking-wider mb-2">Frage 6 von 7</p>
      <h2 className="text-xl sm:text-2xl font-bold text-dark mb-2">In welchen Regionen ben&ouml;tigen Sie Logistikl&ouml;sungen?</h2>
      <p className="text-gray-400 text-sm mb-6">W&auml;hlen Sie Ihren Distributionsbereich.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {REGION_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          return (
            <OptionCard key={opt.value} selected={value === opt.value} onClick={() => onChange(opt.value)} icon={<Icon className="w-5 h-5" />} label={opt.label} />
          );
        })}
      </div>
    </div>
  );
}

function StepRequirements({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <p className="text-green text-xs font-semibold uppercase tracking-wider mb-2">Frage 7 von 7</p>
      <h2 className="text-xl sm:text-2xl font-bold text-dark mb-2">Beschreiben Sie kurz Ihre Logistik-Anforderungen.</h2>
      <p className="text-gray-400 text-sm mb-6">Besondere W&uuml;nsche, Produktarten, Mengen, Frequenzen — alles was uns hilft.</p>
      <div className="relative">
        <div className="absolute left-3 top-4 text-gray-400">
          <FileText className="w-4 h-4" />
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="z. B. Wir lagern ca. 500 Paletten temperaturgeführte Ware und benötigen tägliche Kommissionierung..."
          rows={4}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green/30 focus:border-green transition-colors resize-none"
        />
      </div>
    </div>
  );
}

function StepSetup({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <p className="text-green text-xs font-semibold uppercase tracking-wider mb-2">Letzte Frage</p>
      <h2 className="text-xl sm:text-2xl font-bold text-dark mb-2">Wie ist Ihre Logistik aktuell organisiert?</h2>
      <p className="text-gray-400 text-sm mb-6">Das hilft uns, die passende L&ouml;sung vorzuschlagen.</p>
      <div className="grid grid-cols-2 gap-3">
        {SETUP_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          return (
            <OptionCard key={opt.value} selected={value === opt.value} onClick={() => onChange(opt.value)} icon={<Icon className="w-5 h-5" />} label={opt.label} />
          );
        })}
      </div>
    </div>
  );
}

function StepContact({ formData, updateField }: { formData: B2BFormData; updateField: <K extends keyof B2BFormData>(key: K, value: B2BFormData[K]) => void }) {
  const emailInvalid = formData.email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  return (
    <div>
      <p className="text-green text-xs font-semibold uppercase tracking-wider mb-1">Hervorragend! Wir haben die passende L&ouml;sung</p>
      <h2 className="text-xl sm:text-2xl font-bold text-dark mb-2">Wer ist Ihr Ansprechpartner f&uuml;r Logistik?</h2>
      <p className="text-gray-400 text-sm mb-6">Wir melden uns zeitnah mit einem konkreten Vorschlag.</p>
      <div className="space-y-4">
        <InputField label="Vor- und Nachname *" value={formData.name} onChange={(v) => updateField("name", v)} placeholder="Vor- und Nachname" icon={<User className="w-4 h-4" />} />
        <InputField label="Unternehmen *" value={formData.company} onChange={(v) => updateField("company", v)} placeholder="Firmenname" icon={<Building2 className="w-4 h-4" />} />
        <InputField label="Position / Abteilung" value={formData.position} onChange={(v) => updateField("position", v)} placeholder="z. B. Leiter Logistik" icon={<ClipboardList className="w-4 h-4" />} />
        <div>
          <InputField label="E-Mail-Adresse *" value={formData.email} onChange={(v) => updateField("email", v)} placeholder="ihre@firma.de" type="email" icon={<Mail className="w-4 h-4" />} />
          {emailInvalid && <p className="text-red-500 text-xs mt-1">Bitte geben Sie eine g&uuml;ltige E-Mail-Adresse ein.</p>}
        </div>
        <InputField label="Telefonnummer *" value={formData.phone} onChange={(v) => updateField("phone", v)} placeholder="+49 ..." type="tel" icon={<Phone className="w-4 h-4" />} />
        <label className="flex items-start gap-3 cursor-pointer group py-1">
          <input
            type="checkbox"
            checked={formData.privacy}
            onChange={(e) => updateField("privacy", e.target.checked)}
            className="mt-0.5 w-5 h-5 rounded border-gray-300 text-green focus:ring-green/30 cursor-pointer flex-shrink-0"
          />
          <span className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
            Ich akzeptiere die Datenschutzbestimmungen
          </span>
        </label>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SHARED UI COMPONENTS
   ══════════════════════════════════════════════════════════════ */

function OptionCard({ selected, onClick, icon, label, desc, multiSelect }: { selected: boolean; onClick: () => void; icon: React.ReactNode; label: string; desc?: string; multiSelect?: boolean }) {
  return (
    <button onClick={onClick} className={`relative flex items-center gap-3 p-3 sm:p-4 rounded-xl border-2 text-left transition-all min-h-[48px] ${selected ? "border-green bg-green-light shadow-sm" : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-100/50"}`}>
      <div className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-colors ${selected ? "bg-green text-white" : "bg-gray-100 text-gray-400"}`}>
        {icon}
      </div>
      <div className="min-w-0 pr-6">
        <p className={`font-semibold text-sm ${selected ? "text-dark" : "text-gray-600"}`}>{label}</p>
        {desc && <p className="text-xs text-gray-400 mt-0.5 leading-snug">{desc}</p>}
      </div>
      <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3">
        <div className={`w-5 h-5 ${multiSelect ? "rounded-md" : "rounded-full"} border-2 flex items-center justify-center transition-all ${selected ? "border-green bg-green" : "border-gray-300 bg-white"}`}>
          {selected && <CheckCircle2 className="w-3 h-3 text-white" />}
        </div>
      </div>
    </button>
  );
}

function InputField({ label, value, onChange, placeholder, type = "text", icon }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string; icon: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1.5">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green/30 focus:border-green transition-colors" />
      </div>
    </div>
  );
}
