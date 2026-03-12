import { NextResponse } from "next/server";

interface StartupPayload {
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

const BUSINESS_LABELS: Record<string, string> = {
  onlineshop: "Online-Shop",
  d2c: "D2C Brand",
  subscription: "Subscription Box",
  marketplace: "Marktplatz-Seller",
  sonstiges: "Sonstiges",
};

const PRODUCT_LABELS: Record<string, string> = {
  fashion: "Fashion & Accessoires",
  beauty: "Beauty & Pflege",
  food: "Food & Drinks",
  tech: "Tech & Gadgets",
  home: "Home & Living",
  sonstiges: "Sonstiges",
};

const VOLUME_LABELS: Record<string, string> = {
  lt50: "<50 / Monat",
  "50-200": "50–200 / Monat",
  "200-1000": "200–1.000 / Monat",
  gt1000: ">1.000 / Monat",
};

const GROWTH_LABELS: Record<string, string> = {
  gerade_gestartet: "Gerade gestartet",
  wachstum: "Starkes Wachstum",
  stabil: "Stabil, will skalieren",
  peak_vorbereitung: "Peak-Vorbereitung",
};

const SERVICE_LABELS: Record<string, string> = {
  pickpack: "Pick & Pack",
  lagerung: "Lagerung & Warehousing",
  retouren: "Retourenabwicklung",
  shopintegration: "Shop-Integration",
  verpackung: "Individuelle Verpackung",
  versandoptimierung: "Versandoptimierung",
};

const CHALLENGE_LABELS: Record<string, string> = {
  zeit: "Keine Zeit für Versand",
  kosten: "Versandkosten zu hoch",
  skalierung: "Kann nicht skalieren",
  qualitaet: "Verpackungsqualität",
  retouren: "Zu viele Retouren",
  platz: "Kein Lagerplatz mehr",
};

const SHOP_LABELS: Record<string, string> = {
  shopify: "Shopify",
  shopware: "Shopware",
  woocommerce: "WooCommerce",
  amazon: "Amazon FBA/FBM",
  eigenloesung: "Eigenlösung / API",
  noch_keins: "Noch keins / in Planung",
};

const BUDGET_LABELS: Record<string, string> = {
  lt500: "<500 €",
  "500-2000": "500–2.000 €",
  "2000-5000": "2.000–5.000 €",
  gt5000: ">5.000 €",
};

function buildEmailHtml(data: StartupPayload): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #005280; padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #fff; margin: 0; font-size: 20px;">Neue Startup-Anfrage über den Fulfillment-Funnel</h1>
      </div>
      <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6b7280; width: 180px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${data.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">E-Mail</td><td style="padding: 8px 0;">${data.email}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Telefon</td><td style="padding: 8px 0; font-weight: 600;">${data.phone}</td></tr>
          ${data.company ? `<tr><td style="padding: 8px 0; color: #6b7280;">Unternehmen / Marke</td><td style="padding: 8px 0;">${data.company}</td></tr>` : ""}
          ${data.website ? `<tr><td style="padding: 8px 0; color: #6b7280;">Website</td><td style="padding: 8px 0;">${data.website}</td></tr>` : ""}
          <tr><td colspan="2" style="padding: 16px 0 8px; border-top: 1px solid #e5e7eb;"><strong>Fulfillment-Angaben</strong></td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Geschäftsmodell</td><td style="padding: 8px 0;">${BUSINESS_LABELS[data.businessModel] || data.businessModel}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Produkte</td><td style="padding: 8px 0;">${data.productType.map((p) => PRODUCT_LABELS[p] || p).join(", ")}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Bestellvolumen</td><td style="padding: 8px 0;">${VOLUME_LABELS[data.orderVolume] || data.orderVolume}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Wachstumsphase</td><td style="padding: 8px 0;">${GROWTH_LABELS[data.growthPlan] || data.growthPlan}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Gew. Leistungen</td><td style="padding: 8px 0;">${data.services.map((s) => SERVICE_LABELS[s] || s).join(", ")}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Herausforderungen</td><td style="padding: 8px 0;">${data.challenges.map((c) => CHALLENGE_LABELS[c] || c).join(", ")}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Shopsystem</td><td style="padding: 8px 0;">${SHOP_LABELS[data.shopSystem] || data.shopSystem}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Budget / Monat</td><td style="padding: 8px 0;">${BUDGET_LABELS[data.budget] || data.budget}</td></tr>
        </table>
      </div>
      <p style="color: #9ca3af; font-size: 12px; margin-top: 16px; text-align: center;">
        Gesendet &uuml;ber den Huckschlag Startup-Funnel &middot; ${new Date().toLocaleDateString("de-DE")}
      </p>
    </div>
  `;
}

export async function POST(request: Request) {
  try {
    const data: StartupPayload = await request.json();

    // Validate required fields
    if (
      !data.businessModel ||
      !data.productType?.length ||
      !data.orderVolume ||
      !data.growthPlan ||
      !data.services?.length ||
      !data.challenges?.length ||
      !data.shopSystem ||
      !data.name ||
      !data.email ||
      !data.phone
    ) {
      return NextResponse.json({ error: "Bitte fülle alle Pflichtfelder aus." }, { status: 400 });
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json({ error: "Bitte gib eine gültige E-Mail-Adresse ein." }, { status: 400 });
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
          subject: `Neue Startup-Anfrage: ${data.name}${data.company ? ` — ${data.company}` : ""} (${BUSINESS_LABELS[data.businessModel] || data.businessModel})`,
          html: buildEmailHtml(data),
          data,
        }),
      });
    }

    // Server-side log for backup
    console.log("[LEAD-STARTUP]", JSON.stringify({
      timestamp: new Date().toISOString(),
      funnel: "startup",
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      website: data.website,
      businessModel: data.businessModel,
      productType: data.productType,
      orderVolume: data.orderVolume,
      growthPlan: data.growthPlan,
      services: data.services,
      challenges: data.challenges,
      shopSystem: data.shopSystem,
      budget: data.budget,
    }));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[LEAD-STARTUP ERROR]", err);
    return NextResponse.json({ error: "Ein Fehler ist aufgetreten. Bitte versuche es erneut." }, { status: 500 });
  }
}
