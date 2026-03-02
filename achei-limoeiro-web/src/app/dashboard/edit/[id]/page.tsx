'use client';

import { useState, useEffect, use } from 'react';
import { api } from '@/services/api';
import { useRouter } from 'next/navigation';
import { Category, Company } from '@/types';
import Link from 'next/link';
import { ImageUpload } from '@/components/ImageUpload';

export default function EditCompany({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        whatsapp: '',
        categoryId: ''
    });

    useEffect(() => {
        async function loadData() {
            try {
                const [catsRes, companyRes] = await Promise.all([
                    api.get('/categories'),
                    api.get(`/companies/${id}`)
                ]);

                setCategories(catsRes.data);
                const company = companyRes.data as Company;

                setFormData({
                    name: company.name,
                    description: company.description || '',
                    address: company.address,
                    whatsapp: company.whatsapp || '',
                    categoryId: company.category.id // Acessando via objeto aninhado
                });
            } catch (err) {
                alert('Erro ao carregar dados da empresa.');
                router.push('/dashboard');
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [id, router]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            await api.put(`/companies/${id}`, formData);
            router.push('/dashboard');
        } catch (err) {
            alert('Erro ao atualizar os dados.');
        }
    }

    if (loading) return <div className="p-20 text-center font-black text-primary">Carregando dados de Limoeiro...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 relative">
            <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-2xl p-10 relative">
                <Link href="/dashboard" className="absolute top-8 right-8 text-gray-400 hover:text-gray-900 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </Link>

                <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Editar Empresa</h1>
                <p className="text-gray-400 mb-8 font-medium italic">Atualize as informações do seu negócio em Limoeiro do Norte.</p>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Nome Comercial</label>
                        <input
                            className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary outline-none transition-all"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Categoria</label>
                        <select
                            className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary outline-none"
                            value={formData.categoryId}
                            onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                        >
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Descrição</label>
                        <textarea
                            className="w-full p-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary outline-none h-32"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">WhatsApp</label>
                            <input
                                className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary outline-none"
                                value={formData.whatsapp}
                                onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Endereço</label>
                            <input
                                className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary outline-none"
                                value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-16 bg-primary text-white rounded-2xl font-black shadow-lg uppercase tracking-widest hover:scale-[1.02] transition-all mt-4"
                    >
                        Salvar Alterações
                    </button>
                </form>
                <hr className="my-10 border-gray-100" />
                <h2 className="text-2xl font-black text-gray-900 mb-2">Identidade Visual</h2>
                <p className="text-gray-400 mb-6 font-medium italic">Fotos bem tiradas ajudam a vender mais em Limoeiro!</p>

                <ImageUpload
                    companyId={id}
                    onUploadSuccess={() => router.refresh()}
                />
            </div>
        </div>
    );
}