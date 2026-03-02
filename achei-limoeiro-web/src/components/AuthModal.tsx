'use client';

import { useRouter } from 'next/navigation';

interface AuthModalProps {
    isOpen: boolean;
}

export function AuthModal({ isOpen }: AuthModalProps) {
    const router = useRouter();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-4">
            {/* Overlay com blur */}
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm -z-10 animate-in fade-in duration-300" />

            {/* Card do Modal */}
            <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] p-10 shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in slide-in-from-bottom-8 duration-500">
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl">
                    🔒
                </div>

                <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
                    Acesso Restrito
                </h2>

                <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                    Você precisa estar logado para gerenciar seus anúncios em Limoeiro do Norte.
                </p>

                <div className="space-y-4">
                    <button
                        onClick={() => router.push('/login')}
                        className="w-full h-16 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-95 transition-all uppercase tracking-widest text-sm"
                    >
                        Entrar na minha conta
                    </button>

                    <button
                        onClick={() => window.location.reload()} // Fechar seria ideal, mas esse modal não tem onClose
                        className="w-full h-16 bg-slate-50 text-slate-400 rounded-2xl font-black hover:bg-slate-100 transition-all uppercase tracking-widest text-xs"
                    >
                        Voltar depois
                    </button>
                </div>
            </div>
        </div>
    );
}