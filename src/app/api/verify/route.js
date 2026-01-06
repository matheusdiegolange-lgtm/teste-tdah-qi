import { stripeServer } from "@/lib/stripe/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");
    if (!sessionId) return Response.json({ error: "session_id faltando." }, { status: 400 });

    const stripe = stripeServer();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const attemptId = session?.metadata?.attempt_id;
    if (!attemptId) return Response.json({ error: "Metadados inválidos." }, { status: 400 });

    const paid = session.payment_status === "paid";

    const sb = supabaseAdmin();

    if (paid) {
      // Mark paid
      await sb.from("attempts").update({ paid: true }).eq("id", attemptId);
    }

    const { data, error } = await sb
      .from("attempts")
      .select("score,max_score,payload,paid,test_type")
      .eq("id", attemptId)
      .single();

    if (error || !data) return Response.json({ error: "Tentativa não encontrada." }, { status: 404 });

    const report = data.payload?.report || {};
    const pct = report?.pct ?? Math.round((data.score / Math.max(1, data.max_score)) * 100);

    return Response.json({
      paid: !!data.paid,
      score: data.score,
      max: data.max_score,
      pct,
      level: report.level || "",
      summary: report.summary || "",
      tips: report.tips || [],
      testType: data.test_type,
    });
  } catch (e) {
    return Response.json({ error: e?.message || "Erro" }, { status: 400 });
  }
}
