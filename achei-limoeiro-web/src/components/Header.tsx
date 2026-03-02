'use client';

import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import Link from 'next/link';

export function Header() {
    const { user, signOut, isAuthenticated } = useContext(AuthContext);

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 h-20 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
                <Link href="/" className="text-2xl font-black text-primary tracking-tighter">
                    ACHEI<span className="text-secondary">.</span>LIMOEIRO
                </Link>

                <div className="flex items-center gap-6">
                    {isAuthenticated ? (
                        <>
                            <div className="flex flex-col items-end">
                                <span className="text-sm font-black text-gray-900 leading-none">Olá, {user?.name}</span>
                                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{user?.role}</span>
                            </div>

                            <Link
                                href={user?.role === 'ADMIN' ? '/admin' : '/dashboard'}
                                className="text-sm font-black text-gray-600 hover:text-primary transition-colors"
                            >
                                Painel
                            </Link>

                            <button
                                onClick={signOut}
                                className="bg-red-50 text-red-500 px-5 py-2.5 rounded-xl font-black text-xs hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest"
                            >
                                Sair
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-primary text-white px-8 py-3 rounded-2xl font-black text-sm hover:shadow-lg hover:shadow-primary/30 transition-all uppercase tracking-widest"
                        >
                            Entrar
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}