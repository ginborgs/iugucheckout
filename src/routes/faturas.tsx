import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, Copy } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/faturas")({
  head: () => ({
    meta: [
      { title: "Faturas" },
      { name: "description", content: "Gerencie suas faturas e cobranças." },
    ],
  }),
  component: Faturas,
});

const invoices = [
  {
    id: "74EB30A7F50F45C69B24DB4A144BCA33",
    code: "74EB-CA33",
    total: "21.500,00",
    status: "PENDENTE",
    venc: "06/07/26",
    criacao: "23/06/26 13:28",
    pagaCom: "",
    nome: "Clinica Happy Happy Clinica Materno Infantil LTDA",
  },
];

function Faturas() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (s: string) => {
    navigator.clipboard?.writeText(s);
    setCopied(s);
    setTimeout(() => setCopied(null), 1500);
  };
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#1a1a2e]">
      <header className="bg-white border-b border-[#e5e7eb] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6 text-[#64748b]">
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
            <path d="M20 4 C 28 4, 34 10, 34 18 C 34 26, 28 32, 20 32 C 15 32, 11 29, 9 25 L 13 23 C 14 26, 17 28, 20 28 C 26 28, 30 24, 30 18 C 30 12, 26 8, 20 8 C 14 8, 10 12, 10 18 L 6 18 C 6 10, 12 4, 20 4 Z" fill="#1a1a2e"/>
            <circle cx="28" cy="30" r="3" fill="#1a1a2e"/>
          </svg>
        </div>
        <Link to="/login" className="text-sm text-[#64748b] hover:text-[#3b56f5]">Sair</Link>
      </header>

      <main className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl text-[#94a3b8] tracking-wide">FATURAS</h1>
          <div className="flex items-center gap-2">
            <button className="bg-[#3b56f5] hover:bg-[#2e44d9] text-white px-5 py-2 rounded text-sm font-medium">Nova</button>
            <button className="bg-[#3b56f5] hover:bg-[#2e44d9] text-white px-5 py-2 rounded text-sm font-medium">Emissão de cobranças em lote</button>
            <button className="bg-white border border-[#e5e7eb] text-[#1a1a2e] px-5 py-2 rounded text-sm font-medium inline-flex items-center gap-2">
              Exportar <ChevronDown size={16} />
            </button>
          </div>
        </div>

        <div className="bg-white rounded shadow-sm">
          <div className="flex items-center gap-2 p-3 border-b border-[#e5e7eb]">
            <input
              placeholder="Buscar invoices"
              className="flex-1 bg-[#f1f5f9] border border-[#e2e8f0] rounded px-3 py-2 text-sm outline-none"
            />
            <button className="bg-[#3b56f5] text-white text-sm px-4 py-2 rounded inline-flex items-center gap-2">Criado em <ChevronDown size={14}/></button>
            <button className="bg-[#3b56f5] text-white text-sm px-4 py-2 rounded">16/06/2026 - 23/06/2026</button>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 border-b border-[#e5e7eb] text-xs">
            <span className="text-[#64748b]">Filtros:</span>
            {["Situação", "Paga com", "Cobranças", "Recorrências", "Carnê"].map((f) => (
              <button key={f} className="border border-[#e2e8f0] rounded px-3 py-1 inline-flex items-center gap-1 bg-white hover:bg-[#f8fafc]">
                {f} <ChevronDown size={12}/>
              </button>
            ))}
            <button className="ml-auto text-[#64748b] hover:text-[#3b56f5]">× Limpar filtros</button>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-[#64748b] text-xs">
                <th className="text-left px-4 py-3">R$ TOTAL</th>
                <th className="text-left px-4 py-3">SITUAÇÃO</th>
                <th className="text-left px-4 py-3">CÓDIGO</th>
                <th className="text-left px-4 py-3">DATA DE<br/>VENCIMENTO</th>
                <th className="text-left px-4 py-3">DATA DE<br/>CRIAÇÃO ▾</th>
                <th className="text-left px-4 py-3">PAGA<br/>COM</th>
                <th className="text-left px-4 py-3">NOME/E-MAIL</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-t border-[#f1f5f9] hover:bg-[#f8fafc]">
                  <td className="px-4 py-4 font-medium">{inv.total}</td>
                  <td className="px-4 py-4">
                    <span className="bg-[#fde047] text-[#1a1a2e] text-xs font-bold px-3 py-1 rounded-full">{inv.status}</span>
                  </td>
                  <td className="px-4 py-4">
                    <Link to="/faturas/$id" params={{ id: inv.id }} className="text-[#3b56f5] hover:underline">{inv.code}</Link>
                    <button onClick={() => copy(inv.id)} className="ml-2 text-[#3b56f5] align-middle" title="Copiar ID">
                      <Copy size={14} />
                    </button>
                    {copied === inv.id && <span className="ml-2 text-xs text-emerald-600">copiado</span>}
                  </td>
                  <td className="px-4 py-4 text-[#475569]">{inv.venc}</td>
                  <td className="px-4 py-4 text-[#475569]">{inv.criacao}</td>
                  <td className="px-4 py-4 text-[#475569]">{inv.pagaCom || "—"}</td>
                  <td className="px-4 py-4 text-[#475569]">{inv.nome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
