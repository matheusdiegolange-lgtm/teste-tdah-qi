"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Card from "@/components/Card";
import Notice from "@/components/Notice";

export default function Result() {
  const sp = useSearchParams();
  const sessionId = sp.get("session_id");
  const [state, setState] = useState({ loading: true });

  useEffect(() => {
    async function run() {
      const res = await fetch(
        `/api/verify?session_id=${encodeURIComponent(sessionId || "")}`
      );
      const data = await res.json();
      setState({ loading: false, ...data });
    }
    if (sessionId) run();
    else setState({ loading: false, error: "Sessão inválida." });
  }, [sessionId]);

  if (state.loading)
    return (
      <main className="min-h-screen p-4">
        <div className="mx-auto max-w-xl">
          <Card>Verificando pagamento…</Card>
        </div>
      </main>
    );

  if (state.error)
    return (
      <main className="min-h-screen p-4">
        <div className="mx-auto max-w-xl">
          <Card>
            <p className="text-rose-600 font-semibold">{state.error}</p>
            <a className="mt-4 inline-flex underline text-emerald-700" href="/">
              Voltar
            </a>
          </Card>
        </div>
      </main>
    );

  if (!state.paid)
    return (
      <main className="min-h-screen p-4">
        <div className="mx-auto max-w-xl">
          <Card>
            <h1 className="text-xl font-bold">Pagamento não confirmado</h1>
            <p className="mt-2 text-zinc-600">
              Se você acabou de pagar, espere alguns segundos e atualize.
            </p>
            <a className="mt-4 inline-flex underline text-emerald-700" href="/">
              Voltar
            </a>
          </Card>
        </div>
      </main>
    );

  return (
    <main className="min-h-screen p-4">
      <div className="mx-auto max-w-xl space-y-4">
        <Card>
          <h1 className="text-2xl font-bold">Resultado liberado 🎉</h1>
          <p className="mt-2 text-zinc-700">
            Pontuação: <b>{state.score}</b> / <b>{state.max}</b> ({state.pct}%)
          </p>

          <div className="mt-4 rounded-xl bg-zinc-50 p-4">
            <p className="font-semibold">{state.level}</p>
            <p className="mt-2 text-zinc-700">{state.summary}</p>
            {Array.isArray(state.tips) && state.tips.length > 0 && (
              <ul className="mt-3 list-disc pl-5 text-zinc-700">
                {state.tips.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            )}
          </div>

          <Notice />
          <a className="mt-4 inline-flex underline text-emerald-700" href="/">
            Voltar ao início
          </a>
        </Card>
      </div>
    </main>
  );
}
