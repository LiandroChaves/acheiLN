'use client';

import { useState } from 'react';
import { api } from '@/services/api';

interface AdminAuthModalProps {
    isOpen: boolean;
    onVerified: () => void;
    onSelectOwner: () => void;
}

export function AdminAuthModal({ isOpen, onVerified, onSelectOwner }: AdminAuthModalProps) {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState<'choice' | 'password'>('choice');

    if (!isOpen) return null;

    async function handleVerifyPassword() {
        setLoading(true);
        try {
            await api.post('/users/admin-verify', { password });
            onVerified();
        } catch (err) {
            alert('Senha de admin inválida, parceiro!');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm -z-10 animate-in fade-in duration-300" />

            <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] p-10 shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in slide-in-from-bottom-8 duration-500">
                {view === 'choice' ? (
                    <>
                        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl">
                            👋
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Bem-vindo(a)!</h2>
                        <p className="text-slate-500 font-medium mb-10 leading-relaxed">Como você deseja se identificar no sistema hoje?</p>

                        <div className="space-y-4">
                            <button
                                onClick={() => setView('password')}
                                className="w-full h-16 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-95 transition-all uppercase tracking-widest text-sm"
                            >
                                Administrador
                            </button>
                            <button
                                onClick={onSelectOwner}
                                className="w-full h-16 bg-slate-50 text-slate-400 rounded-2xl font-black hover:bg-slate-100 transition-all uppercase tracking-widest text-xs"
                            >
                                Proprietário de Empresa
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-20 h-20 bg-secondary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl">
                            🔑
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Privilegiado?</h2>
                        <p className="text-slate-500 font-medium mb-8 leading-relaxed text-sm">Insira a senha mestra para continuar como administrador.</p>

                        <input
                            type="password"
                            className="w-full h-16 px-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none mb-8 text-center text-xl font-bold transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoFocus
                        />

                        <div className="space-y-4">
                            <button
                                onClick={handleVerifyPassword}
                                disabled={loading}
                                className="w-full h-16 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-95 transition-all uppercase tracking-widest text-sm disabled:opacity-50 disabled:pointer-events-none"
                            >
                                {loading ? 'Verificando...' : 'Acessar Painel'}
                            </button>

                            <button
                                onClick={() => setView('choice')}
                                className="text-xs font-black text-slate-400 hover:text-primary transition-all uppercase tracking-widest"
                            >
                                Voltar para opções
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}