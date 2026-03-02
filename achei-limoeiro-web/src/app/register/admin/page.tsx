'use client';

import { useState } from 'react';
import { api } from '@/services/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterAdmin() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            await api.post('/users', {
                name,
                email,
                password,
                role: 'ADMIN' // Aqui a role é fixa para administrador
            });
            router.push('/login');
        } catch (err: any) {
            alert(err.response?.data?.error || 'Erro ao cadastrar admin, mn!');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black text-primary tracking-tighter mb-2">
                        ACHEI<span className="text-secondary">.</span>LIMOEIRO
                    </h1>
                    <p className="text-gray-400 font-medium">👑 Cadastro de Administrador</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2 ml-1">Nome Admin</label>
                        <input
                            type="text" required
                            className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary outline-none transition-all"
                            placeholder="Nome do moderador"
                            value={name} onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2 ml-1">E-mail</label>
                        <input
                            type="email" required
                            className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary outline-none"
                            placeholder="admin@acheilimoeiro.com"
                            value={email} onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2 ml-1">Senha</label>
                        <input
                            type="password" required
                            className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary outline-none"
                            placeholder="••••••••"
                            value={password} onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full h-14 bg-primary text-white rounded-2xl font-black shadow-lg uppercase tracking-widest hover:scale-[1.02] transition-all">
                        Finalizar Cadastro Admin
                    </button>
                </form>
            </div>
        </div>
    );
}