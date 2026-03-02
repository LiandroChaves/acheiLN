'use client';

import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AdminAuthModal } from '@/components/AdminAuthModal';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showChoiceModal, setShowChoiceModal] = useState(false);
    const router = useRouter();

    useEffect(() => {
        api.get('/users/admin-exists').then(res => {
            if (res.data.exists) {
                setShowChoiceModal(true); // Já existe admin, pede senha ou escolha
            } else {
                router.push('/register/admin'); // Primeiro da história? Vai pra tela de Admin
            }
        });
    }, [router]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            await api.post('/users', {
                name,
                email,
                password,
                role: 'OWNER' // Role padrão de proprietário
            });
            router.push('/login');
        } catch (err: any) {
            alert(err.response?.data?.error || 'Erro ao realizar o cadastro, mn!');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <AdminAuthModal
                isOpen={showChoiceModal}
                onVerified={() => router.push('/register/admin')} // Senha bateu? Vai pra tela de Admin
                onSelectOwner={() => setShowChoiceModal(false)} // Quer ser dono? Fecha e fica aqui
            />

            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black text-primary tracking-tighter mb-2">
                        ACHEI<span className="text-secondary">.</span>LIMOEIRO
                    </h1>
                    <p className="text-gray-400 font-medium">Crie sua conta de Proprietário</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2 ml-1">Nome Completo</label>
                        <input
                            type="text" required
                            className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary outline-none"
                            placeholder="Seu nome"
                            value={name} onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2 ml-1">E-mail</label>
                        <input
                            type="email" required
                            className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary outline-none"
                            placeholder="seu@email.com"
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
                        Cadastrar Proprietário
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-500 font-medium">
                    Já possui uma conta? <Link href="/login" className="text-primary font-black hover:underline">Faça login aqui</Link>
                </p>
            </div>
        </div>
    );
}