import { NextResponse } from "next/server";

interface SubmitPayload {
  deliveryVolume: string;
  goodsTypes: string[];
  targetAudience: string;
  services: string[];
  challenges: string[];
  region: string;
  productDescription: string;
  shopSystem: string;
  budget: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  privacy: boolean;
}

const DELIVERY_LABELS: Record<string, string> = {
  lt100: "<100",
  "100-1000": "100–1.000",
  "1000-5000": "1.000–5.000",
  gt5000: ">5.000",
};

const GOODS_LABELS: Record<string, string> = {
  konsumgueter: "Konsumgüter",
  elektronik: "Elektronik",
  kosmetik: "Kosmetik & Pflegeprodukte",
  haushalt: "Haushaltswaren",
  buecher: "Bücher & Medien",
  nahrungsmittel: "Nahrungsmittel",
  sonstiges_waren: "Sonstiges",
};

const TARGET_LABELS: Record<string, string> = {
  b2b: "B2B",
  b2c: "B2C",
  beides: "Beides",
};

const SERVICE_LABELS: Record<string, string> = {
  standard: "Standardversand",
  express: "Expressversand",
  sameday: "Same / Next-Day",
  palette: "Palettenversand",
  lagerung: "Lagerung",
  retouren: "Retourenlogistik",
};

const CHALLENGE_LABELS: Record<string, string> = {
  onemanshow: "One Man Show",
  unzuverlaessig: "Unzuverlässige Spedition",
  kosten: "Zu hohe Kosten",
  skalierbarkeit: "Skalierbarkeit fehlt",
  retouren: "Viele Retouren",
};

const REGION_LABELS: Record<string, string> = {
  deutschland: "Deutschlandweit",
  dach: "DACH",
  eu: "EU-weit",
  international: "International",
};

const SHOP_LABELS: Record<string, string> = {
  shopify: "Shopify",
  shopware: "Shopware",
  woocommerce: "WooCommerce",
  magento: "Magento",
  eigenloesung: "Eigenlösung",
  sonstiges_shop: "Sonstiges",
};

const BUDGET_LABELS: Record<string, string> = {
  lt1000: "<1.000 €",
  "1000-5000": "1.000–5.000 €",
  "5000-20000": "5.000–20.000 €",
  gt20000: ">20.000 €",
};

function buildEmailHtml(data: SubmitPayload): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #005280; padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #fff; margin: 0; font-size: 20px;">Neue Anfrage über den Logistik-Funnel</h1>
      </div>
      <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6b7280; width: 180px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${data.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">E-Mail</td><td style="padding: 8px 0;">${data.email}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Telefon</td><td style="padding: 8px 0; font-weight: 600;">${data.phone}</td></tr>
          ${data.company ? `<tr><td style="padding: 8px 0; color: #6b7280;">Unternehmen</td><td style="padding: 8px 0;">${data.company}</td></tr>` : ""}
          ${data.website ? `<tr><td style="padding: 8px 0; color: #6b7280;">Website</td><td style="padding: 8px 0;">${data.website}</td></tr>` : ""}
          <tr><td colspan="2" style="padding: 16px 0 8px; border-top: 1px solid #e5e7eb;"><strong>Angaben zur Logistik</strong></td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Lieferpositionen / Monat</td><td style="padding: 8px 0;">${DELIVERY_LABELS[data.deliveryVolume] || data.deliveryVolume}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Warenart</td><td style="padding: 8px 0;">${data.goodsTypes.map((g) => GOODS_LABELS[g] || g).join(", ")}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Zielgruppe</td><td style="padding: 8px 0;">${TARGET_LABELS[data.targetAudience] || data.targetAudience}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Gew. Leistungen</td><td style="padding: 8px 0;">${data.services.map((s) => SERVICE_LABELS[s] || s).join(", ")}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Herausforderungen</td><td style="padding: 8px 0;">${data.challenges.map((c) => CHALLENGE_LABELS[c] || c).join(", ")}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Lieferregion</td><td style="padding: 8px 0;">${REGION_LABELS[data.region] || data.region}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Produkte / SKU</td><td style="padding: 8px 0;">${data.productDescription}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Shopsystem</td><td style="padding: 8px 0;">${SHOP_LABELS[data.shopSystem] || data.shopSystem}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Versandbudget / Monat</td><td style="padding: 8px 0;">${BUDGET_LABELS[data.budget] || data.budget}</td></tr>
        </table>
      </div>
      <p style="color: #9ca3af; font-size: 12px; margin-top: 16px; text-align: center;">
        Gesendet &uuml;ber den Huckschlag Logistik-Funnel &middot; ${new Date().toLocaleDateString("de-DE")}
      </p>
    </div>
  `;
}

export async function POST(request: Request) {
  try {
    const data: SubmitPayload = await request.json();

    // Validate required fields
    if (
      !data.deliveryVolume ||
      !data.goodsTypes?.length ||
      !data.targetAudience ||
      !data.services?.length ||
      !data.challenges?.length ||
      !data.region ||
      !data.productDescription?.trim() ||
      !data.shopSystem ||
      !data.budget ||
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
          subject: `Neue Logistik-Anfrage: ${data.name} — ${DELIVERY_LABELS[data.deliveryVolume] || data.deliveryVolume} Positionen/Monat`,
          html: buildEmailHtml(data),
          data,
        }),
      });
    }

    // Server-side log for backup
    console.log("[LEAD]", JSON.stringify({
      timestamp: new Date().toISOString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      website: data.website,
      deliveryVolume: data.deliveryVolume,
      goodsTypes: data.goodsTypes,
      targetAudience: data.targetAudience,
      services: data.services,
      challenges: data.challenges,
      region: data.region,
      productDescription: data.productDescription,
      shopSystem: data.shopSystem,
      budget: data.budget,
    }));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[LEAD ERROR]", err);
    return NextResponse.json({ error: "Ein Fehler ist aufgetreten. Bitte versuche es erneut." }, { status: 500 });
  }
}
