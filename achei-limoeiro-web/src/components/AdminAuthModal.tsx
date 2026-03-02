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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-primary/20 backdrop-blur-md" />
            <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] p-10 shadow-2xl border border-gray-100 text-center">
                {view === 'choice' ? (
                    <>
                        <h2 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tighter">Como deseja se cadastrar?</h2>
                        <div className="space-y-4">
                            <button onClick={() => setView('password')} className="w-full h-14 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] transition-all">Administrador</button>
                            <button onClick={onSelectOwner} className="w-full h-14 bg-gray-50 text-gray-400 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-100 transition-all">Proprietário</button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Senha de Admin</h2>
                        <p className="text-gray-400 mb-6 font-medium">Peça a senha para um administrador existente.</p>
                        <input
                            type="password"
                            className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary outline-none mb-6 text-center text-lg"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <div className="flex flex-col gap-3">
                            <button onClick={handleVerifyPassword} disabled={loading} className="w-full h-14 bg-secondary text-white rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] transition-all">Verificar</button>
                            <button onClick={() => setView('choice')} className="text-sm font-bold text-gray-400 hover:text-primary transition-all">Voltar</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}