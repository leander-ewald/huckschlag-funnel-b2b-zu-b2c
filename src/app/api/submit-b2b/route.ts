import { NextResponse } from "next/server";

interface B2BPayload {
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

const INDUSTRY_LABELS: Record<string, string> = {
  automotive: "Automotive & Zulieferer",
  pharma: "Pharma & Healthcare",
  handel: "Handel & Retail",
  industrie: "Produktion & Industrie",
  food: "Food & Beverage",
  sonstiges: "Sonstiges",
};

const SHIPMENT_LABELS: Record<string, string> = {
  paletten: "Palettenware",
  stueckgut: "Stückgut",
  teilladung: "Teil- & Komplettladungen",
  container: "Containerware",
  sonderware: "Sonder- & Gefahrgut",
};

const VOLUME_LABELS: Record<string, string> = {
  lt50: "<50 Paletten",
  "50-200": "50–200 Paletten",
  "200-1000": "200–1.000 Paletten",
  gt1000: ">1.000 Paletten",
};

const SERVICE_LABELS: Record<string, string> = {
  kontraktlogistik: "Kontraktlogistik",
  warehousing: "Warehousing & Lagerung",
  distribution: "Distribution & Transport",
  kommissionierung: "Kommissionierung",
  vas: "Value-Added-Services",
  retouren: "Retourenmanagement",
};

const CHALLENGE_LABELS: Record<string, string> = {
  kapazitaet: "Kapazitätsengpässe",
  kosten: "Zu hohe Logistikkosten",
  transparenz: "Mangelnde Transparenz",
  skalierung: "Skalierung schwierig",
  qualitaet: "Qualitätsprobleme",
  geschwindigkeit: "Zu langsame Prozesse",
};

const REGION_LABELS: Record<string, string> = {
  regional: "Regional (NRW)",
  deutschland: "Deutschlandweit",
  dach: "DACH-Raum",
  eu: "EU-weit",
  international: "International",
};

const SETUP_LABELS: Record<string, string> = {
  eigene: "Eigene Logistik",
  extern: "Externer Dienstleister",
  mix: "Mix aus beidem",
  aufbau: "Im Aufbau / Neu",
};

const BUDGET_LABELS: Record<string, string> = {
  lt5000: "<5.000 €",
  "5000-20000": "5.000–20.000 €",
  "20000-100000": "20.000–100.000 €",
  gt100000: ">100.000 €",
};

function buildEmailHtml(data: B2BPayload): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #005280; padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #fff; margin: 0; font-size: 20px;">Neue B2B-Anfrage über den Industrie-Funnel</h1>
      </div>
      <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6b7280; width: 180px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${data.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Unternehmen</td><td style="padding: 8px 0; font-weight: 600;">${data.company}</td></tr>
          ${data.position ? `<tr><td style="padding: 8px 0; color: #6b7280;">Position</td><td style="padding: 8px 0;">${data.position}</td></tr>` : ""}
          <tr><td style="padding: 8px 0; color: #6b7280;">E-Mail</td><td style="padding: 8px 0;">${data.email}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Telefon</td><td style="padding: 8px 0; font-weight: 600;">${data.phone}</td></tr>
          <tr><td colspan="2" style="padding: 16px 0 8px; border-top: 1px solid #e5e7eb;"><strong>Logistik-Anforderungen</strong></td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Branche</td><td style="padding: 8px 0;">${INDUSTRY_LABELS[data.industry] || data.industry}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Güterart</td><td style="padding: 8px 0;">${data.shipmentType.map((s) => SHIPMENT_LABELS[s] || s).join(", ")}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Volumen / Monat</td><td style="padding: 8px 0;">${VOLUME_LABELS[data.volume] || data.volume}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Gew. Leistungen</td><td style="padding: 8px 0;">${data.services.map((s) => SERVICE_LABELS[s] || s).join(", ")}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Herausforderungen</td><td style="padding: 8px 0;">${data.challenges.map((c) => CHALLENGE_LABELS[c] || c).join(", ")}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Region</td><td style="padding: 8px 0;">${REGION_LABELS[data.region] || data.region}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Anforderungen</td><td style="padding: 8px 0;">${data.requirements}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Aktuelle Logistik</td><td style="padding: 8px 0;">${SETUP_LABELS[data.currentSetup] || data.currentSetup}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Budget / Monat</td><td style="padding: 8px 0;">${BUDGET_LABELS[data.budget] || data.budget}</td></tr>
        </table>
      </div>
      <p style="color: #9ca3af; font-size: 12px; margin-top: 16px; text-align: center;">
        Gesendet &uuml;ber den Huckschlag B2B-Funnel &middot; ${new Date().toLocaleDateString("de-DE")}
      </p>
    </div>
  `;
}

export async function POST(request: Request) {
  try {
    const data: B2BPayload = await request.json();

    // Validate required fields
    if (
      !data.industry ||
      !data.shipmentType?.length ||
      !data.volume ||
      !data.services?.length ||
      !data.challenges?.length ||
      !data.region ||
      !data.requirements?.trim() ||
      !data.currentSetup ||
      !data.name ||
      !data.company ||
      !data.email ||
      !data.phone
    ) {
      return NextResponse.json({ error: "Bitte füllen Sie alle Pflichtfelder aus." }, { status: 400 });
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json({ error: "Bitte geben Sie eine gültige E-Mail-Adresse ein." }, { status: 400 });
    }

    // Send notification via webhook
    const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;
    const emailTo = process.env.NOTIFICATION_EMAIL || "info@huckschlag-transporte.de";

    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: emailTo,
          subject: `Neue B2B-Anfrage: ${data.company} — ${data.name} (${INDUSTRY_LABELS[data.industry] || data.industry})`,
          html: buildEmailHtml(data),
          data,
        }),
      });
    }

    // Server-side log for backup
    console.log("[LEAD-B2B]", JSON.stringify({
      timestamp: new Date().toISOString(),
      funnel: "b2b",
      name: data.name,
      company: data.company,
      position: data.position,
      email: data.email,
      phone: data.phone,
      industry: data.industry,
      shipmentType: data.shipmentType,
      volume: data.volume,
      services: data.services,
      challenges: data.challenges,
      region: data.region,
      requirements: data.requirements,
      currentSetup: data.currentSetup,
      budget: data.budget,
    }));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[LEAD-B2B ERROR]", err);
    return NextResponse.json({ error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut." }, { status: 500 });
  }
}
