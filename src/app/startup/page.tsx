"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import {
  ShoppingCart,
  Heart,
  Repeat,
  Store,
  Boxes,
  Package,
  ShoppingBag,
  Sparkles,
  Cpu,
  Leaf,
  Shirt,
  Warehouse,
  Zap,
  RotateCcw,
  ArrowRightLeft,
  Settings,
  Clock,
  Banknote,
  TrendingUp,
  Scaling,
  Star,
  Code,
  MapPin,
  Globe,
  Wallet,
  BarChart3,
  User,
  Building2,
  Mail,
  Phone,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Loader2,
  Lock,
  Truck,
  Rocket,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   TYPES
   ══════════════════════════════════════════════════════════════ */
interface StartupFormData {
  businessModel: string;
  productType: string[];
  orderVolume: string;
  growthPlan: string;
  services: string[];
  challenges: string[];
  shopSystem: string;
  budget: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  privacy: boolean;
}

/* ══════════════════════════════════════════════════════════════
   OPTION DEFINITIONS — Startup & E-Commerce Fulfillment
   ══════════════════════════════════════════════════════════════ */
const BUSINESS_OPTIONS = [
  { value: "onlineshop", label: "Online-Shop", desc: "Eigener Webshop (Shopify, Shopware, etc.)", icon: ShoppingCart },
  { value: "d2c", label: "D2C Brand", desc: "Direktvertrieb an Endkunden", icon: Heart },
  { value: "subscription", label: "Subscription Box", desc: "Abo-Modell mit regelmäßigem Versand", icon: Repeat },
  { value: "marketplace", label: "Marktplatz-Seller", desc: "Amazon, eBay, Otto, etc.", icon: Store },
  { value: "sonstiges", label: "Sonstiges", desc: "Hybrid-Modell oder anderes", icon: Boxes },
];

const PRODUCT_OPTIONS = [
  { value: "fashion", label: "Fashion & Accessoires", desc: "Kleidung, Schuhe, Schmuck", icon: Shirt },
  { value: "beauty", label: "Beauty & Pflege", desc: "Kosmetik, Skincare, Supplements", icon: Sparkles },
  { value: "food", label: "Food & Drinks", desc: "Trockenprodukte, Nahrungsergänzung", icon: Leaf },
  { value: "tech", label: "Tech & Gadgets", desc: "Elektronik, Zubehör", icon: Cpu },
  { value: "home", label: "Home & Living", desc: "Deko, Küche, Haushalt", icon: ShoppingBag },
  { value: "sonstiges", label: "Sonstiges", desc: "Spielzeug, Tierbedarf, Bücher, etc.", icon: Package },
];

const VOLUME_OPTIONS = [
  { value: "lt50", label: "<50 / Monat", icon: Package },
  { value: "50-200", label: "50 – 200 / Monat", icon: Package },
  { value: "200-1000", label: "200 – 1.000 / Monat", icon: Boxes },
  { value: "gt1000", label: ">1.000 / Monat", icon: Truck },
];

const GROWTH_OPTIONS = [
  { value: "gerade_gestartet", label: "Gerade gestartet", desc: "Erste Bestellungen, Aufbauphase", icon: Rocket },
  { value: "wachstum", label: "Starkes Wachstum", desc: "Schnell steigende Bestellzahlen", icon: TrendingUp },
  { value: "stabil", label: "Stabil, will skalieren", desc: "Laufendes Geschäft, nächste Stufe", icon: BarChart3 },
  { value: "peak_vorbereitung", label: "Peak-Vorbereitung", desc: "Black Friday, Weihnachten, Launch", icon: Zap },
];

const SERVICE_OPTIONS = [
  { value: "pickpack", label: "Pick & Pack", icon: Package },
  { value: "lagerung", label: "Lagerung & Warehousing", icon: Warehouse },
  { value: "retouren", label: "Retourenabwicklung", icon: RotateCcw },
  { value: "shopintegration", label: "Shop-Integration", icon: ArrowRightLeft },
  { value: "verpackung", label: "Individuelle Verpackung", icon: Boxes },
  { value: "versandoptimierung", label: "Versandoptimierung", icon: Settings },
];

const CHALLENGE_OPTIONS = [
  { value: "zeit", label: "Keine Zeit für Versand", icon: Clock },
  { value: "kosten", label: "Versandkosten zu hoch", icon: Banknote },
  { value: "skalierung", label: "Kann nicht skalieren", icon: Scaling },
  { value: "qualitaet", label: "Verpackungsqualität", icon: Star },
  { value: "retouren", label: "Zu viele Retouren", icon: RotateCcw },
  { value: "platz", label: "Kein Lagerplatz mehr", icon: Warehouse },
];

const SHOP_OPTIONS = [
  { value: "shopify", label: "Shopify", icon: ShoppingCart },
  { value: "shopware", label: "Shopware", icon: ShoppingCart },
  { value: "woocommerce", label: "WooCommerce", icon: ShoppingCart },
  { value: "amazon", label: "Amazon FBA/FBM", icon: Store },
  { value: "eigenloesung", label: "Eigenlösung / API", icon: Code },
  { value: "noch_keins", label: "Noch keins / in Planung", icon: Rocket },
];

const BUDGET_OPTIONS = [
  { value: "lt500", label: "<500 €", icon: Wallet },
  { value: "500-2000", label: "500 – 2.000 €", icon: Banknote },
  { value: "2000-5000", label: "2.000 – 5.000 €", icon: TrendingUp },
  { value: "gt5000", label: ">5.000 €", icon: BarChart3 },
];

const TOTAL_QUESTIONS = 7;
const TOTAL_STEPS = TOTAL_QUESTIONS + 1; // +1 for contact form

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function StartupFunnelPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<StartupFormData>({
    businessModel: "",
    productType: [],
    orderVolume: "",
    growthPlan: "",
    services: [],
    challenges: [],
    shopSystem: "",
    budget: "",
    name: "",
    company: "",
    email: "",
    phone: "",
    website: "",
    privacy: false,
  });

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  const updateField = useCallback(
    <K extends keyof StartupFormData>(key: K, value: StartupFormData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const toggleMulti = useCallback((key: "productType" | "services" | "challenges", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: (prev[key] as string[]).includes(value)
        ? (prev[key] as string[]).filter((v) => v !== value)
        : [...(prev[key] as string[]), value],
    }));
  }, []);

  const canProceed = (): boolean => {
    switch (step) {
      case 0: return !!formData.businessModel;
      case 1: return formData.productType.length > 0;
      case 2: return !!formData.orderVolume;
      case 3: return !!formData.growthPlan;
      case 4: return formData.services.length > 0;
      case 5: return formData.challenges.length > 0;
      case 6: return !!formData.shopSystem;
      case 7: {
        const hasRequired = !!formData.name && !!formData.email && !!formData.phone;
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
      const res = await fetch("/api/submit-startup", {
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
      setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten. Bitte versuche es erneut.");
    } finally {
      setSubmitting(false);
    }
  };

  const stepLabel = (): string => {
    if (step <= 5) return `Frage ${step + 1} von 6`;
    if (step === 6) return "Letzte Frage";
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
            Vielen Dank!
          </h1>
          <p className="text-gray-600 mb-2">
            Deine Anfrage ist bei uns eingegangen.
          </p>
          <p className="text-gray-600 mb-8">
            Wir melden uns innerhalb von <strong>24 Stunden</strong> bei dir — versprochen!
          </p>
          <div className="bg-gray-100 rounded-xl p-5 text-left space-y-2 text-sm">
            <p><span className="text-gray-400">Name:</span> <strong>{formData.name}</strong></p>
            <p><span className="text-gray-400">Telefon:</span> <strong>{formData.phone}</strong></p>
            <p><span className="text-gray-400">E-Mail:</span> <strong>{formData.email}</strong></p>
            {formData.company && <p><span className="text-gray-400">Unternehmen:</span> <strong>{formData.company}</strong></p>}
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
            {step === 0 && <StepBusiness value={formData.businessModel} onChange={(v) => updateField("businessModel", v)} />}
            {step === 1 && <StepProduct selected={formData.productType} onToggle={(v) => toggleMulti("productType", v)} />}
            {step === 2 && <StepVolume value={formData.orderVolume} onChange={(v) => updateField("orderVolume", v)} />}
            {step === 3 && <StepGrowth value={formData.growthPlan} onChange={(v) => updateField("growthPlan", v)} />}
            {step === 4 && <StepServices selected={formData.services} onToggle={(v) => toggleMulti("services", v)} />}
            {step === 5 && <StepChallenges selected={formData.challenges} onToggle={(v) => toggleMulti("challenges", v)} />}
            {step === 6 && <StepShop value={formData.shopSystem} onChange={(v) => updateField("shopSystem", v)} />}
            {step === 7 && <StepContact formData={formData} updateField={updateField} />}
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
                    <span className="hidden sm:inline">Jetzt loslegen</span>
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
            <Rocket className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            Startup-freundlich
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            Flexibel skalierbar
          </span>
        </div>
      </footer>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   STEP COMPONENTS
   ══════════════════════════════════════════════════════════════ */

function StepBusiness({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <p className="text-green text-xs font-semibold uppercase tracking-wider mb-2">Frage 1 von 6</p>
      <h2 className="text-xl sm:text-2xl font-bold text-dark mb-2">Welches Gesch&auml;ftsmodell beschreibt dich am besten?</h2>
      <p className="text-gray-400 text-sm mb-6">W&auml;hle die passende Option.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {BUSINESS_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          return (
            <OptionCard key={opt.value} selected={value === opt.value} onClick={() => onChange(opt.value)} icon={<Icon className="w-5 h-5" />} label={opt.label} desc={opt.desc} />
          );
        })}
      </div>
    </div>
  );
}

function StepProduct({ selected, onToggle }: { selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div>
      <p className="text-green text-xs font-semibold uppercase tracking-wider mb-2">Frage 2 von 6</p>
      <h2 className="text-xl sm:text-2xl font-bold text-dark mb-2">Was f&uuml;r Produkte verkaufst du?</h2>
      <p className="text-gray-400 text-sm mb-6">Mehrfachauswahl m&ouml;glich.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PRODUCT_OPTIONS.map((opt) => {
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
      <p className="text-green text-xs font-semibold uppercase tracking-wider mb-2">Frage 3 von 6</p>
      <h2 className="text-xl sm:text-2xl font-bold text-dark mb-2">Wie viele Bestellungen versendest du aktuell pro Monat?</h2>
      <p className="text-gray-400 text-sm mb-6">Eine grobe Sch&auml;tzung reicht v&ouml;llig.</p>
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

function StepGrowth({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <p className="text-green text-xs font-semibold uppercase tracking-wider mb-2">Frage 4 von 6</p>
      <h2 className="text-xl sm:text-2xl font-bold text-dark mb-2">Wo stehst du gerade mit deinem Business?</h2>
      <p className="text-gray-400 text-sm mb-6">Das hilft uns, die richtige L&ouml;sung f&uuml;r deine Phase zu finden.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {GROWTH_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          return (
            <OptionCard key={opt.value} selected={value === opt.value} onClick={() => onChange(opt.value)} icon={<Icon className="w-5 h-5" />} label={opt.label} desc={opt.desc} />
          );
        })}
      </div>
    </div>
  );
}

function StepServices({ selected, onToggle }: { selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div>
      <p className="text-green text-xs font-semibold uppercase tracking-wider mb-2">Frage 5 von 6</p>
      <h2 className="text-xl sm:text-2xl font-bold text-dark mb-2">Welche Fulfillment-Leistungen brauchst du?</h2>
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
      <p className="text-green text-xs font-semibold uppercase tracking-wider mb-2">Frage 6 von 6</p>
      <h2 className="text-xl sm:text-2xl font-bold text-dark mb-2">Was ist gerade deine gr&ouml;&szlig;te Herausforderung?</h2>
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

function StepShop({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <p className="text-green text-xs font-semibold uppercase tracking-wider mb-2">Letzte Frage</p>
      <h2 className="text-xl sm:text-2xl font-bold text-dark mb-2">Welches Shopsystem nutzt du?</h2>
      <p className="text-gray-400 text-sm mb-6">W&auml;hle dein aktuelles System.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SHOP_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          return (
            <OptionCard key={opt.value} selected={value === opt.value} onClick={() => onChange(opt.value)} icon={<Icon className="w-5 h-5" />} label={opt.label} />
          );
        })}
      </div>
    </div>
  );
}

function StepContact({ formData, updateField }: { formData: StartupFormData; updateField: <K extends keyof StartupFormData>(key: K, value: StartupFormData[K]) => void }) {
  const emailInvalid = formData.email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  return (
    <div>
      <p className="text-green text-xs font-semibold uppercase tracking-wider mb-1">Super! Klingt nach einem spannenden Projekt</p>
      <h2 className="text-xl sm:text-2xl font-bold text-dark mb-2">Wie k&ouml;nnen wir dich erreichen?</h2>
      <p className="text-gray-400 text-sm mb-6">Wir melden uns zeitnah mit einem unverbindlichen Angebot.</p>
      <div className="space-y-4">
        <InputField label="Vor- und Nachname *" value={formData.name} onChange={(v) => updateField("name", v)} placeholder="Vor- und Nachname" icon={<User className="w-4 h-4" />} />
        <InputField label="Unternehmensname / Marke" value={formData.company} onChange={(v) => updateField("company", v)} placeholder="Dein Brand-Name" icon={<Building2 className="w-4 h-4" />} />
        <div>
          <InputField label="E-Mail-Adresse *" value={formData.email} onChange={(v) => updateField("email", v)} placeholder="deine@email.de" type="email" icon={<Mail className="w-4 h-4" />} />
          {emailInvalid && <p className="text-red-500 text-xs mt-1">Bitte gib eine g&uuml;ltige E-Mail-Adresse ein.</p>}
        </div>
        <InputField label="Telefonnummer *" value={formData.phone} onChange={(v) => updateField("phone", v)} placeholder="+49 ..." type="tel" icon={<Phone className="w-4 h-4" />} />
        <InputField label="Website / Shop-URL" value={formData.website} onChange={(v) => updateField("website", v)} placeholder="https://dein-shop.de" icon={<Globe className="w-4 h-4" />} />
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
