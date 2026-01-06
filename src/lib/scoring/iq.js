export function scoreIq(answers, questions) {
  let correct = 0;
  questions.forEach((q, i) => {
    if (answers[i] === q.answer) correct += 1;
  });
  const max = questions.length;
  const pct = Math.round((correct / max) * 100);

  let level = "Desempenho inicial";
  let summary =
    "Resultado de um quiz de raciocínio. Varia com cansaço, atenção e familiaridade com testes.";
  let tips = [
    "Refaça em outro dia descansado.",
    "Leia com calma e confira alternativas.",
    "Treine padrões e sequências.",
  ];

  if (pct >= 40 && pct < 60) {
    level = "Desempenho mediano";
    summary =
      "Você acertou uma parte relevante. Há espaço para ganhar consistência e reduzir erros por distração.";
  } else if (pct >= 60 && pct < 80) {
    level = "Acima da média (neste quiz)";
    summary =
      "Você acertou a maior parte. Boa leitura de padrões e lógica. Não é QI oficial.";
  } else if (pct >= 80) {
    level = "Desempenho alto (neste quiz)";
    summary =
      "Desempenho muito forte em padrões e lógica. Isso sugere boa habilidade em tarefas do tipo.";
  }

  return { correct, max, pct, level, summary, tips };
}
