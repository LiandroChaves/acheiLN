'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { companyService } from '@/services/companyService';
import { Company } from '@/types';
import { Header } from '@/components/Header';
import Link from 'next/link';

export default function CompanyDetailPage() {
    const { id } = useParams();
    const [company, setCompany] = useState<Company | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const ITEMS_PER_PAGE = 5;

    useEffect(() => {
        async function loadCompany() {
            try {
                const data = await companyService.getById(id as string);
                setCompany(data);
                if (data.logoUrl) setActiveImage(data.logoUrl);
                else if (data.images && data.images.length > 0) setActiveImage(data.images[0].imageUrl);
            } catch (error) {
                console.error("Erro ao carregar empresa:", error);
            } finally {
                setLoading(false);
            }
        }

        if (id) loadCompany();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <div className="w-full h-[500px] bg-slate-100 rounded-[3rem] animate-pulse mb-8" />
                    <div className="w-1/3 h-10 bg-slate-100 rounded-xl animate-pulse mb-4" />
                    <div className="w-2/3 h-6 bg-slate-100 rounded-xl animate-pulse" />
                </div>
            </div>
        );
    }

    if (!company) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <div className="max-w-7xl mx-auto px-6 py-32 text-center">
                    <h1 className="text-4xl font-black text-slate-900 mb-4">Empresa não encontrada</h1>
                    <p className="text-slate-500 mb-10">O link que você acessou pode estar quebrado ou a empresa não existe mais.</p>
                    <Link href="/" className="bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg">
                        Voltar para o Início
                    </Link>
                </div>
            </div>
        );
    }

    const allImages = [
        ...(company.logoUrl ? [{ id: 'logo', imageUrl: company.logoUrl, isLogo: true }] : []),
        ...(company.images || []).map(img => ({ ...img, isLogo: false }))
    ];

    const totalPages = Math.ceil(allImages.length / ITEMS_PER_PAGE);
    const paginatedImages = allImages.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
    );

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />

            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Botão Voltar */}
                <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary font-bold mb-8 transition-colors group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                    VOLTAR
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Galeria de Fotos */}
                    <div className="lg:col-span-7">
                        <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-white shadow-premium mb-6 border border-slate-200/50">
                            {activeImage ? (
                                <img
                                    src={`http://localhost:3333/uploads/${company.id}/${activeImage}`}
                                    className="w-full h-full object-cover transition-opacity duration-500"
                                    alt={company.name}
                                    key={activeImage}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-200 text-8xl">🏢</div>
                            )}

                            {company.plan === 'PREMIUM' && (
                                <div className="absolute top-6 right-6 bg-secondary text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl">
                                    Destaque Premium
                                </div>
                            )}
                        </div>

                        {/* Thumbs / Navigation */}
                        {allImages.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between px-2">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        Explorar Galeria ({allImages.length} fotos)
                                    </span>

                                    {totalPages > 1 && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                                                disabled={currentPage === 0}
                                                className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 disabled:opacity-30 hover:text-primary transition-colors"
                                            >
                                                ←
                                            </button>
                                            <button
                                                onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                                                disabled={currentPage === totalPages - 1}
                                                className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 disabled:opacity-30 hover:text-primary transition-colors"
                                            >
                                                →
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-5 gap-4">
                                    {paginatedImages.map((img, idx) => (
                                        <button
                                            key={img.id}
                                            onClick={() => setActiveImage(img.imageUrl)}
                                            className={`relative aspect-square rounded-2xl overflow-hidden transition-all border-4 ${activeImage === img.imageUrl ? 'border-primary ring-4 ring-primary/10 scale-105' : 'border-white opacity-70 hover:opacity-100 shadow-sm'}`}
                                        >
                                            <img
                                                src={`http://localhost:3333/uploads/${company.id}/${img.imageUrl}`}
                                                className="w-full h-full object-cover"
                                                alt="Thumbnail"
                                            />
                                            {img.isLogo && (
                                                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center pointer-events-none">
                                                    <span className="text-[8px] font-black text-white uppercase bg-primary px-2 py-0.5 rounded-full">Logo</span>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                    {/* Esqueletos para manter o grid alinhado */}
                                    {Array.from({ length: ITEMS_PER_PAGE - paginatedImages.length }).map((_, i) => (
                                        <div key={`empty-${i}`} className="aspect-square rounded-2xl bg-slate-100/50 border-2 border-dashed border-slate-200" />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Informações */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-premium border border-slate-200/50 space-y-10">
                            <div>
                                <span className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4 block">{company.category.name}</span>
                                <h1 className="text-4xl font-black text-slate-900 mb-4 leading-tight">{company.name}</h1>
                                <p className="text-slate-500 font-medium leading-relaxed">
                                    {company.description || "Nenhuma descrição detalhada disponível ainda para esta empresa."}
                                </p>
                            </div>

                            <div className="h-px bg-slate-100" />

                            <div className="space-y-8">
                                {/* Localização */}
                                <div className="flex gap-5">
                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-xl shadow-sm shrink-0">
                                        📍
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Localização</span>
                                        <span className="text-slate-700 font-bold leading-snug block">
                                            {company.street}, {company.number}
                                        </span>
                                        <span className="text-slate-500 font-medium text-sm block mt-0.5">
                                            {company.neighborhood}, {company.city_name} - {company.state}
                                        </span>
                                    </div>
                                </div>

                                {/* Horário */}
                                {company.openingHours && (
                                    <div className="flex gap-5">
                                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-xl shadow-sm shrink-0">
                                            ⏰
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Horário de Funcionamento</span>
                                            <span className="text-slate-700 font-bold">{company.openingHours}</span>
                                        </div>
                                    </div>
                                )}

                                {/* Contatos */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                                    {company.phone && (
                                        <div className="flex gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 transition-colors hover:bg-slate-50">
                                            <span className="text-lg">📞</span>
                                            <div>
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Telefone</span>
                                                <span className="text-slate-700 font-bold text-sm">{company.phone}</span>
                                            </div>
                                        </div>
                                    )}

                                    {company.instagram && (
                                        <a
                                            href={`https://instagram.com/${company.instagram.replace('@', '')}`}
                                            target="_blank"
                                            className="flex gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 transition-colors hover:bg-slate-50 group"
                                        >
                                            <span className="text-lg group-hover:scale-110 transition-transform">📸</span>
                                            <div>
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Instagram</span>
                                                <span className="text-primary font-bold text-sm">@{company.instagram.replace('@', '')}</span>
                                            </div>
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="pt-6">
                                <a
                                    href={`https://wa.me/${company.whatsapp?.replace(/\D/g, '')}`}
                                    target="_blank"
                                    className="w-full h-20 bg-primary text-white rounded-[2rem] flex items-center justify-center gap-4 font-black text-lg shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all active:scale-95 group"
                                >
                                    <svg className="w-6 h-6 transition-transform group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.15-.67-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.408.002 12.04c0 2.12.554 4.189 1.602 6.06L0 24l6.091-1.599a11.802 11.802 0 005.954 1.599h.005c6.635 0 12.046-5.41 12.049-12.042a11.758 11.758 0 00-3.486-8.527z" />
                                    </svg>
                                    FALAR NO WHATSAPP
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
