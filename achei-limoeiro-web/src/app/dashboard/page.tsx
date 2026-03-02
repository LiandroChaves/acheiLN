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
        <div className="min-h-screen bg-gray-50">
            <Header />
            <AuthModal isOpen={showAuthModal} />
            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Meus Anúncios</h1>
                        <p className="text-gray-400 font-medium mt-1">Gerencie suas empresas cadastradas em Limoeiro.</p>
                    </div>

                    <Link
                        href="/dashboard/new"
                        className="bg-secondary text-white px-8 py-4 rounded-2xl font-black text-sm hover:shadow-xl hover:shadow-secondary/20 transition-all uppercase tracking-widest flex items-center gap-2"
                    >
                        <span>+</span> Anunciar Empresa
                    </Link>
                </div>

                {loading ? (
                    <p className="text-gray-400 font-bold">Carregando dados...</p>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {companies.length > 0 ? (
                            companies.map(company => (
                                <div key={company.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
                                            {company.logoUrl ? (
                                                <img src={`http://localhost:3333/uploads/${company.id}/${company.logoUrl}`} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-[10px] font-black text-gray-300 uppercase">Logo</span>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-gray-900">{company.name}</h3>
                                            <div className="flex gap-3 mt-1">
                                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest ${company.isApproved ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                                                    }`}>
                                                    {company.isApproved ? 'Aprovado' : 'Aguardando Aprovação'}
                                                </span>
                                                <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-primary/10 text-primary uppercase tracking-widest">
                                                    Plano {company.plan}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link href={`/dashboard/edit/${company.id}`} className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-gray-100 transition-all">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-[2.5rem] p-16 text-center border-2 border-dashed border-gray-200">
                                <p className="text-gray-400 font-bold mb-6">Você ainda não cadastrou nenhuma empresa, mn.</p>
                                <Link href="/dashboard/new" className="text-primary font-black hover:underline">
                                    Cadastrar minha primeira empresa agora
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}