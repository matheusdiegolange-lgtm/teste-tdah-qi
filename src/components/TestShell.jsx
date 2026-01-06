import Progress from "@/components/Progress";
import Badge from "@/components/Badge";

export default function TestShell({ title, idx, total, children }) {
  const pct = Math.round(((idx + 1) / total) * 100);
  return (
    <div className="mx-auto max-w-xl">
      <div className="pt-2">
        <Badge>{title}</Badge>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-lg font-bold">Pergunta {idx + 1} de {total}</div>
          <div className="text-sm text-zinc-500">{pct}%</div>
        </div>
        <Progress value={pct} />
      </div>
      <div className="mt-4 rounded-2xl bg-white p-6 shadow-soft">{children}</div>
    </div>
  );
}
