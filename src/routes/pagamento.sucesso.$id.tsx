import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/pagamento/sucesso/$id")({
  head: () => ({
    meta: [
      { title: "Pagamento aprovado" },
      { name: "description", content: "Confirmação de pagamento da fatura." },
    ],
  }),
  component: PagamentoSucesso,
});

function PagamentoSucesso() {
  const { id } = Route.useParams();
  const now = new Date();
  const formatted = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${String(now.getFullYear()).slice(-2)} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#1a1a2e] flex flex-col">
      <header className="bg-white border-b border-[#e5e7eb] px-6 py-3 flex items-center justify-between">
        <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
          <path d="M20 4 C 28 4, 34 10, 34 18 C 34 26, 28 32, 20 32 C 15 32, 11 29, 9 25 L 13 23 C 14 26, 17 28, 20 28 C 26 28, 30 24, 30 18 C 30 12, 26 8, 20 8 C 14 8, 10 12, 10 18 L 6 18 C 6 10, 12 4, 20 4 Z" fill="#1a1a2e"/>
          <circle cx="28" cy="30" r="3" fill="#1a1a2e"/>
        </svg>
        <Link to="/login" className="text-sm text-[#64748b] hover:text-[#3b56f5]">Sair</Link>
      </header>

      <main className="flex-1 flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-sm border border-[#e5e7eb] overflow-hidden">
          <div className="bg-emerald-50 border-b border-emerald-100 px-8 py-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mb-4">
              <CheckCircle2 size={36} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-emerald-700">Pagamento aprovado!</h1>
            <p className="text-sm text-emerald-800 mt-2">
              Sua transação foi processada com sucesso.
            </p>
          </div>

          <div className="px-8 py-6 space-y-4">
            <Row label="Status">
              <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">APROVADO</span>
            </Row>
            <Row label="Valor pago">R$ 21.500,00</Row>
            <Row label="Forma de pagamento">Cartão de crédito · 1x</Row>
            <Row label="Beneficiário">EVNO FINANCE</Row>
            <Row label="CNPJ">55.613.668/0001-04</Row>
            <Row label="Pagador">Clinica Happy Happy Clinica Materno Infantil LTDA</Row>
            <Row label="Data do pagamento">{formatted}</Row>
            <Row label="ID da fatura">
              <span className="font-mono text-xs break-all">{id}</span>
            </Row>
          </div>

          <div className="px-8 py-6 border-t border-[#f1f5f9] flex flex-wrap gap-3 justify-end">
            <button
              onClick={() => window.print()}
              className="border border-[#e5e7eb] text-[#1a1a2e] px-5 py-2 rounded text-sm font-medium hover:bg-[#f8fafc]"
            >
              Imprimir comprovante
            </button>
            <Link
              to="/faturas/$id"
              params={{ id }}
              className="border border-[#e5e7eb] text-[#1a1a2e] px-5 py-2 rounded text-sm font-medium hover:bg-[#f8fafc]"
            >
              Ver fatura
            </Link>
            <Link
              to="/faturas"
              className="bg-[#3b56f5] hover:bg-[#2e44d9] text-white px-6 py-2 rounded text-sm font-medium"
            >
              Voltar para faturas
            </Link>
          </div>
        </div>
      </main>

      <footer className="px-8 py-4 text-sm text-[#64748b] text-center">
        Desenvolvido por <span className="font-semibold">lugu</span>
      </footer>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center gap-4 text-sm border-b border-[#f1f5f9] pb-3 last:border-0">
      <span className="text-[#64748b]">{label}</span>
      <span className="text-right text-[#1a1a2e] font-medium max-w-[60%]">{children}</span>
    </div>
  );
}
