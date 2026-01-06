export function scoreAdhd(answers) {
  const score = answers.reduce((s, v) => s + (v ?? 0), 0);
  const max = answers.length * 4;
  const pct = Math.round((score / max) * 100);

  let level = "Baixa probabilidade (padrão leve)";
  let summary =
    "Suas respostas sugerem poucos sinais consistentes de dificuldades significativas de atenção/organização no momento.";
  let tips = [
    "Use checklists curtos para tarefas repetitivas.",
    "Separe tarefas longas em blocos de 10–20 minutos.",
    "Mantenha um único lugar fixo para itens essenciais.",
  ];

  if (pct >= 35 && pct < 55) {
    level = "Sinais leves a moderados";
    summary =
      "Suas respostas sugerem dificuldades ocasionais em foco, organização e/ou impulsividade. Pode valer observar padrões e gatilhos.";
    tips = [
      "Blocos curtos de foco + pausas programadas.",
      "Agenda/alarme para compromissos e contas.",
      "Reduza distrações (notificações, abas).",
    ];
  } else if (pct >= 55 && pct < 75) {
    level = "Sinais moderados a altos";
    summary =
      "Há vários indicadores de dificuldade de atenção/organização e/ou inquietude. Se isso atrapalha a vida, considere avaliação profissional.";
    tips = [
      "Rotina simples: 3 prioridades por dia.",
      "Revisão rápida no fim do dia (5 min).",
      "Considere suporte profissional, se necessário.",
    ];
  } else if (pct >= 75) {
    level = "Sinais altos (impacto provável)";
    summary =
      "Suas respostas indicam muitos sinais consistentes. Isso não é diagnóstico, mas sugere que vale avaliação profissional.";
    tips = [
      "Procure avaliação com psiquiatra/psicólogo.",
      "Anote exemplos práticos do dia a dia.",
      "Combine rotina, suporte e, se for o caso, tratamento.",
    ];
  }

  return { score, max, pct, level, summary, tips };
}
