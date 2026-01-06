# MindCheck Tests

Site mobile-first com 2 testes (TDAH triagem + raciocínio) e paywall no final.
Pagamento via Stripe Checkout e tentativa salva no Supabase.

Rotas:
- / (home)
- /t/tdah
- /t/raciocinio
- /paywall?attempt=UUID
- /result?session_id=cs_test_...

## Rodar local
npm install
cp .env.example .env.local
npm run dev

## Supabase
Execute o SQL em `supabase/schema.sql`

## Deploy (Vercel)
1. Importar repositório
2. Configurar variáveis (igual .env.local)
3. Deploy
4. Atualizar NEXT_PUBLIC_BASE_URL com a URL final e redeploy
