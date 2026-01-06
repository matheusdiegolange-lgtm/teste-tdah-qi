import Card from "@/components/Card";

export default function Legal() {
  return (
    <main className="min-h-screen p-4">
      <div className="mx-auto max-w-xl space-y-4">
        <Card>
          <h1 className="text-2xl font-bold">Avisos legais</h1>
          <p className="mt-3 text-zinc-700">
            Este site oferece questionários educativos e informativos. Eles não são diagnóstico médico,
            nem substituem avaliação clínica com profissional de saúde.
          </p>
          <p className="mt-3 text-zinc-700">
            O “Teste de Raciocínio” é um quiz de lógica/padrões e não é um teste de QI padronizado oficial.
          </p>
          <a className="mt-4 inline-flex underline text-emerald-700" href="/">
            Voltar
          </a>
        </Card>
      </div>
    </main>
  );
}
