import { z } from "zod";
import { stripeServer } from "@/lib/stripe/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

const Schema = z.object({ attemptId: z.string().uuid() });

export async function POST(req) {
  try {
    const body = await req.json();
    const { attemptId } = Schema.parse(body);

    const sb = supabaseAdmin();
    const { data, error } = await sb
      .from("attempts")
      .select("id,test_type,paid")
      .eq("id", attemptId)
      .single();

    if (error || !data) {
      return Response.json({ error: "Tentativa não encontrada." }, { status: 404 });
    }

    if (data.paid) {
      return Response.json({ error: "Essa tentativa já foi paga." }, { status: 400 });
    }

    const currency = (process.env.CURRENCY || "usd").toLowerCase();
    const priceAdhd = parseInt(process.env.PRICE_ADHD_CENTS || "999", 10);
    const priceIq = parseInt(process.env.PRICE_IQ_CENTS || "999", 10);
    const amount = data.test_type === "adhd" ? priceAdhd : priceIq;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const stripe = stripeServer();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: data.test_type === "adhd" ? "Relatório — Teste de TDAH" : "Relatório — Teste de Raciocínio",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      metadata: { attempt_id: attemptId, test_type: data.test_type },
      success_url: `${baseUrl}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/paywall?attempt=${attemptId}`,
    });

    await sb
      .from("attempts")
      .update({ stripe_session_id: session.id })
      .eq("id", attemptId);

    return Response.json({ url: session.url });
  } catch (e) {
    return Response.json({ error: e?.message || "Erro" }, { status: 400 });
  }
}
