"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import TestShell from "@/components/TestShell";
import Notice from "@/components/Notice";
import { LIKERT } from "@/lib/likert";
import { adhdQuestions } from "@/data/adhd_questions";

export default function TdahTest() {
  const router = useRouter();
  const total = adhdQuestions.length;
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState(Array(total).fill(null));
  const [loading, setLoading] = useState(false);

  const scorePreview = useMemo(
    () => answers.reduce((s, v) => s + (v ?? 0), 0),
    [answers]
  );

  async function pick(val) {
    const next = [...answers];
    next[idx] = val;
    setAnswers(next);

    if (idx < total - 1) setIdx(idx + 1);
    else {
      setLoading(true);
      const res = await fetch("/api/attempt/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testType: "adhd", answers: next }),
      });
      const data = await res.json();
      setLoading(false);
      if (data?.attemptId) router.push(`/paywall?attempt=${data.attemptId}`);
      else alert(data?.error || "Erro ao criar tentativa.");
    }
  }

  const q = adhdQuestions[idx];

  return (
    <main className="min-h-screen p-4">
      <TestShell title="Teste de TDAH (triagem)" idx={idx} total={total}>
        <h1 className="text-2xl font-extrabold leading-tight">{q.text}</h1>

        <div className="mt-5 space-y-3">
          {LIKERT.map((opt) => (
            <button
              key={opt.label}
              className={`w-full rounded-xl px-4 py-4 text-left text-lg font-semibold ${opt.cls}`}
              onClick={() => pick(opt.score)}
              disabled={loading}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="mt-5 flex gap-3">
          <button
            className="w-1/2 rounded-xl bg-zinc-200 py-3 font-semibold disabled:opacity-40"
            onClick={() => setIdx((v) => Math.max(0, v - 1))}
            disabled={idx === 0 || loading}
          >
            Voltar
          </button>
          <button
            className="w-1/2 rounded-xl bg-zinc-900 py-3 font-semibold text-white disabled:opacity-40"
            onClick={() => setIdx((v) => Math.min(total - 1, v + 1))}
            disabled={idx === total - 1 || loading}
          >
            Próxima
          </button>
        </div>

        <div className="mt-3 text-xs text-zinc-500">
          Progresso: {idx + 1}/{total} • Pontos parciais (debug): {scorePreview}
        </div>
        <Notice />
      </TestShell>
    </main>
  );
}
