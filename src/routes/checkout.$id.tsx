import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { CreditCard, Lock, ShieldCheck, ArrowLeft } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/checkout/$id")({
  head: () => ({
    meta: [
      { title: "Checkout — Pagamento seguro" },
      { name: "description", content: "Finalize o pagamento da sua fatura com segurança." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [installments, setInstallments] = useState("1");
  const [processing, setProcessing] = useState(false);

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
  const formatExp = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const onPay = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      navigate({ to: "/pagamento/sucesso/$id", params: { id } });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-white font-sans">
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center">
            <Lock size={16} />
          </div>
          <span className="font-bold tracking-tight">EVNO PAY</span>
        </div>
        <Link to="/faturas/$id" params={{ id }} className="text-sm text-white/60 hover:text-white inline-flex items-center gap-2">
          <ArrowLeft size={14}/> Voltar à fatura
        </Link>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        {/* Form */}
        <form onSubmit={onPay} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-1">
            <ShieldCheck size={20} className="text-emerald-400"/>
            <span className="text-xs uppercase tracking-widest text-white/60">Pagamento seguro</span>
          </div>
          <h1 className="text-2xl font-bold mb-8">Finalize seu pagamento</h1>

          <div className="space-y-5">
            <Field label="Número do cartão">
              <div className="relative">
                <input
                  required
                  value={card}
                  onChange={(e) => setCard(formatCard(e.target.value))}
                  placeholder="0000 0000 0000 0000"
                  className="input pr-10"
                />
                <CreditCard size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"/>
              </div>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Validade">
                <input
                  required
                  value={exp}
                  onChange={(e) => setExp(formatExp(e.target.value))}
                  placeholder="MM/AA"
                  className="input"
                />
              </Field>
              <Field label="CVV">
                <input
                  required
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="123"
                  className="input"
                />
              </Field>
            </div>

            <Field label="Nome impresso no cartão">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase())}
                placeholder="NOME COMO ESTÁ NO CARTÃO"
                className="input"
              />
            </Field>

            <Field label="Parcelas">
              <select
                value={installments}
                onChange={(e) => setInstallments(e.target.value)}
                className="input appearance-none"
              >
                <option value="1" className="bg-[#1e1b4b]">1x de R$ 21.500,00 (sem juros)</option>
                <option value="2" className="bg-[#1e1b4b]">2x de R$ 10.750,00 (sem juros)</option>
                <option value="3" className="bg-[#1e1b4b]">3x de R$ 7.166,67 (sem juros)</option>
                <option value="6" className="bg-[#1e1b4b]">6x de R$ 3.583,34 (sem juros)</option>
                <option value="12" className="bg-[#1e1b4b]">12x de R$ 1.791,67 (sem juros)</option>
              </select>
            </Field>
          </div>

          <button
            type="submit"
            disabled={processing}
            className="mt-8 w-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:from-[#2563eb] hover:to-[#7c3aed] disabled:opacity-60 disabled:cursor-not-allowed py-3.5 rounded-xl font-semibold text-base transition-all shadow-lg shadow-blue-500/20"
          >
            {processing ? "Processando pagamento..." : "Pagar R$ 21.500,00"}
          </button>

          <p className="mt-4 text-xs text-white/40 text-center inline-flex items-center justify-center gap-2 w-full">
            <Lock size={12}/> Conexão criptografada · seus dados não são armazenados
          </p>
        </form>

        {/* Summary */}
        <aside className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 h-fit lg:sticky lg:top-6">
          <h2 className="text-sm uppercase tracking-widest text-white/60 mb-4">Resumo</h2>

          <div className="border-b border-white/10 pb-4 mb-4">
            <div className="text-xs text-white/50">Beneficiário</div>
            <div className="font-semibold">EVNO FINANCE</div>
            <div className="text-xs text-white/50 mt-1">CNPJ 55.613.668/0001-04</div>
          </div>

          <div className="space-y-2 text-sm border-b border-white/10 pb-4 mb-4">
            <div className="flex justify-between">
              <span className="text-white/70">Licenciamento — Ref. 06/26</span>
              <span>R$ 21.500,00</span>
            </div>
            <div className="flex justify-between text-white/50 text-xs">
              <span>Quantidade</span>
              <span>1</span>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <Row label="Subtotal" value="R$ 21.500,00" />
            <Row label="Desconto" value="R$ 0,00" />
            <Row label="Multa" value="R$ 0,00" />
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-baseline">
            <span className="text-white/70">Total</span>
            <span className="text-2xl font-bold">R$ 21.500,00</span>
          </div>

          <div className="mt-4 text-xs text-white/40">
            Vencimento: 06/07/2026 · Fatura {id.slice(0, 8)}…
          </div>
        </aside>
      </main>

      <style>{`
        .input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 12px 14px;
          color: white;
          outline: none;
          transition: border-color .15s, background .15s;
        }
        .input:focus { border-color: #8b5cf6; background: rgba(255,255,255,0.08); }
        .input::placeholder { color: rgba(255,255,255,0.3); }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-white/60 mb-2">{label}</span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-white/70">{label}</span>
      <span>{value}</span>
    </div>
  );
}
