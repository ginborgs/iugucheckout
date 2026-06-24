import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Plus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/checkout/$id")({
  head: () => ({
    meta: [
      { title: "Efetuar pagamento - EVNO FINANCE" },
      { name: "description", content: "Efetue o pagamento da sua fatura com segurança." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { id } = Route.useParams();
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [human, setHuman] = useState(false);
  const [paid, setPaid] = useState(false);

  const canPay = card.length >= 13 && exp && cvv && name && human;

  const onPay = () => {
    if (!canPay) return;
    setPaid(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1a1a2e] flex flex-col">
      <div className="max-w-7xl mx-auto w-full px-8 py-8 flex-1 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12">
        {/* Left */}
        <aside>
          <h2 className="text-xl font-bold tracking-tight mb-6">EVNO FINANCE</h2>
          <div className="border border-[#e5e7eb] rounded-lg p-4 mb-6 flex justify-between items-start">
            <div className="text-sm space-y-1">
              <div>Vendido por: <strong>EVNO FINANCE</strong></div>
              <div>CNPJ: 55.613.668/0001-04</div>
              <div className="pt-2">Comprador: Clinica Happy Happy Clinica Materno Infantil LTDA</div>
            </div>
            <button className="text-[#64748b] hover:text-[#3b56f5]"><Plus size={18}/></button>
          </div>

          <div className="border border-[#e5e7eb] rounded-lg p-5">
            <h3 className="text-lg font-bold mb-4">Itens do Pagamento</h3>
            <div className="text-xs text-[#475569] mb-1">Data de emissão: 23/06/2026</div>
            <div className="text-[10px] text-[#94a3b8] mb-4 break-all">ID da fatura: {id}</div>
            <div className="text-sm font-semibold mb-1">Licenciamento - Ref. 06/26</div>
            <div className="text-xs text-[#475569]">Quantidade: 1</div>
            <div className="text-xs text-[#475569]">Valor unitário: R$ 21.500,00</div>
            <div className="text-sm font-bold mt-3">Subtotal: R$ 21.500,00</div>

            <hr className="my-4 border-[#f1f5f9]"/>
            <div className="flex justify-between text-sm py-1"><span>Subtotal</span><span>R$ 21.500,00</span></div>
            <hr className="my-3 border-[#f1f5f9]"/>
            <div className="flex justify-between text-base font-bold py-1"><span>Total</span><span>R$ 21.500,00</span></div>
            <div className="text-xs text-[#475569] mt-4">Vencimento: 06/07/2026</div>
          </div>
        </aside>

        {/* Right */}
        <section>
          <div className="flex justify-between text-sm text-[#64748b] mb-2">
            <span className="text-[#1a1a2e] font-medium">Efetuar pagamento</span>
            <span>Aprovação</span>
          </div>
          <div className="h-1 bg-[#e5e7eb] rounded mb-8 overflow-hidden">
            <div className={`h-full bg-[#1a1a2e] transition-all ${paid ? "w-full" : "w-1/2"}`} />
          </div>

          {paid ? (
            <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-emerald-700 mb-2">Pagamento aprovado!</h3>
              <p className="text-sm text-emerald-800">Sua fatura foi processada com sucesso.</p>
            </div>
          ) : (
            <div className="border border-[#e5e7eb] rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-5">Forma de pagamento - Cartão de crédito</h3>
              <div className="flex items-center gap-2 text-sm mb-4 text-[#1a1a2e]">
                <CreditCard size={18}/> <span className="font-medium">Pagar com Cartão de crédito</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm">Número do cartão*</label>
                  <div className="relative">
                    <input
                      value={card}
                      onChange={(e) => setCard(e.target.value.replace(/\D/g, "").slice(0, 19))}
                      className="w-full border border-[#e5e7eb] rounded px-3 py-2.5 mt-1 outline-none focus:border-[#3b56f5]"
                    />
                    <CreditCard size={18} className="absolute right-3 top-1/2 mt-0.5 -translate-y-1/2 text-[#94a3b8]"/>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm">Expiração MM/AA*</label>
                    <input value={exp} onChange={(e)=>setExp(e.target.value)} className="w-full border border-[#e5e7eb] rounded px-3 py-2.5 mt-1 outline-none focus:border-[#3b56f5]" />
                  </div>
                  <div>
                    <label className="text-sm">CVV*</label>
                    <input value={cvv} onChange={(e)=>setCvv(e.target.value.replace(/\D/g, "").slice(0,4))} className="w-full border border-[#e5e7eb] rounded px-3 py-2.5 mt-1 outline-none focus:border-[#3b56f5]" />
                  </div>
                </div>
                <div>
                  <label className="text-sm">Nome do titular*</label>
                  <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full border border-[#e5e7eb] rounded px-3 py-2.5 mt-1 outline-none focus:border-[#3b56f5]" />
                </div>
                <div>
                  <label className="text-sm">Número de parcelas</label>
                  <select className="w-full border border-[#e5e7eb] rounded px-3 py-2.5 mt-1 outline-none focus:border-[#3b56f5] bg-white">
                    <option>1 x R$ 21.500,00</option>
                    <option>2 x R$ 10.750,00</option>
                    <option>3 x R$ 7.166,67</option>
                  </select>
                </div>

                <div className="flex justify-end pt-2">
                  <label className="flex items-center gap-3 border border-[#d1d5db] rounded p-3 bg-white shadow-sm cursor-pointer">
                    <input type="checkbox" checked={human} onChange={(e)=>setHuman(e.target.checked)} />
                    <span className="text-sm">Sou humano</span>
                    <div className="ml-2 text-[10px] text-[#9ca3af] text-center leading-tight border-l border-[#e5e7eb] pl-2">
                      <div className="font-semibold text-[#4b5563]">hCaptcha</div>
                      <div>Privacidade - Termos e Condições</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => navigator.share?.({ url: window.location.href }).catch(()=>{}) }
                  className="border border-[#e5e7eb] text-[#1a1a2e] px-6 py-2 rounded hover:bg-[#f8fafc]"
                >
                  Compartilhar
                </button>
                <button
                  disabled={!canPay}
                  onClick={onPay}
                  className="bg-[#3b56f5] disabled:bg-[#a5b4fc] disabled:cursor-not-allowed text-white px-8 py-2 rounded hover:bg-[#2e44d9]"
                >
                  Pagar
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
      <footer className="px-8 py-4 text-sm text-[#64748b]">
        Desenvolvido por <span className="font-semibold">lugu</span>
      </footer>
    </div>
  );
}
