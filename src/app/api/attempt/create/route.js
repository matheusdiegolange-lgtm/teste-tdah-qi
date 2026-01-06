import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { scoreAdhd } from "@/lib/scoring/adhd";
import { scoreIq } from "@/lib/scoring/iq";
import { adhdQuestions } from "@/data/adhd_questions";
import { iqQuestions } from "@/data/iq_questions";
import { randomUUID } from "crypto";

const Schema = z.object({
  testType: z.enum(["adhd", "iq"]),
  answers: z.array(z.any()),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const parsed = Schema.parse(body);

    const id = randomUUID();

    let score = 0;
    let max = 0;
    let payload = {};

    if (parsed.testType === "adhd") {
      const answers = parsed.answers.map((v) => (typeof v === "number" ? v : 0));
      const r = scoreAdhd(answers);
      score = r.score;
      max = r.max;
      payload = { answers, report: r, questions: adhdQuestions };
    } else {
      const answers = parsed.answers.map((v) => (typeof v === "number" ? v : -1));
      const r = scoreIq(answers, iqQuestions);
      score = r.correct;
      max = r.max;
      payload = { answers, report: r, questions: iqQuestions };
    }

    const sb = supabaseAdmin();
    const { error } = await sb.from("attempts").insert({
      id,
      test_type: parsed.testType,
      score,
      max_score: max,
      payload,
      paid: false,
    });

    if (error) return Response.json({ error: error.message }, { status: 400 });
    return Response.json({ attemptId: id });
  } catch (e) {
    return Response.json({ error: e?.message || "Erro" }, { status: 400 });
  }
}
