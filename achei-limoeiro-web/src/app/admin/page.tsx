'use client';

import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { api } from '@/services/api';
import { Company } from '@/types';
import { Header } from '@/components/Header';
import { AuthModal } from '@/components/AuthModal';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const { user, isAuthenticated } = useContext(AuthContext);
    const [pendingCompanies, setPendingCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('@AcheiLimoeiro:token');

        if (!token && !isAuthenticated) {
            setShowAuthModal(true);
            setLoading(false);
            return;
        }

        if (isAuthenticated && user) {
            if (user.role !== 'ADMIN') {
                alert('Essa área é só pra os moderadores de Limoeiro, mn!');
                router.push('/dashboard');
                return;
            }

            api.get('/companies?cityId=f0410c86-2993-4be8-bd1c-e123c0e99ea5')
                .then(res => {
                    const pending = res.data.filter((c: Company) => !c.isApproved);
                    setPendingCompanies(pending);
                })
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [isAuthenticated, user, router]);

    async function handleApprove(id: string) {
        try {
            await api.patch(`/companies/${id}/approve`);
            setPendingCompanies(state => state.filter(c => c.id !== id));
        } catch (err) {
            alert('Erro ao aprovar a empresa.');
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <AuthModal isOpen={showAuthModal} />

            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase italic">Moderação</h1>
                    <p className="text-gray-400 font-medium">Aprove as empresas para elas aparecerem no portal.</p>
                </div>

                {loading ? (
                    <div className="p-20 text-center font-black text-primary animate-pulse">Autenticando moderador...</div>
                ) : (
                    <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Negócio</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Ação</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {pendingCompanies.map(company => (
                                    <tr key={company.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <span className="font-black text-gray-900 block leading-none text-lg">{company.name}</span>
                                            <span className="text-xs font-bold text-primary uppercase tracking-tighter">{company.category.name}</span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button
                                                onClick={() => handleApprove(company.id)}
                                                className="bg-green-500 text-white px-8 py-3 rounded-2xl font-black text-xs hover:bg-green-600 hover:shadow-lg transition-all uppercase tracking-widest"
                                            >
                                                Aprovar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {pendingCompanies.length === 0 && (
                            <div className="p-20 text-center">
                                <span className="text-5xl block mb-4">✅</span>
                                <p className="text-gray-400 font-bold italic">Tudo limpo! Nenhuma empresa aguardando em Limoeiro do Norte.</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}