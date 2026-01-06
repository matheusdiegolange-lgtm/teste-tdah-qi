import "./globals.css";

export const metadata = {
  title: "MindCheck — Testes rápidos",
  description: "Testes rápidos com relatório liberado após pagamento (educacional).",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="bg-zinc-100 text-zinc-900">{children}</body>
    </html>
  );
}
