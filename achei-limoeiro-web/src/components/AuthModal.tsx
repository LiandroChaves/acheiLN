'use client';

import { useRouter } from 'next/navigation';

interface AuthModalProps {
    isOpen: boolean;
}

export function AuthModal({ isOpen }: AuthModalProps) {
    const router = useRouter();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay com blur */}
            <div className="absolute inset-0 bg-primary/20 backdrop-blur-md" />

            {/* Card do Modal */}
            <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] p-10 shadow-2xl border border-gray-100 text-center animate-in fade-in zoom-in duration-300">
                <div className="mb-6 text-5xl">🔒</div>
                <h2 className="text-2xl font-black text-gray-900 mb-4 tracking-tighter uppercase">
                    Acesso Restritos!
                </h2>
                <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                    Você precisa estar logado para gerenciar seus anúncios em Limoeiro.
                </p>

                <button
                    onClick={() => router.push('/login')}
                    className="w-full h-14 bg-primary text-white rounded-2xl font-black shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest"
                >
                    Fazer Login Agora
                </button>
            </div>
        </div>
    );
}