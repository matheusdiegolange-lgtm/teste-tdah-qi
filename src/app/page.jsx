import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Notice from "@/components/Notice";

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <div className="mx-auto max-w-xl space-y-4">
        <div className="pt-2">
          <Badge>Mobile-first • 1 pergunta por tela • Paywall no final</Badge>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight">MindCheck</h1>
          <p className="mt-2 text-zinc-600">
            Escolha um teste, responda tudo e desbloqueie o relatório final no fim.
          </p>
        </div>

        <Card>
          <h2 className="text-xl font-bold">Teste de TDAH (triagem)</h2>
          <p className="mt-2 text-zinc-600">
            30 afirmações sobre atenção, impulsividade e organização.
          </p>
          <a
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-emerald-700 py-3 font-semibold text-white"
            href="/t/tdah"
          >
            Começar teste de TDAH
          </a>
        </Card>

        <Card>
          <h2 className="text-xl font-bold">Teste de Raciocínio (estimativa)</h2>
          <p className="mt-2 text-zinc-600">
            20 questões de lógica e padrões. <b>Não é QI oficial.</b>
          </p>
          <a
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-zinc-900 py-3 font-semibold text-white"
            href="/t/raciocinio"
          >
            Começar teste de Raciocínio
          </a>
        </Card>

        <Notice />

        <div className="pb-6 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} MindCheck •{" "}
          <a className="underline" href="/legal">
            Legal
          </a>
        </div>
      </div>
    </main>
  );
}
