"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import TestShell from "@/components/TestShell";
import Notice from "@/components/Notice";
import { iqQuestions } from "@/data/iq_questions";

export default function RaciocinioTest() {
  const router = useRouter();
  const total = iqQuestions.length;
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState(Array(total).fill(null));
  const [loading, setLoading] = useState(false);

  const answeredCount = useMemo(
    () => answers.filter((x) => x !== null).length,
    [answers]
  );

  async function pick(choiceIndex) {
    const next = [...answers];
    next[idx] = choiceIndex;
    setAnswers(next);

    if (idx < total - 1) setIdx(idx + 1);
    else {
      setLoading(true);
      const res = await fetch("/api/attempt/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testType: "iq", answers: next }),
      });
      const data = await res.json();
      setLoading(false);
      if (data?.attemptId) router.push(`/paywall?attempt=${data.attemptId}`);
      else alert(data?.error || "Erro ao criar tentativa.");
    }
  }

  const q = iqQuestions[idx];

  return (
    <main className="min-h-screen p-4">
      <TestShell title="Teste de Raciocínio (estimativa)" idx={idx} total={total}>
        <h1 className="text-2xl font-extrabold leading-tight">{q.prompt}</h1>

        <div className="mt-5 space-y-3">
          {q.options.map((opt, i) => (
            <button
              key={opt}
              className={`w-full rounded-xl px-4 py-4 text-left text-lg font-semibold ${
                i === 0
                  ? "bg-emerald-200"
                  : i === 1
                  ? "bg-emerald-100"
                  : i === 2
                  ? "bg-yellow-100"
                  : "bg-rose-100"
              }`}
              onClick={() => pick(i)}
              disabled={loading}
            >
              {opt}
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
          Respondidas: {answeredCount}/{total}
        </div>

        <Notice />
      </TestShell>
    </main>
  );
}
