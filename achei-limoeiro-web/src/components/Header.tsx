'use client';

import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import Link from 'next/link';

export function Header() {
    const { user, signOut, isAuthenticated } = useContext(AuthContext);

    return (
        <header className="glass-effect sticky top-0 z-50 h-20 flex items-center border-b border-slate-200/50">
            <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
                        <span className="text-white font-black text-xl">A</span>
                    </div>
                    <span className="text-2xl font-black text-slate-900 tracking-tight">
                        ACHEI<span className="text-primary">.</span>LN
                    </span>
                </Link>

                <div className="flex items-center gap-8">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-sm font-bold text-slate-900">Olá, {user?.name}</span>
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{user?.role}</span>
                            </div>


                            <Link
                                href={user?.role === 'ADMIN' ? '/admin' : '/dashboard'}
                                className="flex flex-col items-center gap-2 group"
                                title="Painel de Controle"
                            >
                                {/* CÍRCULO */}
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 transition-all shadow-sm group-hover:bg-primary group-hover:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /> </svg>
                                </div>

                                {/* TEXTO */}
                                <p className="text-[10px] font-black text-slate-400 group-hover:text-primary transition-colors uppercase tracking-widest text-center">
                                    {user?.role === 'ADMIN'
                                        ? 'Painel Administrativo'
                                        : 'Painel de Controle'}
                                </p>
                            </Link>
                            <button
                                onClick={signOut}
                                className="text-xs font-black text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest"
                            >
                                Sair
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-primary text-white px-8 py-3 rounded-2xl font-black text-sm hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all uppercase tracking-widest"
                        >
                            Entrar
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}