import { useState, ChangeEvent, useEffect } from 'react';
import { api } from '@/services/api';
import { CompanyImage } from '@/types';

interface ImageUploadProps {
    companyId: string;
    onUploadSuccess: () => void;
}

export function ImageUpload({ companyId, onUploadSuccess }: ImageUploadProps) {
    const [loadingLogo, setLoadingLogo] = useState(false);
    const [loadingGallery, setLoadingGallery] = useState(false);
    const [logoProgress, setLogoProgress] = useState(0);
    const [galleryProgress, setGalleryProgress] = useState(0);
    const [gallery, setGallery] = useState<CompanyImage[]>([]);
    const [currentLogo, setCurrentLogo] = useState<string | null>(null);

    async function loadData() {
        try {
            const response = await api.get(`/companies/${companyId}`);
            setGallery(response.data.images || []);
            setCurrentLogo(response.data.logoUrl || null);
        } catch (err) {
            console.error("Erro ao carregar dados:", err);
        }
    }

    useEffect(() => {
        loadData();
    }, [companyId]);

    async function handleLogoUpload(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('logo', file);

        setLoadingLogo(true);
        setLogoProgress(0);

        try {
            await api.patch(`/companies/${companyId}/logo`, formData, {
                onUploadProgress: (progressEvent) => {
                    const progress = progressEvent.total
                        ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        : 0;
                    setLogoProgress(progress);
                }
            });
            await loadData(); // Atualiza localmente
            onUploadSuccess();
        } catch (err) {
            alert('Erro ao subir a logo, mn.');
        } finally {
            setLoadingLogo(false);
            setLogoProgress(0);
        }
    }

    async function handleGalleryUpload(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);
        const formData = new FormData();
        files.forEach(file => formData.append('images', file));

        setLoadingGallery(true);
        setGalleryProgress(0);

        try {
            await api.post(`/companies/${companyId}/images`, formData, {
                onUploadProgress: (progressEvent) => {
                    const progress = progressEvent.total
                        ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        : 0;
                    setGalleryProgress(progress);
                }
            });
            await loadData();
            onUploadSuccess();
        } catch (err) {
            alert('Erro ao subir galeria.');
        } finally {
            setLoadingGallery(false);
            setGalleryProgress(0);
        }
    }

    async function handleDeleteImage(id: string) {
        if (!confirm('Deseja realmente remover esta foto da galeria?')) return;

        try {
            await api.delete(`/companies/images/${id}`);
            loadData();
            onUploadSuccess();
        } catch (err) {
            alert('Erro ao deletar imagem.');
        }
    }

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200/50">
                {/* Upload Logo */}
                <div className="relative">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Logo Principal</h4>
                    <p className="text-xs text-slate-500 mb-6 font-medium">Esta imagem aparecerá nos resultados de busca.</p>

                    <div className="flex items-center gap-6">
                        {currentLogo && (
                            <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-white shadow-lg shrink-0">
                                <img
                                    src={`http://localhost:3333/uploads/${companyId}/${currentLogo}`}
                                    className="w-full h-full object-cover"
                                    alt="Logo Atual"
                                />
                            </div>
                        )}

                        <label className={`flex flex-col items-center justify-center flex-1 h-24 border-2 border-primary border-dashed rounded-3xl transition-all group ${loadingLogo ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-primary/5'}`}>
                            <div className="flex flex-col items-center justify-center">
                                {loadingLogo ? (
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">{logoProgress}%</span>
                                    </div>
                                ) : (
                                    <>
                                        <span className="text-xl mb-1 group-hover:scale-110 transition-transform">🖼️</span>
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">Alterar Logo</span>
                                    </>
                                )}
                            </div>
                            <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} disabled={loadingLogo} />
                        </label>
                    </div>
                </div>

                {/* Upload Galeria */}
                <div className="relative">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Adicionar à Galeria</h4>
                    <p className="text-xs text-slate-500 mb-6 font-medium">Suba até 10 fotos para mostrar o melhor do seu negócio.</p>
                    <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-slate-300 border-dashed rounded-3xl transition-all group ${loadingGallery ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-slate-100'}`}>
                        <div className="flex flex-col items-center justify-center">
                            {loadingGallery ? (
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
                                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{galleryProgress}%</span>
                                </div>
                            ) : (
                                <>
                                    <span className="text-xl mb-1 group-hover:scale-110 transition-transform">📸</span>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subir Fotos</span>
                                </>
                            )}
                        </div>
                        <input type="file" className="hidden" accept="image/*" multiple onChange={handleGalleryUpload} disabled={loadingGallery} />
                    </label>
                </div>
            </div>

            {gallery.length > 0 && (
                <div>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Fotos na Galeria ({gallery.length})</h4>
                    <div className="flex flex-nowrap gap-4 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                        {gallery.map((img) => (
                            <div key={img.id} className="relative w-32 h-32 rounded-3xl overflow-hidden group border-4 border-white shadow-lg shrink-0 transition-transform hover:scale-105">
                                <img
                                    src={`http://localhost:3333/uploads/${companyId}/${img.imageUrl}`}
                                    alt="Galeria"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleDeleteImage(img.id)}
                                    className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
