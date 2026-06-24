import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/faturas/$id")({
  head: () => ({
    meta: [
      { title: "Fatura" },
      { name: "description", content: "Detalhes da fatura." },
    ],
  }),
  component: FaturaDetail,
});

function FaturaDetail() {
  const { id } = Route.useParams();
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const checkoutUrl = `${origin}/checkout/${id}`;

  const Field = ({ label, children }: { label: string; children?: React.ReactNode }) => (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-[#94a3b8] mb-1">{label}</div>
      <div className="text-sm text-[#1a1a2e]">{children || <span className="text-[#cbd5e1]">—</span>}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#1a1a2e]">
      <header className="bg-white border-b border-[#e5e7eb] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
            <path d="M20 4 C 28 4, 34 10, 34 18 C 34 26, 28 32, 20 32 C 15 32, 11 29, 9 25 L 13 23 C 14 26, 17 28, 20 28 C 26 28, 30 24, 30 18 C 30 12, 26 8, 20 8 C 14 8, 10 12, 10 18 L 6 18 C 6 10, 12 4, 20 4 Z" fill="#1a1a2e"/>
            <circle cx="28" cy="30" r="3" fill="#1a1a2e"/>
          </svg>
          <Link to="/faturas" className="text-sm text-[#64748b] hover:text-[#3b56f5]">← Voltar para faturas</Link>
        </div>
        <Link to="/login" className="text-sm text-[#64748b] hover:text-[#3b56f5]">Sair</Link>
      </header>

      <main className="p-8 max-w-6xl mx-auto">
        <div className="bg-white rounded shadow-sm p-8">
          <div className="text-[11px] uppercase tracking-wider text-[#94a3b8]">FATURA</div>
          <h1 className="text-2xl font-mono font-semibold mt-1 mb-6 break-all">{id}</h1>
          <hr className="border-[#f1f5f9] mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-7">
            <Field label="URL">
              <Link to="/checkout/$id" params={{ id }} className="text-[#3b56f5] hover:underline break-all">
                {checkoutUrl}
              </Link>
              <p className="text-xs text-[#64748b] mt-2">
                * Ao clicar nesse link, você estará utilizando o Checkout Personalizável e poderá ser cobrado.
              </p>
            </Field>
            <Field label="Situação">
              <span className="bg-[#fde047] text-[#1a1a2e] text-xs font-bold px-3 py-1 rounded-full">PENDENTE</span>
            </Field>

            <Field label="Nome">Clinica Happy Happy Clinica Materno Infantil LTDA</Field>
            <Field label="E-mail">happy.clinicainfantil1006@gmail.com</Field>

            <Field label="Outros e-mails" />
            <div />

            <Field label="Data de criação">23/06/26 13:28</Field>
            <Field label="Data de vencimento">06/07/26</Field>

            <Field label="Data da Ocorrência" />
            <Field label="Data do pagamento" />

            <Field label="Taxas pagas">R$0,00</Field>
            <Field label="Desconto">R$0,00</Field>

            <Field label="Multa">R$0,00</Field>
            <Field label="Métodos de Pagamento Disponíveis">
              <span className="bg-[#3b56f5] text-white text-xs font-bold px-3 py-1 rounded-full">CARTÃO DE CRÉDITO</span>
            </Field>

            <Field label="Valor pago">R$0,00</Field>
            <Field label="Assinatura" />

            <Field label="Carnê" />
            <div />

            <Field label="Cliente">Clinica Happy Happy</Field>
            <Field label="Paga com" />
          </div>

          <div className="mt-10 flex gap-3">
            <Link to="/checkout/$id" params={{ id }} className="bg-[#3b56f5] hover:bg-[#2e44d9] text-white px-6 py-2.5 rounded text-sm font-medium">
              Ir para checkout
            </Link>
            <Link to="/faturas" className="border border-[#e5e7eb] text-[#1a1a2e] px-6 py-2.5 rounded text-sm font-medium hover:bg-[#f8fafc]">
              Voltar
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
