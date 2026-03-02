'use client';

import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { api } from '@/services/api';
import { Company } from '@/types';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { AuthModal } from '@/components/AuthModal';

export default function Dashboard() {
    const { user, isAuthenticated } = useContext(AuthContext);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAuthModal, setShowAuthModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('@AcheiLimoeiro:token');

        if (!token && !isAuthenticated) {
            setShowAuthModal(true);
            setLoading(false);
            return;
        }

        // Só tenta carregar se o cara estiver logado e o objeto user existir
        if (isAuthenticated && user) {
            async function loadUserCompanies() {
                try {
                    const response = await api.get('/companies/me');
                    setCompanies(response.data);
                } catch (err) {
                    console.log(err)
                } finally {
                    setLoading(false);
                }
            }

            loadUserCompanies();
        }
    }, [isAuthenticated, user]);

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <AuthModal isOpen={showAuthModal} />

            <main className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 mb-4">
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Área do Proprietário</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Meus Anúncios</h1>
                        <p className="text-slate-500 font-medium mt-2">Gerencie a presença da sua empresa no melhor guia de Limoeiro.</p>
                    </div>

                    <Link
                        href="/dashboard/new"
                        className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-sm hover:shadow-2xl hover:shadow-primary/25 hover:-translate-y-1 active:scale-95 transition-all uppercase tracking-widest flex items-center gap-3 shadow-lg"
                    >
                        <span className="text-xl leading-none">+</span>
                        <span>Anunciar Empresa</span>
                    </Link>
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2].map(i => (
                            <div key={i} className="h-32 bg-white rounded-3xl animate-pulse border border-slate-100" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {companies.length > 0 ? (
                            companies.map(company => (
                                <div key={company.id} className="modern-card p-6 rounded-[2.5rem] flex flex-col sm:flex-row items-center justify-between gap-6 group">
                                    <div className="flex items-center gap-8 w-full">
                                        <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center overflow-hidden border border-slate-200/50 shrink-0 group-hover:scale-105 transition-transform">
                                            {company.logoUrl ? (
                                                <img src={`http://localhost:3333/uploads/${company.id}/${company.logoUrl}`} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest text-center px-2">Sem Logo</span>
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                                <h3 className="text-2xl font-black text-slate-900 leading-tight">{company.name}</h3>
                                                {company.plan === 'PREMIUM' && (
                                                    <span className="bg-amber-400 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest shadow-sm">PREMIUM</span>
                                                )}
                                            </div>

                                            <div className="flex flex-wrap gap-4 items-center">
                                                <div className="flex items-center gap-1.5">
                                                    <div className={`w-2 h-2 rounded-full ${company.isApproved ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                                                    <span className={`text-[11px] font-bold uppercase tracking-wider ${company.isApproved ? 'text-emerald-600' : 'text-amber-600'}`}>
                                                        {company.isApproved ? 'Ativo no Mapa' : 'Aguardando Aprovação'}
                                                    </span>
                                                </div>
                                                <span className="text-slate-300">|</span>
                                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                                    {company.category.name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 w-full sm:w-auto">
                                        <Link
                                            href={`/company/${company.id}`}
                                            className="flex-1 sm:flex-none h-14 w-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm group/btn"
                                            title="Visualizar Página Pública"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </Link>

                                        <Link
                                            href={`/dashboard/edit/${company.id}`}
                                            className="flex-[3] sm:flex-none h-14 px-8 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary transition-all shadow-lg shadow-slate-900/10"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Editar
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-[3rem] p-24 text-center border-2 border-dashed border-slate-200">
                                <div className="text-6xl mb-8">🌵</div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4">Parece um deserto por aqui...</h3>
                                <p className="text-slate-500 font-medium mb-12 max-w-sm mx-auto leading-relaxed">Você ainda não cadastrou nenhuma empresa para aparecer no guia de Limoeiro do Norte.</p>
                                <Link
                                    href="/dashboard/new"
                                    className="inline-flex h-16 px-10 bg-primary text-white rounded-2xl items-center font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                                >
                                    Começar agora
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}