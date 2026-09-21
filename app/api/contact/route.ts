import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body ?? {};

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Vul alle velden in." }, { status: 400 });
    }

    const emailValid = /\S+@\S+\.\S+/.test(email);
    if (!emailValid) {
      return NextResponse.json({ error: "Ongeldig e-mailadres." }, { status: 400 });
    }

    // Hier kun je e-mail versturen of berichten opslaan. Voor nu loggen we het bericht.
    // Belangrijk: geen gevoelige data in productie logs.
    console.log("Contact bericht ontvangen:", { name, email, message });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Serverfout" }, { status: 500 });
  }
}

export const runtime = "edge";
