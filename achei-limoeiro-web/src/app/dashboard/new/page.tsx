'use client';

import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { useRouter } from 'next/navigation';
import { Category } from '@/types';
import Link from 'next/link';

export default function NewCompany() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        phone: '',
        whatsapp: '',
        categoryId: '',
        cityId: 'f0410c86-2993-4be8-bd1c-e123c0e99ea5' // ID de Limoeiro
    });

    useEffect(() => {
        api.get('/categories').then(response => setCategories(response.data));
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            await api.post('/companies', formData);
            router.push('/dashboard');
        } catch (err) {
            alert('Erro ao cadastrar a empresa. Verifique os dados.');
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-2xl p-10">
                {/* Botão de Fechar / Voltar */}
                <Link
                    href="/dashboard"
                    className="absolute top-8 right-8 text-gray-400 hover:text-gray-900 transition-colors p-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </Link>
                <h1 className="text-3xl font-black text-gray-900 mb-8">Anunciar Empresa</h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Nome da Empresa</label>
                        <input
                            className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary outline-none transition-all"
                            placeholder="Ex: Pizzaria do Vale"
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Categoria</label>
                        <select
                            className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary outline-none"
                            onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                        >
                            <option value="">Selecione uma categoria</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Descrição</label>
                        <textarea
                            className="w-full p-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary outline-none h-32"
                            placeholder="Conte um pouco sobre o seu negócio..."
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">WhatsApp (com DDD)</label>
                            <input
                                className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary outline-none"
                                placeholder="88999999999"
                                onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Endereço</label>
                            <input
                                className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary outline-none"
                                placeholder="Rua, Número, Bairro"
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-16 bg-primary text-white rounded-2xl font-black shadow-lg uppercase tracking-widest hover:scale-[1.02] transition-all mt-4"
                    >
                        Finalizar Cadastro
                    </button>
                </form>
            </div>
        </div>
    );
}