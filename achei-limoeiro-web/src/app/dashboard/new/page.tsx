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
        street: '',
        number: '',
        neighborhood: '',
        city_name: 'Limoeiro do Norte',
        state: 'CE',
        phone: '',
        whatsapp: '',
        instagram: '',
        openingHours: 'de Segunda a Sexta - 08:00 ás 18:00',
        categoryId: '',
        cityId: 'f0410c86-2993-4be8-bd1c-e123c0e99ea5' // ID de Limoeiro
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Telefone Comercial</label>
                            <input
                                className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary outline-none transition-all"
                                placeholder="(88) 3412-0000"
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">WhatsApp (com DDD)</label>
                            <input
                                className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary outline-none transition-all"
                                placeholder="88988888888"
                                onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Rua / Avenida</label>
                            <input
                                className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary outline-none transition-all"
                                placeholder="Ex: Av. Dom Aureliano Matos"
                                onChange={e => setFormData({ ...formData, street: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Instagram (sem @)</label>
                            <input
                                className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary outline-none transition-all"
                                placeholder="ex: daltypizzaria"
                                onChange={e => setFormData({ ...formData, instagram: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-4">Horário de Funcionamento</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-6 rounded-[2rem] border-2 border-slate-100/50">
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
                            <div className="mt-4 px-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Visualização:</span>
                                <span className="ml-2 text-sm font-black text-primary">{formData.openingHours}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Número</label>
                            <input
                                className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary outline-none"
                                placeholder="123"
                                onChange={e => setFormData({ ...formData, number: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Bairro</label>
                            <input
                                className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary outline-none"
                                placeholder="Ex: Centro"
                                onChange={e => setFormData({ ...formData, neighborhood: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Cidade</label>
                            <input
                                className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary outline-none"
                                value={formData.city_name}
                                onChange={e => setFormData({ ...formData, city_name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Estado</label>
                            <input
                                className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-primary outline-none"
                                value={formData.state}
                                onChange={e => setFormData({ ...formData, state: e.target.value })}
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