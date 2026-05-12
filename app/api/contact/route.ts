import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const MAX_LEN = 5000;

export async function POST(request: Request) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Contact storage is not configured." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const { name, email, company, service, message } = body as Record<
    string,
    unknown
  >;

  if (typeof name !== "string" || name.trim().length < 1) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (typeof email !== "string" || email.trim().length < 3) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  if (!emailOk) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const row = {
    name: name.trim().slice(0, 200),
    email: email.trim().toLowerCase().slice(0, 320),
    company:
      typeof company === "string" && company.trim()
        ? company.trim().slice(0, 200)
        : null,
    service:
      typeof service === "string" && service.trim()
        ? service.trim().slice(0, 200)
        : null,
    message:
      typeof message === "string" && message.trim()
        ? message.trim().slice(0, MAX_LEN)
        : null,
  };

  const { error } = await supabase.from("client_contacts").insert(row);

  if (error) {
    console.error("[contact]", error.message);
    return NextResponse.json(
      { error: "Could not save your message. Try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
