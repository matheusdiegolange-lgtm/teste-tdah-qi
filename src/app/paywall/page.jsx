"use client";
import { useSearchParams } from "next/navigation";
import Card from "@/components/Card";
import Notice from "@/components/Notice";

export default function Paywall() {
  const sp = useSearchParams();
  const attemptId = sp.get("attempt");

  async function goPay() {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attemptId }),
    });
    const data = await res.json();
    if (data?.url) window.location.href = data.url;
    else alert(data?.error || "Erro no checkout.");
  }

  return (
    <main className="min-h-screen p-4">
      <div className="mx-auto max-w-xl space-y-4">
        <Card>
          <h1 className="text-2xl font-bold">Seu resultado está pronto ✅</h1>
          <p className="mt-2 text-zinc-600">
            Para liberar o relatório completo, finalize o pagamento.
          </p>

          <div className="mt-4 rounded-xl bg-zinc-50 p-4 text-sm text-zinc-700">
            Inclui: pontuação, interpretação e recomendações práticas.
          </div>

          <button
            className="mt-5 w-full rounded-xl bg-emerald-700 py-3 font-semibold text-white disabled:opacity-40"
            onClick={goPay}
            disabled={!attemptId}
          >
            Desbloquear resultado
          </button>

          {!attemptId && (
            <p className="mt-3 text-sm text-rose-600">
              Falta o ID da tentativa. Volte e finalize o teste.
            </p>
          )}

          <Notice />
          <a className="mt-4 inline-flex underline text-emerald-700" href="/">
            Voltar ao início
          </a>
        </Card>
      </div>
    </main>
  );
}
