import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Acesse sua conta" },
      { name: "description", content: "Acesse sua conta para gerenciar faturas e cobranças." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !checked) return;
    navigate({ to: "/faturas" });
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-sans text-[#1a1a2e]">
      {/* Logo */}
      <div className="absolute top-10 left-12">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M20 4 C 28 4, 34 10, 34 18 C 34 26, 28 32, 20 32 C 15 32, 11 29, 9 25 L 13 23 C 14 26, 17 28, 20 28 C 26 28, 30 24, 30 18 C 30 12, 26 8, 20 8 C 14 8, 10 12, 10 18 L 6 18 C 6 10, 12 4, 20 4 Z" fill="#1a1a2e"/>
          <circle cx="28" cy="30" r="3" fill="#1a1a2e"/>
        </svg>
      </div>

      {/* Decorative shapes right */}
      <div className="hidden lg:block absolute right-0 top-0 w-1/2 h-full pointer-events-none">
        <div className="absolute top-[35%] right-[28%] w-12 h-12 border-2 border-[#4f46e5]/40 rounded-md" />
        <div className="absolute top-[40%] right-[10%] w-48 h-48 border border-[#cbd5e1] rounded-3xl" />
        <div className="absolute top-[55%] right-[35%] w-44 h-44 bg-[#e2e8f0]/60 rounded-3xl" />
        <div className="absolute top-[48%] right-[3%] w-36 h-44 border border-[#cbd5e1] rounded-3xl" />
        <div className="absolute bottom-[18%] right-[20%] w-10 h-10 border-2 border-[#4f46e5]/50 rounded-md" />
        <div className="absolute bottom-[10%] right-[6%] w-48 h-32 border border-[#cbd5e1] rounded-3xl" />
        <div className="absolute bottom-[28%] right-[40%] w-20 h-20 bg-[#e2e8f0]/40 rounded-2xl" />
      </div>

      <div className="max-w-[680px] ml-12 lg:ml-32 pt-32">
        <h1 className="text-[2.25rem] font-bold tracking-tight mb-10">Acesse sua conta</h1>

        <form onSubmit={onSubmit} className="space-y-7">
          <div>
            <label className="block text-sm text-[#64748b] mb-1">Email corporativo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#f1f5f9]/50 border-0 border-b-2 border-[#3b56f5] px-2 py-3 outline-none focus:bg-[#f1f5f9]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm text-[#64748b]">Senha</label>
              <a href="#" className="text-sm text-[#3b56f5] hover:underline">Esqueci a senha</a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#f1f5f9]/70 border-0 px-2 py-3 outline-none focus:bg-[#f1f5f9]"
            />
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <label className="flex items-start gap-2 border border-[#d1d5db] rounded p-3 bg-white shadow-sm cursor-pointer select-none">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                className="mt-0.5"
              />
              <div>
                <div className="text-sm">Não sou um robô</div>
                <div className="text-[10px] text-[#6b7280]">
                  Este site está excedendo <span className="underline">a cota gratuita do reCAPTCHA Enterprise</span>.
                </div>
              </div>
              <div className="ml-4 text-[10px] text-[#9ca3af] text-center leading-tight">
                <div className="font-semibold text-[#4b5563]">reCAPTCHA</div>
                <div>Privacidade - Termos</div>
              </div>
            </label>

            <button
              type="submit"
              className="bg-[#3b56f5] hover:bg-[#2e44d9] text-white font-medium px-10 py-2.5 rounded transition-colors"
            >
              Acessar
            </button>
          </div>

          <div className="pt-6 text-sm">
            Problemas no acesso? Clique no <a href="#" className="text-[#3b56f5] hover:underline">link</a>
          </div>
        </form>
      </div>
    </div>
  );
}
