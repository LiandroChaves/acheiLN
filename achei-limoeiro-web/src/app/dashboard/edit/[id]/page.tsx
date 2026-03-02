'use client';

import { useState, useEffect, use } from 'react';
import { api } from '@/services/api';
import { useRouter } from 'next/navigation';
import { Category, Company } from '@/types';
import Link from 'next/link';
import { ImageUpload } from '@/components/ImageUpload';
import { Header } from '@/components/Header';

export default function EditCompany({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        street: '',
        number: '',
        neighborhood: '',
        city_name: '',
        state: '',
        phone: '',
        whatsapp: '',
        instagram: '',
        openingHours: '',
        categoryId: ''
    });

    const [schedule, setSchedule] = useState({
        startDay: 'Segunda',
        endDay: 'Sexta',
        startTime: '08:00',
        endTime: '18:00'
    });

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            openingHours: `de ${schedule.startDay} a ${schedule.endDay} - ${schedule.startTime} ás ${schedule.endTime}`
        }));
    }, [schedule]);

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
                    street: company.street || '',
                    number: company.number || '',
                    neighborhood: company.neighborhood || '',
                    city_name: company.city_name || '',
                    state: company.state || '',
                    phone: company.phone || '',
                    whatsapp: company.whatsapp || '',
                    instagram: company.instagram || '',
                    openingHours: company.openingHours || '',
                    categoryId: company.category.id
                });

                if (company.openingHours) {
                    const match = company.openingHours.match(/de (.+) a (.+) - (.+) ás (.+)/);
                    if (match) {
                        setSchedule({
                            startDay: match[1],
                            endDay: match[2],
                            startTime: match[3],
                            endTime: match[4]
                        });
                    }
                }
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
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || 'Erro ao atualizar os dados.';
            alert(errorMessage);
        }
    }

    if (loading) return <div className="p-20 text-center font-black text-primary">Carregando dados de Limoeiro...</div>;

    return (
        <div className="min-h-screen bg-slate-50 py-16 px-6 relative">
            <Header />

            <div className="max-w-4xl mx-auto mt-12">
                <div className="flex items-center justify-between mb-12">
                    <Link href="/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-primary font-bold transition-colors group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                        VOLTAR AO PAINEL
                    </Link>
                </div>

                <div className="bg-white rounded-[3rem] shadow-premium border border-slate-100 p-12 overflow-hidden relative">
                    {/* Decorativo */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-primary to-primary-light" />

                    <div className="mb-12">
                        <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Editar Empresa</h1>
                        <p className="text-slate-500 font-medium italic">Seus dados sempre atualizados para os clientes de Limoeiro.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Nome Comercial</label>
                                <input
                                    className="w-full h-16 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-bold text-slate-900"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Categoria / Segmento</label>
                                <select
                                    className="w-full h-16 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none font-bold text-slate-900 appearance-none"
                                    value={formData.categoryId}
                                    onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                                >
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Descrição do Negócio</label>
                            <textarea
                                className="w-full p-8 rounded-3xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none h-40 font-medium text-slate-700 leading-relaxed transition-all"
                                placeholder="Conte um pouco sobre o que sua empresa oferece..."
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Telefone Comercial</label>
                                <input
                                    className="w-full h-16 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none font-bold text-slate-900"
                                    placeholder="(88) 3412-0000"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">WhatsApp para Contato</label>
                                <div className="relative">
                                    <input
                                        className="w-full h-16 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none font-bold text-slate-900"
                                        placeholder="(88) 99999-9999"
                                        value={formData.whatsapp}
                                        onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                                    />
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-emerald-500 font-bold text-xs">Ativo</div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Instagram (sem @)</label>
                                <input
                                    className="w-full h-16 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none font-bold text-slate-900"
                                    placeholder="ex: daltypizzaria"
                                    value={formData.instagram}
                                    onChange={e => setFormData({ ...formData, instagram: e.target.value })}
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Horário de Funcionamento</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-6 rounded-[2rem] border-2 border-slate-100/50">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">De</label>
                                        <select
                                            className="w-full h-12 px-4 rounded-xl bg-white border-2 border-transparent focus:border-primary outline-none font-bold text-slate-700 shadow-sm"
                                            value={schedule.startDay}
                                            onChange={e => setSchedule({ ...schedule, startDay: e.target.value })}
                                        >
                                            {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map(d => (
                                                <option key={d} value={d}>{d}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Até</label>
                                        <select
                                            className="w-full h-12 px-4 rounded-xl bg-white border-2 border-transparent focus:border-primary outline-none font-bold text-slate-700 shadow-sm"
                                            value={schedule.endDay}
                                            onChange={e => setSchedule({ ...schedule, endDay: e.target.value })}
                                        >
                                            {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map(d => (
                                                <option key={d} value={d}>{d}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Abertura</label>
                                        <input
                                            type="time"
                                            className="w-full h-12 px-4 rounded-xl bg-white border-2 border-transparent focus:border-primary outline-none font-bold text-slate-700 shadow-sm"
                                            value={schedule.startTime}
                                            onChange={e => setSchedule({ ...schedule, startTime: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Fechamento</label>
                                        <input
                                            type="time"
                                            className="w-full h-12 px-4 rounded-xl bg-white border-2 border-transparent focus:border-primary outline-none font-bold text-slate-700 shadow-sm"
                                            value={schedule.endTime}
                                            onChange={e => setSchedule({ ...schedule, endTime: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="px-4">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Visualização:</span>
                                    <span className="ml-2 text-sm font-black text-primary">{formData.openingHours}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Rua / Avenida</label>
                                <input
                                    className="w-full h-16 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none font-bold text-slate-900"
                                    placeholder="Ex: Av. Dom Aureliano Matos"
                                    value={formData.street}
                                    onChange={e => setFormData({ ...formData, street: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Número</label>
                                <input
                                    className="w-full h-16 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none font-bold text-slate-900"
                                    placeholder="123"
                                    value={formData.number}
                                    onChange={e => setFormData({ ...formData, number: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Bairro</label>
                                <input
                                    className="w-full h-16 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none font-bold text-slate-900"
                                    placeholder="Ex: Centro"
                                    value={formData.neighborhood}
                                    onChange={e => setFormData({ ...formData, neighborhood: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Cidade</label>
                                <input
                                    className="w-full h-16 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none font-bold text-slate-900"
                                    value={formData.city_name}
                                    onChange={e => setFormData({ ...formData, city_name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Estado</label>
                                <input
                                    className="w-full h-16 px-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none font-bold text-slate-900"
                                    value={formData.state}
                                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="my-16 flex items-center gap-6">
                            <div className="h-px bg-slate-100 flex-1" />
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Gestão de Mídia</span>
                            <div className="h-px bg-slate-100 flex-1" />
                        </div>

                        <div className="mb-10">
                            <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Identidade Visual</h2>
                            <p className="text-slate-500 font-medium italic">Gerencie o logo e a galeria de fotos do seu catálogo.</p>
                        </div>

                        <ImageUpload
                            companyId={id}
                            onUploadSuccess={() => router.refresh()}
                        />
                        <button
                            type="submit"
                            className="w-full h-20 bg-primary text-white rounded-3xl font-black shadow-xl shadow-primary/25 uppercase tracking-widest hover:shadow-primary/40 hover:-translate-y-1 active:scale-95 transition-all mt-6 text-lg"
                        >
                            Salvar Dados da Empresa
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}