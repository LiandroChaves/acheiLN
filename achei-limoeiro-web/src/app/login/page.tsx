'use client';

import { useState, useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useContext(AuthContext);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await signIn({ email, password });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black text-primary tracking-tighter mb-2">
                        ACHEI<span className="text-secondary">.</span>LIMOEIRO
                    </h1>
                    <p className="text-gray-400 font-medium">Entre para gerenciar sua empresa</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2 ml-1">E-mail</label>
                        <input
                            type="email"
                            required
                            className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all text-gray-900"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2 ml-1">Senha</label>
                        <input
                            type="password"
                            required
                            className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all text-gray-900"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full h-14 bg-primary text-white rounded-2xl font-black shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest"
                    >
                        Entrar agora
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-500 font-medium">
                    Ainda não tem conta?{' '}
                    <Link href="/register" className="text-primary font-black hover:underline">
                        Crie uma conta
                    </Link>
                </p>
            </div>
        </div>
    );
}